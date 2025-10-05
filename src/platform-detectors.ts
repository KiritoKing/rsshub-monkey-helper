// 平台参数自动提取器，兼容油猴API
// 按需引入GM_xmlhttpRequest等API

// Bilibili: 支持空间页、视频页、动态页等，优先从URL和DOM提取uid
export function detectBilibiliParams(): Record<string, string> {
  const url = window.location.href;
  // 空间页 https://space.bilibili.com/2267573
  const spaceMatch = url.match(/space\.bilibili\.com\/(\d+)/);
  if (spaceMatch) return { uid: spaceMatch[1] };
  // 视频页 https://www.bilibili.com/video/BVxxxxxx
  const bvMatch = url.match(/bilibili\.com\/video\/(BV[\w]+)/i);
  if (bvMatch) {
    // 尝试从页面DOM获取UP主uid
    const upLink = document.querySelector(
      'a.up-name, a.username, a.bili-avatar'
    ) as HTMLAnchorElement;
    if (upLink && upLink.href) {
      const upUid = upLink.href.match(/space\.bilibili\.com\/(\d+)/);
      if (upUid) return { uid: upUid[1] };
    }
  }
  // 其他情况可扩展
  return {};
}

// YouTube: 支持频道页、视频页，优先@handle，其次channelId
export function detectYouTubeParams(): Record<string, string> {
  const url = window.location.href;
  // 频道页 https://www.youtube.com/@handle
  const handleMatch = url.match(/youtube.com\/@([\w\-.]+)/);
  if (handleMatch) return { username: `@${handleMatch[1]}` };
  // 频道ID页 https://www.youtube.com/channel/UCxxxx
  const channelMatch = url.match(/youtube.com\/channel\/(UC[\w-]+)/);
  if (channelMatch) return { username: channelMatch[1] };
  // 视频页 https://www.youtube.com/watch?v=xxxx
  // 可通过DOM或API进一步提取
  return {};
}

// X(Twitter): 支持用户页、推文页，优先用户名
export function detectXParams(): Record<string, string> {
  const url = window.location.href;
  // 用户页 https://x.com/elonmusk 或 https://twitter.com/elonmusk
  const userMatch = url.match(/(?:x|twitter).com\/([\w_]+)/);
  if (
    userMatch &&
    ![
      'home',
      'explore',
      'i',
      'notifications',
      'messages',
      'search',
      'settings',
    ].includes(userMatch[1])
  ) {
    return { id: userMatch[1] };
  }
  return {};
}

// 通用导出
export function detectParams(platform: string): Record<string, string> {
  if (platform === 'bilibili') return detectBilibiliParams();
  if (platform === 'youtube') return detectYouTubeParams();
  if (platform === 'x') return detectXParams();
  return {};
}
