import { ref } from 'vue'
import type { Category, Post } from '@/types'

// 模拟所有小分类
const allCategories: Category[] = [
  { id: 'delta-force', name: '三角洲行动', type: 'article', description: '战术射击游戏', parentCategory: 'games' },
  { id: 'star-rail', name: '星穹铁道', type: 'article', description: '银河冒险之旅', parentCategory: 'games' },
  { id: 'genshin', name: '原神', type: 'article', description: '提瓦特大陆', parentCategory: 'games' },

  { id: 'original-chara', name: '原创角色', type: 'image-text', description: 'OC 设定与插画', parentCategory: 'paintings' },
  { id: 'scene', name: '场景插画', type: 'image-text', description: '风景与建筑', parentCategory: 'paintings' },

  { id: 'anime', name: '番剧推荐', type: 'article', description: '最近看的动画', parentCategory: 'acg' },
  { id: 'manga', name: '漫画速递', type: 'article', description: '追更与吐槽', parentCategory: 'acg' },
  { id: 'figure', name: '手办收藏', type: 'image-text', description: '开箱与展示', parentCategory: 'acg' },

  { id: 'jpop', name: 'J-Pop', type: 'image-text', description: '流行与独立音乐', parentCategory: 'music' },
  { id: 'ost', name: '游戏OST', type: 'image-text', description: '原声音乐推荐', parentCategory: 'music' },

  { id: 'frontend', name: '前端框架', type: 'article', description: 'Vue / React', parentCategory: 'tech' },
  { id: 'animation', name: '动画技术', type: 'article', description: 'Canvas / WebGL', parentCategory: 'tech' },
]

