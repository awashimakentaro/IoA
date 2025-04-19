"use client"

import { useState } from "react"
import { StarIcon } from "@heroicons/react/24/solid"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import type { PropertyReview } from "@/types/review"

interface AddReviewModalProps {
  propertyId: number
  propertyName: string
  onClose: () => void
  onSubmit: (propertyId: number, review: PropertyReview) => void
}

export function AddReviewModal({ propertyId, propertyName, onClose, onSubmit }: AddReviewModalProps) {
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (rating === 0 || comment.trim() === "") {
      alert("評価と口コミを入力してください。")
      return
    }

    const newReview: PropertyReview = {
      id: Date.now(),
      user: "匿名ユーザー",
      rating,
      comment,
    }

    onSubmit(propertyId, newReview)
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4">{propertyName}の口コミを投稿</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">評価</label>
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <StarIcon
                  key={star}
                  className={`h-8 w-8 cursor-pointer ${star <= rating ? "text-yellow-400" : "text-gray-300"}`}
                  onClick={() => setRating(star)}
                />
              ))}
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-2">
              口コミ
            </label>
            <Textarea
              id="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={4}
              placeholder="この物件の感想を書いてください"
              className="w-full"
            />
          </div>
          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={onClose}>
              キャンセル
            </Button>
            <Button type="submit">投稿する</Button>
          </div>
        </form>
      </div>
    </div>
  )
}

