type NotificationType = "like" | "comment" | "follow" | "mention" | "post_update" | "system" | "collaboration" | "aggregated_like" | "aggregated_view"

interface Notification {
  id: string
  type: NotificationType
  message: string
  postId?: string
  userIds?: string[]
  count: number
  isRead: boolean
  createdAt: string
}