// 模拟文章，按 categoryId 组织
const allPosts: Record<string, Post[]> = {
  // 游戏分类下的文章
  'delta-force': [
    {
      id: 'd1', categoryId: 'delta-force', title: '三角洲行动新手入坑指南',
      type: 'article',
      summary: '从配装到战术思路', date: '2026-06-01', tags: ['攻略'],
      author: 'IceCandle', avatar: '',
      content: '<p>欢迎来到三角洲行动的世界。本指南将带你快速上手...</p><p>首先，选择合适的干员至关重要。突击兵适合新手，装备推荐...</p>'
    },
    {
      id: 'd2', categoryId: 'delta-force', title: '全地图资源点详解',
      type: 'article',
      summary: '高效搜刮路线推荐', date: '2026-06-10', tags: ['地图'],
      author: 'IceCandle', avatar: '',
      content: '<p>地图零号大坝的资源分布...</p><p>重点区域包括：中央控制室、东侧仓库...</p>'
    },
  ],
  'star-rail': [
    {
      id: 's1', categoryId: 'star-rail', title: '2.0 版本剧情浅析',
      type: 'article',
      summary: '匹诺康尼的梦境叙事', date: '2026-05-20', tags: ['剧情'],
      author: 'IceCandle', avatar: '',
      content: '<p>匹诺康尼的剧情采用了多层梦境结构，现实与梦境的边界逐渐模糊...</p>'
    },
  ],
  'genshin': [
    {
      id: 'g1', categoryId: 'genshin', title: '枫丹角色强度排行',
      type: 'article',
      summary: '4.6 版本深渊环境', date: '2026-06-05', tags: ['强度'],
      author: 'IceCandle', avatar: '',
      content: '<p>4.6 版本深渊祝福为水元素伤害加成，因此那维莱特、芙宁娜仍然位居T0...</p>'
    },
  ],

  // 绘画分类下的图文
  'original-chara': [
    {
      id: 'o1', categoryId: 'original-chara', title: '冰之魔女设定图',
      type: 'image-text',
      cover: '',
      images: ['https://placehold.co/800x600/EEE/999?text=冰之魔女正面', 'https://placehold.co/800x600/EEE/999?text=冰之魔女侧面'],
      author: 'IceCandle', avatar: '',
      description: '冰之魔女角色设定图，包含正面和侧面视图。她是一位掌控冰霜的神秘魔法使，常驻于极北之地的冰晶城堡。',
      date: '2026-04-15'
    },
    {
      id: 'o2', categoryId: 'original-chara', title: '花与剑客立绘过程',
      type: 'image-text',
      cover: '',
      images: ['https://placehold.co/800x600/EEE/999?text=线稿', 'https://placehold.co/800x600/EEE/999?text=上色完成'],
      author: 'IceCandle', avatar: '',
      description: '从草图到上色的完整过程。线稿阶段反复调整了剑的角度，最终选择了斜指地面的构图。',
      date: '2026-05-01'
    },
    {
      id: 'o3', categoryId: 'original-chara', title: 'Q版表情包合集',
      type: 'image-text',
      cover: '',
      images: ['https://placehold.co/600x600/EEE/999?text=表情1', 'https://placehold.co/600x600/EEE/999?text=表情2', 'https://placehold.co/600x600/EEE/999?text=表情3'],
      author: 'IceCandle', avatar: '',
      description: '一组可爱的Q版表情包，可用于社交聊天。',
      date: '2026-06-01'
    },
  ],
  'scene': [
    {
      id: 'sc1', categoryId: 'scene', title: '赛博都市概念图',
      type: 'image-text',
      cover: '',
      images: ['https://placehold.co/800x600/EEE/999?text=赛博都市'],
      author: 'IceCandle', avatar: '',
      description: '未来世界的赛博朋克风格都市，霓虹灯与全息投影交织。',
      date: '2026-03-20'
    },
    {
      id: 'sc2', categoryId: 'scene', title: '夏日海滩场景',
      type: 'image-text',
      cover: '',
      images: ['https://placehold.co/800x600/EEE/999?text=夏日海滩'],
      author: 'IceCandle', avatar: '',
      description: '阳光、沙滩、海浪，还有远处的帆船。',
      date: '2026-05-25'
    },
  ],

  // ACG 分类（文章和图文混合）
  'anime': [
    {
      id: 'a1', categoryId: 'anime', title: '四月新番追番笔记',
      type: 'article',
      summary: '《怪兽8号》观后感', date: '2026-04-10', tags: ['新番'],
      author: 'IceCandle', avatar: '',
      content: '<p>《怪兽8号》动画制作精良，战斗场面流畅，主角日比野卡夫卡的变身设定让人印象深刻...</p>'
    },
    {
      id: 'a2', categoryId: 'anime', title: '霸权社新作点评',
      type: 'article',
      summary: '《O》《P》', date: '2026-05-02', tags: ['点评'],
      author: 'IceCandle', avatar: '',
      content: '<p>霸权社本季度双开，两部作品风格截然不同，一部是黑暗奇幻，一部是日常治愈...</p>'
    },
  ],
  'manga': [
    {
      id: 'm1', categoryId: 'manga', title: '《葬送的芙莉莲》最新话',
      type: 'article',
      summary: '勇者小队的过去', date: '2026-06-08', tags: ['连载'],
      author: 'IceCandle', avatar: '',
      content: '<p>最新话终于揭示了勇者辛美尔与芙莉莲的初次相遇，原来早在千年之前...</p>'
    },
  ],
  'figure': [
    {
      id: 'f1', categoryId: 'figure', title: '初音未来 15周年手办开箱',
      type: 'image-text',
      cover: '',
      images: ['https://placehold.co/800x600/EEE/999?text=手办正面', 'https://placehold.co/800x600/EEE/999?text=手办侧面'],
      author: 'IceCandle', avatar: '',
      description: '初音未来 15周年纪念手办，造型精美，细节还原度高，附带替换表情和配件。',
      date: '2026-06-12'
    },
    {
      id: 'f2', categoryId: 'figure', title: '粘土人展示架DIY',
      type: 'image-text',
      cover: '',
      images: ['https://placehold.co/800x600/EEE/999?text=展示架成品'],
      author: 'IceCandle', avatar: '',
      description: '用亚克力板和LED灯带自制的粘土人展示架，成本不到50元。',
      date: '2026-06-15'
    },
  ],

  // 音乐（图文类型，album art）
  'jpop': [
    {
      id: 'j1', categoryId: 'jpop', title: 'YOASOBI 新专辑《〇〇》',
      type: 'image-text',
      cover: '',
      images: ['https://placehold.co/600x600/EEE/999?text=Album+Art'],
      author: 'YOASOBI',
      description: 'YOASOBI 时隔一年的全新专辑，延续了小说音乐化的风格，主打歌讲述了一个关于时间旅行的故事。',
      date: '2026-06-10'
    },
    {
      id: 'j2', categoryId: 'jpop', title: 'Ado 演唱会现场纪录',
      type: 'image-text',
      cover: '',
      images: ['https://placehold.co/800x600/EEE/999?text=Live+Photo'],
      author: 'Ado',
      description: '2026年 Ado 世界巡回演唱会东京站实录，震撼的舞台表现力。',
      date: '2026-05-20'
    },
  ],
  'ost': [
    {
      id: 'ost1', categoryId: 'ost', title: '《原神》枫丹战斗曲',
      type: 'image-text',
      cover: '',
      images: ['https://placehold.co/800x800/EEE/999?text=OST+Cover'],
      author: 'HOYO-MiX',
      description: '《原神》枫丹地区的战斗音乐，融合了古典与电子元素，极具史诗感。',
      date: '2026-04-20'
    },
    {
      id: 'ost2', categoryId: 'ost', title: '《星穹铁道》OST《雪融于烬》',
      type: 'image-text',
      cover: '',
      images: ['https://placehold.co/800x800/EEE/999?text=OST+Cover'],
      author: 'HOYO-MiX',
      description: '《星穹铁道》匹诺康尼主题OST，曲风空灵，仿佛置身梦境。',
      date: '2026-05-15'
    },
  ],

  // 技术文章
  'frontend': [
    {
      id: 'fe1', categoryId: 'frontend', title: 'Vue 3 组合式 API 最佳实践',
      type: 'article',
      summary: '合理组织代码结构', date: '2026-06-12', tags: ['Vue'],
      author: 'IceCandle', avatar: '',
      content: '<p>组合式 API 提供了更灵活的代码组织方式，但也很容易写出面条代码。本文分享一些最佳实践...</p><h3>1. 使用 Composables 拆分逻辑</h3><p>将相关的状态和方法提取到自定义 hook 中...</p>'
    },
    {
      id: 'fe2', categoryId: 'frontend', title: 'Vite 插件开发入门',
      type: 'article',
      summary: '从零搭建工具链', date: '2026-05-28', tags: ['Vite'],
      author: 'IceCandle', avatar: '',
      content: '<p>Vite 的插件机制基于 Rollup，开发一个简单的插件只需要几行代码...</p>'
    },
  ],
  'animation': [
    {
      id: 'ani1', categoryId: 'animation', title: 'Canvas 粒子系统实现',
      type: 'article',
      summary: '用原生 API 绘制粒子', date: '2026-06-01', tags: ['Canvas'],
      author: 'IceCandle', avatar: '',
      content: '<p>本文将手把手教你用 Canvas 实现一个粒子系统，包含粒子的运动、连线、交互...</p>'
    },
  ],
};

export function useHomeData() {
  // 按大分类获取小分类列表
  const getCategoriesByParent = (parent: Category['parentCategory']) => allCategories.filter(c => c.parentCategory === parent)

  // 根据 categoryId 获取文章
  const getPostsByCategory = (categoryId: string) => allPosts[categoryId] || []

  // 获取所有分类（用于标签条）
  const getAllCategories = () => allCategories

  const loading = ref(false)
  const fetchData = async () => {
    loading.value = true
    await new Promise(resolve => setTimeout(resolve, 300))
    loading.value = false
  }

  return {
    getCategoriesByParent,
    getPostsByCategory,
    getAllCategories,
    loading,
    fetchData
  }
}