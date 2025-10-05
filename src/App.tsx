import type { Component } from 'solid-js';
import { createSignal, Show, onMount } from 'solid-js';
import styles from './App.module.css';
import type { PlatformConfig } from './rsshub-rules';
import { platforms } from './rsshub-rules';
import { detectParams } from './platform-detectors';

import rsshubLogo from './icons/rsshub-logo';

import Panel from './components/Panel';

const [showPanel, setShowPanel] = createSignal(false);
const [activePlatform, setActivePlatform] = createSignal<PlatformConfig>(
  platforms[0]
);
const [toast, setToast] = createSignal('');

// 自动识别当前平台（简化：根据host判断）
function detectPlatform(): PlatformConfig | null {
  const host = window.location.host;
  if (host.includes('bilibili.com'))
    return platforms.find(p => p.id === 'bilibili') || null;
  if (host.includes('youtube.com'))
    return platforms.find(p => p.id === 'youtube') || null;
  if (host.includes('twitter.com') || host.includes('x.com'))
    return platforms.find(p => p.id === 'x') || null;
  return null;
}

const App: Component = () => {
  // 当前平台参数
  const [params, setParams] = createSignal<Record<string, string>>({});
  // 平台tab展开控制
  const [showAllPlatforms, setShowAllPlatforms] = createSignal(false);
  // 记录初始自动识别的平台id
  // const [detectedPlatformId, setDetectedPlatformId] = createSignal<string | null>(null); // 已不再使用

  // 初始化平台，优先自动识别，否则默认第一个
  onMount(() => {
    const detected = detectPlatform();
    if (detected) {
      setActivePlatform(detected);
    }
    setParams(detectParams((detected || platforms[0]).id));
  });
  // 切换平台时自动提取参数
  const handleTabClick = (p: PlatformConfig) => {
    setActivePlatform(p);
    setParams(detectParams(p.id));
    setShowAllPlatforms(true); // 一旦手动切换，自动展开所有平台tab
  };

  // 过滤出有数据的规则
  const matchedRules = () =>
    activePlatform().rules.filter(rule => {
      const link = rule.genLink(params());
      // 只要有参数被填充（不含占位符）
      return !/\{.+?\}/.test(link);
    });
  // 若无任何规则匹配，则不显示fab
  // 不再在组件体内直接 return null，交由 Show 控制渲染

  // 关闭对话框（点击外部或按钮）
  const handleClose = () => setShowPanel(false);
  // 外部点击关闭
  const onBgClick = (e: MouseEvent) => {
    if (e.target === e.currentTarget) handleClose();
  };

  return (
    <>
      {/* 悬浮按钮，仅有匹配规则时显示 */}
      <Show when={matchedRules().length > 0 && !showPanel()}>
        <div
          class={styles.fab}
          onClick={() => setShowPanel(true)}
          title="RSSHub订阅"
        >
          <span innerHTML={rsshubLogo} />
        </div>
      </Show>
      {/* 对话框面板 */}
      <Show when={showPanel()}>
        <Panel
          showAllPlatforms={showAllPlatforms()}
          platforms={platforms}
          activePlatform={activePlatform()}
          onTabClick={handleTabClick}
          matchedRules={matchedRules()}
          params={params()}
          onClose={handleClose}
          onBgClick={onBgClick}
          onCopy={success => {
            setToast(success ? '已复制' : '复制失败');
            setTimeout(() => setToast(''), 1200);
          }}
        />
      </Show>
      {/* Toast提示 */}
      <Show when={toast()}>
        <div class={styles.toast}>{toast()}</div>
      </Show>
    </>
  );
};

export default App;
