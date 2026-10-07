'use client';

import type { ConversationContext } from '@lobechat/types';

import { createStaticStyles, cx } from 'antd-style';
import isEqual from 'fast-deep-equal';
import { memo, useMemo } from 'react';

import { useAgentGroupStore } from '@/store/agentGroup';
import { agentGroupSelectors } from '@/store/agentGroup/selectors';
import { useChatStore } from '@/store/chat';
import { operationSelectors } from '@/store/chat/selectors';
import { messageMapKey } from '@/store/chat/utils/messageMapKey';

import { styles } from './styles';

interface FlowNodeAgent {
  avatar?: string;
  backgroundColor?: string;
  id: string;
  title?: string;
}

const FlowNode = memo<{ agent: FlowNodeAgent; done: boolean }>(({ agent, done }) => {
  // Per-agent streaming state: pulses only while this member's agent runtime runs.
  const running = useChatStore(operationSelectors.isAgentVisiblyRunning(agent.id));

  return (
    <div className={styles.node} title={agent.title}>
      <div
        className={cx(styles.avatarBox, running && styles.avatarRunning, done && styles.avatarDone)}
        style={{ background: agent.backgroundColor }}
      >
        <span>{agent.avatar}</span>
        {running && (
          <span className={styles.dots}>
            <i />
            <i />
            <i />
          </span>
        )}
        {!running && done && <span className={styles.check}>✓</span>}
      </div>
      <span className={cx(styles.label, (running || done) && styles.labelActive)}>{agent.title}</span>
    </div>
  );
});

/**
 * Team pipeline status bar for group conversations.
 *
 * Renders the supervisor + members as a pipeline: a member's avatar pulses
 * while its agent runtime is streaming (per-agent operation state), turns into
 * a done tick once it has contributed to the current topic, and the connector
 * lines flow while the group orchestration is running.
 */
const TeamFlowBar = memo<{ context: ConversationContext }>(({ context }) => {
  const { agentId: supervisorAgentId, groupId, topicId } = context;

  const agents = useAgentGroupStore(
    (s) => agentGroupSelectors.getGroupAgents(groupId ?? '')(s),
    isEqual,
  );
  const chatKey = messageMapKey(context);
  const messages = useChatStore((s) => s.dbMessagesMap[chatKey], isEqual);
  const isTopicRunning = useChatStore(operationSelectors.isTopicVisiblyRunning(topicId ?? ''));

  const nodes = useMemo(() => {
    const supervisor = agents.find((agent) => agent.isSupervisor);
    const members = agents.filter((agent) => !agent.isSupervisor);
    return supervisor ? [supervisor, ...members] : members;
  }, [agents]);

  const contributedIds = useMemo(() => {
    const ids = new Set<string>();
    for (const message of messages ?? []) {
      if (message.role === 'user' || message.role === 'system') continue;
      const id = message.agentId === 'supervisor' ? supervisorAgentId : message.agentId;
      if (id) ids.add(id);
    }
    return ids;
  }, [messages, supervisorAgentId]);

  if (!groupId || nodes.length === 0) return null;

  return (
    <div className={styles.bar}>
      <span className={styles.badge}>团队流</span>
      <div className={styles.nodeRow}>
        {nodes.map((agent, index) => (
          <div key={agent.id} className={styles.nodeRow} style={{ flex: '0 0 auto' }}>
            {index !== 0 && (
              <span className={cx(styles.arrow, isTopicRunning && styles.arrowActive)} />
            )}
            <FlowNode agent={agent} done={contributedIds.has(agent.id)} />
          </div>
        ))}
      </div>
      <span className={cx(styles.statusText, isTopicRunning && styles.statusRunning)}>
        {isTopicRunning ? '团队流运行中…' : contributedIds.size > 0 ? '本话题已推进' : '待命'}
      </span>
    </div>
  );
});

TeamFlowBar.displayName = 'TeamFlowBar';
FlowNode.displayName = 'FlowNode';

export default TeamFlowBar;
