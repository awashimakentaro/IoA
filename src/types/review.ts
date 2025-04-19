export interface Review {
  id: number
  propertyName: string
  propertyImages: string[]
  rating: number
  reviewCount: number
  liked: boolean
  details?: PropertyDetails
  user?: string
  comment?: string
  questions?: Question[]
}

export interface PropertyDetails {
  rent: number // 文字列から数値に変更
  size: string
  location: string
  features: string[]
}

export interface PropertyReview {
  id: number
  user: string
  rating: number
  comment: string
}

export interface Question {
  id: number
  user: string
  question: string
  answers: Answer[]
  createdAt: string
}

export interface Answer {
  id: number
  user: string
  content: string
  createdAt: string
}

