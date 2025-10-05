
import { Component, createSignal, Show, For, onCleanup, onMount } from 'solid-js';
import styles from './App.module.css';
import { platforms, PlatformConfig, Rule } from './rsshub-rules';
import { detectParams } from './platform-detectors';
import rsshubLogo from './icons/rsshub-logo';
import ClipboardJS from 'clipboard';

const [showPanel, setShowPanel] = createSignal(false);
const [activePlatform, setActivePlatform] = createSignal<PlatformConfig>(platforms[0]);
const [toast, setToast] = createSignal('');

// 自动识别当前平台（简化：根据host判断）
function detectPlatform(): PlatformConfig | null {
  const host = window.location.host;
  if (host.includes('bilibili.com')) return platforms.find(p => p.id === 'bilibili')!;
  if (host.includes('youtube.com')) return platforms.find(p => p.id === 'youtube')!;
  if (host.includes('twitter.com') || host.includes('x.com')) return platforms.find(p => p.id === 'x')!;
  return null;
}

// 复制按钮初始化
function setupClipboard() {
  const clipboard = new ClipboardJS('.copy-btn');
  clipboard.on('success', () => {
    setToast('已复制');
    setTimeout(() => setToast(''), 1200);
  });
  clipboard.on('error', () => {
    setToast('复制失败');
    setTimeout(() => setToast(''), 1200);
  });
  onCleanup(() => clipboard.destroy());
}

const App: Component = () => {
  // 当前平台参数
  const [params, setParams] = createSignal<Record<string, string>>({});
  // 初始化平台，优先自动识别，否则默认第一个
  onMount(() => {
    const detected = detectPlatform();
    if (detected) setActivePlatform(detected);
    // 初始参数
    setParams(detectParams((detected || platforms[0]).id));
  });
  // 切换平台时自动提取参数
  const handleTabClick = (p: PlatformConfig) => {
    setActivePlatform(p);
    setParams(detectParams(p.id));
  };
  // 初始化clipboard
  setupClipboard();

  return (
    <>
      {/* 悬浮按钮 */}
      <div class={styles.fab} onClick={() => setShowPanel(true)} title="RSSHub订阅">
        <span innerHTML={rsshubLogo} />
      </div>
      {/* 侧边栏面板 */}
      <Show when={showPanel()}>
        <div class={styles.panelBg} onClick={() => setShowPanel(false)} />
        <aside class={styles.panel}>
          <header class={styles.panelHeader}>
            <span innerHTML={rsshubLogo} style={{ width: '32px', height: '32px', display: 'inline-block' }} />
            <span>可订阅源</span>
            <button class={styles.closeBtn} onClick={() => setShowPanel(false)}>×</button>
          </header>
          <nav class={styles.tabs}>
            <For each={platforms}>
              {p => (
                <button
                  class={p.id === activePlatform().id ? styles.tabActive : ''}
                  onClick={() => handleTabClick(p)}
                >
                  <span innerHTML={p.icon} style={{ width: '24px', height: '24px', display: 'inline-block' }} />
                  {p.name}
                </button>
              )}
            </For>
          </nav>
          <main class={styles.rules}>
            <For each={activePlatform().rules}>
              {rule => <RuleItem rule={rule} params={params()} />}
            </For>
          </main>
        </aside>
      </Show>
      {/* Toast提示 */}
      <Show when={toast()}>
        <div class={styles.toast}>{toast()}</div>
      </Show>
    </>
  );
};

const RuleItem: Component<{ rule: Rule; params: Record<string, string> }> = (props) => {
  // 动态参数优先，若无则用默认
  const link = props.rule.genLink(props.params);
  return (
    <div class={styles.ruleItem}>
      <div class={styles.ruleTitle}>
        <a href={props.rule.doc} target="_blank" rel="noopener">{props.rule.name}</a>
      </div>
      <div class={styles.ruleDesc}>{props.rule.desc}</div>
      <div class={styles.ruleLinkRow}>
        <span class={styles.ruleLink}>{link}</span>
        <button class={`copy-btn ${styles.copyBtn}`} data-clipboard-text={link}>复制</button>
      </div>
    </div>
  );
};

export default App;
