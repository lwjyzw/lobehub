import { createStaticStyles } from 'antd-style';

export const styles = createStaticStyles(({ css, cssVar }) => ({
  arrow: css`
    align-self: flex-start;
    background: ${cssVar.colorFillSecondary};
    border-radius: 2px;
    flex-shrink: 0;
    height: 2px;
    margin-top: 15px;
    width: 14px;
  `,
  arrowActive: css`
    background: linear-gradient(
      90deg,
      ${cssVar.colorPrimaryBg},
      ${cssVar.colorPrimary},
      ${cssVar.colorPrimaryBg}
    );
    background-size: 200% 100%;
    animation: teamflow-flow 1.2s linear infinite;

    @keyframes teamflow-flow {
      0% {
        background-position: 0% 0;
      }

      100% {
        background-position: 200% 0;
      }
    }
  `,
  avatarBox: css`
    align-items: center;
    border: 2px solid transparent;
    border-radius: 50%;
    display: flex;
    flex-shrink: 0;
    font-size: 15px;
    height: 32px;
    justify-content: center;
    position: relative;
    transition: border-color 0.3s;
    width: 32px;
  `,
  avatarDone: css`
    border-color: ${cssVar.colorSuccess};
  `,
  avatarRunning: css`
    border-color: ${cssVar.colorPrimary};
    animation: teamflow-pulse 1.4s ease-out infinite;

    @keyframes teamflow-pulse {
      0% {
        box-shadow: 0 0 0 0 ${cssVar.colorPrimaryBg};
      }

      70% {
        box-shadow: 0 0 0 8px transparent;
      }

      100% {
        box-shadow: 0 0 0 0 transparent;
      }
    }
  `,
  bar: css`
    align-items: center;
    background: ${cssVar.colorBgContainer};
    border-bottom: 1px solid ${cssVar.colorBorderSecondary};
    display: flex;
    flex-direction: row;
    gap: 12px;
    overflow-x: auto;
    padding: 6px 16px;
    width: 100%;
  `,
  badge: css`
    background: ${cssVar.colorFillTertiary};
    border-radius: ${cssVar.borderRadiusSM};
    color: ${cssVar.colorTextSecondary};
    flex-shrink: 0;
    font-size: 12px;
    font-weight: 600;
    padding: 2px 8px;
  `,
  check: css`
    background: ${cssVar.colorSuccess};
    border-radius: 50%;
    bottom: -2px;
    color: #fff;
    font-size: 9px;
    height: 12px;
    line-height: 12px;
    position: absolute;
    right: -2px;
    text-align: center;
    width: 12px;
  `,
  dots: css`
    bottom: -7px;
    display: flex;
    gap: 2px;
    left: 50%;
    position: absolute;
    transform: translateX(-50%);

    i {
      animation: teamflow-bounce 1s ease-in-out infinite;
      background: ${cssVar.colorPrimary};
      border-radius: 50%;
      display: block;
      height: 4px;
      width: 4px;

      &:nth-child(2) {
        animation-delay: 0.15s;
      }

      &:nth-child(3) {
        animation-delay: 0.3s;
      }
    }

    @keyframes teamflow-bounce {
      0%,
      100% {
        opacity: 0.4;
        transform: translateY(0);
      }

      50% {
        opacity: 1;
        transform: translateY(-3px);
      }
    }
  `,
  label: css`
    color: ${cssVar.colorTextDescription};
    font-size: 11px;
    line-height: 14px;
    max-width: 72px;
    overflow: hidden;
    text-align: center;
    text-overflow: ellipsis;
    white-space: nowrap;
  `,
  labelActive: css`
    color: ${cssVar.colorText};
    font-weight: 600;
  `,
  node: css`
    align-items: center;
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
    gap: 2px;
  `,
  nodeRow: css`
    align-items: center;
    display: flex;
    flex: 1;
    gap: 6px;
    min-width: 0;
  `,
  statusRunning: css`
    color: ${cssVar.colorPrimary};
    font-weight: 600;
  `,
  statusText: css`
    color: ${cssVar.colorTextSecondary};
    flex-shrink: 0;
    font-size: 12px;
    white-space: nowrap;
  `,
}));
