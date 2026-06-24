export interface Response {
  data: any
  code: number
  message: string
}

export interface ListResponse {
  data: Array<any>
  code: number
  message: string
}

export interface Category {
  category_id: string | number
  name: string
  type: 'article' | 'image-text'       // 决定文章列表展示方式
  description: string
  parent_id?: number | string
}

// 统一文章/图文条目
export interface Post {
  post_id: string
  category_id: string
  title: string
  type: 'article' | 'image-text'  // 新增：用于区分文章和图文
  summary?: string
  date?: string
  tags?: string[]
  cover?: string
  images?: string[]   // 图文类型多图
  author?: string
  avatar?: string
  content?: string    // 文章内容（HTML）
  description?: string // 图文描述
}

export interface TaskNode {
  task_node_id: string
  title: string
  description: string
  details: string
  status: 'pending' | 'doing' | 'done'
  deadline?: string          // 旧字段，仍保留
  completed_at?: string       // 新增：实际完成时间 (YYYY-MM-DD)
  result?: {                 // 新增：完成结果
    text?: string
    images?: string[]        // 图片 URL 数组
  }
}

export interface Task {
  task_id: string
  title: string
  overall_description: string
  header_image?: string      // 新增：头图
  deadline?: string         // 新增：总体截止时间 (YYYY-MM-DD HH:mm:ss 或 ISO)
  task_nodes: TaskNode[]
}

export interface FloorConfig {
  floor_id: string | number
  category_id: string | number
  type: 'banner' | 'article' | 'image-text'
  title: string
  description: string
  items: any[]            // 由后端已拼装好的卡片数据
  image: string
  link: string
  alt: string
}