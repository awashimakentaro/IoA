"use client"

import { useState, useEffect } from "react"
import { StarIcon } from "@heroicons/react/24/solid"
import type { PropertyReview } from "@/types/review"

interface PropertyReviewsProps {
  propertyId: number
}

export function PropertyReviews({ propertyId }: PropertyReviewsProps) {
  const [reviews, setReviews] = useState<PropertyReview[]>([])

  useEffect(() => {
    // この部分は実際のAPIコールに置き換えてください
    const fetchReviews = async () => {
      // ダミーデータを使用
      const dummyReviews: PropertyReview[] = [
        {
          id: 1,
          user: "Aさん",
          rating: 5,
          comment: "駅から近くて便利です。部屋も清潔で快適でした。",
        },
        {
          id: 2,
          user: "Bさん",
          rating: 4,
          comment: "日当たりが良く、静かな環境です。管理人さんの対応も丁寧でした。",
        },
        {
          id: 3,
          user: "Cさん",
          rating: 3,
          comment: "立地は良いですが、少し古い印象があります。設備の更新が必要かもしれません。",
        },
      ]
      setReviews(dummyReviews)
    }

    fetchReviews()
  }, [])

  return (
    <div className="space-y-4">
      {reviews.map((review) => (
        <div key={review.id} className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center mb-2">
            <span className="font-semibold mr-2">{review.user}</span>
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <StarIcon key={i} className={`h-5 w-5 ${i < review.rating ? "text-yellow-400" : "text-gray-300"}`} />
              ))}
            </div>
          </div>
          <p className="text-gray-700">{review.comment}</p>
        </div>
      ))}
    </div>
  )
}

