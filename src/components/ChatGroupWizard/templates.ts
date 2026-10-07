import { useTranslation } from 'react-i18next';

export interface GroupTemplate {
  description: string;
  id: string;
  members: Array<{
    avatar: string;
    backgroundColor?: string;
    plugins?: string[];
    systemRole: string;
    title: string;
  }>;
  supervisor?: {
    avatar?: string;
    backgroundColor?: string;
    systemRole: string;
    title: string;
  };
  title: string;
}

export const useGroupTemplates = (): GroupTemplate[] => {
  const { t } = useTranslation('welcome');

  const templateKeys = [
    'aiTeam',
    'brainstorm',
    'analysis',
    'writing',
    'planning',
    'product',
    'game',
  ] as const;

  return templateKeys.map((key) => {
    // Missing keys fall back to the key string, so only treat objects as a
    // real supervisor config — templates without one stay supervisor-less.
    const supervisor = t(`guide.groupTemplates.${key}.supervisor`, {
      returnObjects: true,
    }) as unknown;

    return {
      description: t(`guide.groupTemplates.${key}.description`),
      id: key,
      members: t(`guide.groupTemplates.${key}.members`, {
        returnObjects: true,
      }) as GroupTemplate['members'],
      ...(typeof supervisor === 'object' && supervisor !== null && !Array.isArray(supervisor)
        ? { supervisor: supervisor as GroupTemplate['supervisor'] }
        : {}),
      title: t(`guide.groupTemplates.${key}.title`),
    };
  });
};
