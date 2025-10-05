// 平台规则定义与链接生成
// 支持Bilibili、YouTube、X（Twitter）

export type Platform = 'bilibili' | 'youtube' | 'x';

export interface Rule {
  id: string;
  name: string;
  desc: string;
  doc: string;
  genLink: (params: Record<string, string>) => string;
  preview: string;
}

export interface PlatformConfig {
  id: Platform;
  name: string;
  icon: string; // svg字符串
  rules: Rule[];
}

import bilibiliIcon from './icons/bilibili';
import youtubeIcon from './icons/youtube';
import xIcon from './icons/x';
export const platforms: PlatformConfig[] = [
  {
    id: 'bilibili',
    name: 'Bilibili',
    icon: bilibiliIcon,
    rules: [
      {
        id: 'user-video',
        name: 'UP主投稿',
        desc: '获取UP主最新投稿',
        doc: 'https://docs.rsshub.app/routes/social-media#bilibili',
        genLink: ({ uid }) => `/bilibili/user/video/${uid}`,
        preview: '/bilibili/user/video/2267573',
      },
      {
        id: 'user-video-all',
        name: 'UP主所有视频',
        desc: '获取UP主所有视频',
        doc: 'https://docs.rsshub.app/routes/social-media#bilibili',
        genLink: ({ uid }) => `/bilibili/user/video-all/${uid}`,
        preview: '/bilibili/user/video-all/2267573',
      },
      {
        id: 'ranking',
        name: '排行榜',
        desc: 'B站分区排行榜',
        doc: 'https://docs.rsshub.app/routes/social-media#bilibili',
        genLink: ({ rid_index }) => `/bilibili/ranking/${rid_index || ''}`,
        preview: '/bilibili/ranking/0',
      },
      {
        id: 'weekly',
        name: '周推',
        desc: 'B站每周热门推荐',
        doc: 'https://docs.rsshub.app/routes/social-media#bilibili',
        genLink: () => '/bilibili/weekly',
        preview: '/bilibili/weekly',
      },
    ],
  },
  {
    id: 'youtube',
    name: 'YouTube',
    icon: youtubeIcon,
    rules: [
      {
        id: 'user',
        name: '频道（@handle）',
        desc: '通过@handle订阅频道',
        doc: 'https://docs.rsshub.app/routes/social-media#youtube',
        genLink: ({ username }) => `/youtube/user/${username}`,
        preview: '/youtube/user/@JFlaMusic',
      },
      {
        id: 'playlist',
        name: '播放列表',
        desc: '订阅YouTube播放列表',
        doc: 'https://docs.rsshub.app/routes/social-media#youtube',
        genLink: ({ id }) => `/youtube/playlist/${id}`,
        preview: '/youtube/playlist/PL9tY0BWXOZFv2b4p1p6rQ1QK2vNhbbX6h',
      },
    ],
  },
  {
    id: 'x',
    name: 'X（Twitter）',
    icon: xIcon,
    rules: [
      {
        id: 'user',
        name: '用户推文',
        desc: '订阅指定用户推文',
        doc: 'https://docs.rsshub.app/routes/social-media#x',
        genLink: ({ id }) => `/x/user/${id}`,
        preview: '/x/user/jack',
      },
      {
        id: 'custom',
        name: '自定义参数',
        desc: '自定义X规则参数',
        doc: 'https://docs.rsshub.app/routes/social-media#x',
        genLink: ({ routeParams }) => `/x/${routeParams || ''}`,
        preview: '/x/readable=true&showAuthorInTitle=true',
      },
    ],
  },
];
