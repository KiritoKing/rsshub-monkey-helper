import { Component, Show, For } from 'solid-js';
import styles from './Panel.module.css';
import RuleItem from './RuleItem';
import { PlatformConfig, Rule } from '../rsshub-rules';
import rsshubLogo from '../icons/rsshub-logo';

interface PanelProps {
  showAllPlatforms: boolean;
  platforms: PlatformConfig[];
  activePlatform: PlatformConfig;
  onTabClick: (p: PlatformConfig) => void;
  matchedRules: Rule[];
  params: Record<string, string>;
  onClose: () => void;
  onBgClick: (e: MouseEvent) => void;
  onCopy?: (success: boolean) => void;
}

const Panel: Component<PanelProps> = (props) => {
  return (
    <>
      <div class={styles.panelBg} onClick={props.onBgClick} />
      <div
        class={styles.dialog + ' ' + styles.panel}
        style={{
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          transition: 'box-shadow 0.2s, transform 0.25s cubic-bezier(.4,2,.6,1)',
        }}
      >
        <header class={styles.panelHeader}>
          <span innerHTML={rsshubLogo} style={{ width: '32px', height: '32px', display: 'inline-block' }} />
          <span>可订阅源</span>
          <button class={styles.closeBtn} onClick={props.onClose}>×</button>
        </header>
        <nav class={styles.tabs}>
          <Show when={!props.showAllPlatforms}>
            <button
              class={styles.tabActive}
              style={{ 'min-width': '80px', 'max-width': '110px' }}
              onClick={() => props.onTabClick(props.activePlatform)}
            >
              <span class={styles.tabIcon} innerHTML={props.activePlatform.icon} />
              <span class={styles.tabName} data-fullname={props.activePlatform.name}>{props.activePlatform.name}</span>
              <span class={styles.expandIcon} title='展开更多平台'>▶️</span>
            </button>
          </Show>
          <Show when={props.showAllPlatforms}>
            <For each={props.platforms}>
              {p => (
                <button
                  class={p.id === props.activePlatform.id ? styles.tabActive : ''}
                  onClick={() => props.onTabClick(p)}
                >
                  <span class={styles.tabIcon} innerHTML={p.icon} />
                  <span class={styles.tabName} data-fullname={p.name}>{p.name}</span>
                </button>
              )}
            </For>
          </Show>
        </nav>
        <main class={styles.rules}>
          <For each={props.matchedRules}>
            {rule => <RuleItem rule={rule} params={props.params} onCopy={props.onCopy} />}
          </For>
        </main>
      </div>
    </>
  );
};

export default Panel;
