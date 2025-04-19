"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import {
  StarIcon,
  HeartIcon,
  ChatBubbleLeftIcon,
  PencilIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  AdjustmentsHorizontalIcon,
} from "@heroicons/react/24/solid"
import type { Review, PropertyReview } from "@/types/review"
import { Button } from "@/components/ui/button"
import { PropertyReviews } from "@/components/PropertyReviews"
import { AddReviewModal } from "@/components/AddReviewModal"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

type SortOption = "rating" | "reviewCount" | "rent"
type FilterOption = "hasParking" | "isPetFriendly" | "hasAirCon"

export function ReviewList() {
  const [reviews, setReviews] = useState<Review[]>([])
  const [filteredReviews, setFilteredReviews] = useState<Review[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isAddReviewModalOpen, setIsAddReviewModalOpen] = useState(false)
  const [selectedPropertyId, setSelectedPropertyId] = useState<number | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState<{ [key: number]: number }>({})
  const [sortOption, setSortOption] = useState<SortOption>("rating")
  const [filterOptions, setFilterOptions] = useState<FilterOption[]>([])

  useEffect(() => {
    // この部分は実際のAPIコールに置き換えてください
    const initialReviews: Review[] = [
      {
        id: 1,
        propertyName: "アワシマンション",
        propertyImages: [
          "https://images.unsplash.com/photo-1568605114967-8130f3a36994",
          "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2",
          "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688",
        ],
        rating: 4.5,
        reviewCount: 10,
        liked: false,
        details: {
          rent: 0,
          size: "25㎡",
          location: "会津若松市 駅から徒歩5分",
          features: ["エアコン", "バス・トイレ別", "宅配ボックス"],
        },
      },
      {
        id: 2,
        propertyName: "Cathyマンション",
        propertyImages: [
          "https://images.unsplash.com/photo-1580587771525-78b9dba3b914",
          "https://images.unsplash.com/photo-1584622650111-993a426fbf0a",
          "https://images.unsplash.com/photo-1493809842364-78817add7ffb",
        ],
        rating: 4.2,
        reviewCount: 8,
        liked: false,
        details: {
          rent: 999999,
          size: "30㎡",
          location: "喜多方市 バス停から徒歩3分",
          features: ["駐車場付き", "ペット可", "オートロック"],
        },
      },
      {
        id: 3,
        propertyName: "延松ハイツ",
        propertyImages: [
          "https://images.unsplash.com/photo-1576941089067-2de3c901e126",
          "https://images.unsplash.com/photo-1598928506311-c55ded91a20c",
          "https://images.unsplash.com/photo-1515263487990-61b07816b324",
        ],
        rating: 3.8,
        reviewCount: 15,
        liked: false,
        details: {
          rent: 70000,
          size: "22㎡",
          location: "会津若松市 駅から徒歩10分",
          features: ["インターネット無料", "コインランドリー", "バルコニー付き"],
        },
      },
    ]
    setReviews(initialReviews)
    setFilteredReviews(initialReviews)
    const initialImageIndex = initialReviews.reduce(
      (acc, review) => {
        acc[review.id] = 0
        return acc
      },
      {} as { [key: number]: number },
    )
    setCurrentImageIndex(initialImageIndex)
  }, [])

  useEffect(() => {
    const savedLikes = JSON.parse(localStorage.getItem("likedReviews") || "[]")
    setReviews((prevReviews) =>
      prevReviews.map((review) => ({
        ...review,
        liked: savedLikes.includes(review.id),
      })),
    )
  }, [])

  useEffect(() => {
    const sorted = [...reviews]
    if (sortOption === "rating") {
      sorted.sort((a, b) => b.rating - a.rating)
    } else if (sortOption === "reviewCount") {
      sorted.sort((a, b) => b.reviewCount - a.reviewCount)
    } else if (sortOption === "rent") {
      sorted.sort((a, b) => (a.details?.rent || 0) - (b.details?.rent || 0))
    }

    const filtered = sorted.filter((review) => {
      if (filterOptions.includes("hasParking") && !review.details?.features.includes("駐車場付き")) {
        return false
      }
      if (filterOptions.includes("isPetFriendly") && !review.details?.features.includes("ペット可")) {
        return false
      }
      if (filterOptions.includes("hasAirCon") && !review.details?.features.includes("エアコン")) {
        return false
      }
      return true
    })

    setFilteredReviews(filtered)
  }, [reviews, sortOption, filterOptions])

  const handleLike = (id: number) => {
    const updatedReviews = reviews.map((review) => (review.id === id ? { ...review, liked: !review.liked } : review))
    setReviews(updatedReviews)

    const likedReviewIds = updatedReviews.filter((review) => review.liked).map((review) => review.id)
    localStorage.setItem("likedReviews", JSON.stringify(likedReviewIds))

    // カスタムイベントを発行
    const event = new CustomEvent("likedReviewsUpdated", { detail: likedReviewIds })
    window.dispatchEvent(event)
  }

  const handleAddReview = (propertyId: number, newReview: PropertyReview) => {
    const savedReviews = JSON.parse(localStorage.getItem(`propertyReviews_${propertyId}`) || "[]")
    const updatedReviews = [...savedReviews, newReview]
    localStorage.setItem(`propertyReviews_${propertyId}`, JSON.stringify(updatedReviews))
    setIsAddReviewModalOpen(false)
  }

  const handlePrevImage = (reviewId: number) => {
    setCurrentImageIndex((prev) => {
      const review = reviews.find((r) => r.id === reviewId)
      if (!review) return prev
      return {
        ...prev,
        [reviewId]: (prev[reviewId] - 1 + review.propertyImages.length) % review.propertyImages.length,
      }
    })
  }

  const handleNextImage = (reviewId: number) => {
    setCurrentImageIndex((prev) => {
      const review = reviews.find((r) => r.id === reviewId)
      if (!review) return prev
      return {
        ...prev,
        [reviewId]: (prev[reviewId] + 1) % review.propertyImages.length,
      }
    })
  }

  const handleSortChange = (option: SortOption) => {
    setSortOption(option)
  }

  const handleFilterChange = (option: FilterOption) => {
    setFilterOptions((prev) => (prev.includes(option) ? prev.filter((o) => o !== option) : [...prev, option]))
  }

  return (
    <div className="space-y-6 bg-gray-100 min-h-screen p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">物件一覧</h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">
              <AdjustmentsHorizontalIcon className="h-5 w-5 mr-2" />
              並び替え・絞り込み
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-white">
            <DialogHeader>
              <DialogTitle>並び替え・絞り込み</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">並び替え</h3>
                <div className="space-y-2">
                  <Label className="flex items-center space-x-2">
                    <input type="radio" checked={sortOption === "rating"} onChange={() => handleSortChange("rating")} />
                    <span>評価順</span>
                  </Label>
                  <Label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      checked={sortOption === "reviewCount"}
                      onChange={() => handleSortChange("reviewCount")}
                    />
                    <span>口コミ数順</span>
                  </Label>
                  <Label className="flex items-center space-x-2">
                    <input type="radio" checked={sortOption === "rent"} onChange={() => handleSortChange("rent")} />
                    <span>家賃順</span>
                  </Label>
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-2">絞り込み</h3>
                <div className="space-y-2">
                  <Label className="flex items-center space-x-2">
                    <Checkbox
                      checked={filterOptions.includes("hasParking")}
                      onCheckedChange={() => handleFilterChange("hasParking")}
                    />
                    <span>駐車場あり</span>
                  </Label>
                  <Label className="flex items-center space-x-2">
                    <Checkbox
                      checked={filterOptions.includes("isPetFriendly")}
                      onCheckedChange={() => handleFilterChange("isPetFriendly")}
                    />
                    <span>ペット可</span>
                  </Label>
                  <Label className="flex items-center space-x-2">
                    <Checkbox
                      checked={filterOptions.includes("hasAirCon")}
                      onCheckedChange={() => handleFilterChange("hasAirCon")}
                    />
                    <span>エアコン付き</span>
                  </Label>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {filteredReviews.map((review) => (
        <div key={review.id} className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200">
          <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-[400px] p-4">
              <div className="w-full h-[300px] md:h-[400px] relative">
                <Image
                  src={review.propertyImages[currentImageIndex[review.id]] || "/placeholder.svg"}
                  alt={review.propertyName}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-lg"
                />
                {review.propertyImages.length > 1 && (
                  <>
                    <button
                      onClick={() => handlePrevImage(review.id)}
                      className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-2"
                      aria-label="前の画像"
                    >
                      <ChevronLeftIcon className="h-6 w-6 text-gray-800" />
                    </button>
                    <button
                      onClick={() => handleNextImage(review.id)}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-2"
                      aria-label="次の画像"
                    >
                      <ChevronRightIcon className="h-6 w-6 text-gray-800" />
                    </button>
                  </>
                )}
              </div>
            </div>
            <div className="flex-grow p-6">
              <h2 className="text-2xl font-semibold mb-2">{review.propertyName}</h2>
              <div className="flex items-center mb-4">
                <div className="flex mr-2">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon
                      key={i}
                      className={`h-5 w-5 ${i < Math.floor(review.rating) ? "text-yellow-400" : "text-gray-300"}`}
                    />
                  ))}
                </div>
                <span className="text-lg font-semibold">{review.rating.toFixed(1)}</span>
                <span className="text-sm text-gray-500 ml-2">({review.reviewCount}件の口コミ)</span>
              </div>
              {review.details && (
                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-semibold mb-2">物件詳細</h3>
                  <ul className="space-y-2">
                    <li>
                      <span className="font-medium">家賃:</span> {review.details?.rent.toLocaleString()}円
                    </li>
                    <li>
                      <span className="font-medium">広さ:</span> {review.details.size}
                    </li>
                    <li>
                      <span className="font-medium">立地:</span> {review.details.location}
                    </li>
                    <li>
                      <span className="font-medium">特徴:</span>
                      <ul className="list-disc list-inside ml-4">
                        {review.details.features.map((feature, index) => (
                          <li key={index}>{feature}</li>
                        ))}
                      </ul>
                    </li>
                  </ul>
                </div>
              )}
              <div className="flex items-center justify-between mt-6">
                <button
                  onClick={() => handleLike(review.id)}
                  className={`flex items-center ${review.liked ? "text-red-500" : "text-gray-500"} hover:text-red-500`}
                >
                  <HeartIcon className="h-5 w-5 mr-1" />
                  {review.liked ? "いいね済み" : "いいね"}
                </button>

                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    className="bg-white hover:bg-gray-100 flex items-center"
                    onClick={() => {
                      setSelectedPropertyId(review.id)
                      setIsModalOpen(true)
                    }}
                  >
                    <ChatBubbleLeftIcon className="h-5 w-5 mr-1" />
                    口コミを見る
                  </Button>
                  <Button
                    variant="outline"
                    className="bg-white hover:bg-gray-100 flex items-center"
                    onClick={() => {
                      setSelectedPropertyId(review.id)
                      setIsAddReviewModalOpen(true)
                    }}
                  >
                    <PencilIcon className="h-5 w-5 mr-1" />
                    口コミを投稿
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {isModalOpen && selectedPropertyId && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-4xl max-h-[80vh] overflow-y-auto shadow-xl">
            <h2 className="text-2xl font-bold mb-4">
              {reviews.find((r) => r.id === selectedPropertyId)?.propertyName}の口コミ
            </h2>
            <p className="mb-4">この物件に関する全ての口コミを表示しています。</p>
            <PropertyReviews propertyId={selectedPropertyId} />
            <Button onClick={() => setIsModalOpen(false)} className="mt-4">
              閉じる
            </Button>
          </div>
        </div>
      )}

      {isAddReviewModalOpen && selectedPropertyId && (
        <AddReviewModal
          propertyId={selectedPropertyId}
          propertyName={reviews.find((r) => r.id === selectedPropertyId)?.propertyName || ""}
          onClose={() => setIsAddReviewModalOpen(false)}
          onSubmit={handleAddReview}
        />
      )}
    </div>
  )
}

