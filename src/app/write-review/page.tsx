"use client"

import { useState, useRef } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/Header"
import { StarIcon, CloudArrowUpIcon } from "@heroicons/react/24/solid"
import Image from "next/image"

export default function WriteReviewPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [propertyName, setPropertyName] = useState("")
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState("")
  const [rent, setRent] = useState("")
  const [size, setSize] = useState("")
  const [location, setLocation] = useState("")
  const [features, setFeatures] = useState<string[]>([])
  const [image, setImage] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  if (status === "unauthenticated") {
    router.push("/")
    return null
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImage(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleFeatureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const feature = e.target.value
    if (e.target.checked) {
      setFeatures([...features, feature])
    } else {
      setFeatures(features.filter((f) => f !== feature))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log({
      propertyName,
      rating,
      comment,
      userId: session?.user?.email,
      rent,
      size,
      location,
      features,
      image,
    })
    // ここで実際のAPIを呼び出して、データを保存する処理を追加します
    alert("口コミが投稿されました！")
    router.push("/reviews")
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="container mx-auto px-4 py-8 pt-24">
        <h1 className="text-3xl font-bold mb-6">口コミを書く</h1>
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="propertyName">
              物件名
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="propertyName"
              type="text"
              placeholder="物件名を入力してください"
              value={propertyName}
              onChange={(e) => setPropertyName(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">評価</label>
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <StarIcon
                  key={star}
                  className={`h-6 w-6 cursor-pointer ${star <= rating ? "text-yellow-400" : "text-gray-300"}`}
                  onClick={() => setRating(star)}
                />
              ))}
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="comment">
              コメント
            </label>
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="comment"
              placeholder="口コミを入力してください"
              rows={4}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              required
            ></textarea>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="rent">
              家賃
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="rent"
              type="text"
              placeholder="例: 80,000円"
              value={rent}
              onChange={(e) => setRent(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="size">
              広さ
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="size"
              type="text"
              placeholder="例: 25㎡"
              value={size}
              onChange={(e) => setSize(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="location">
              立地
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="location"
              type="text"
              placeholder="例: 駅から徒歩5分"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">特徴</label>
            <div className="flex flex-wrap gap-4">
              {["エアコン", "バス���トイレ別", "宅配ボックス", "駐車場付き", "ペット可", "オートロック"].map(
                (feature) => (
                  <label key={feature} className="inline-flex items-center">
                    <input
                      type="checkbox"
                      className="form-checkbox"
                      value={feature}
                      checked={features.includes(feature)}
                      onChange={handleFeatureChange}
                    />
                    <span className="ml-2">{feature}</span>
                  </label>
                ),
              )}
            </div>
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">物件画像</label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
              <div className="space-y-1 text-center">
                {image ? (
                  <Image
                    src={image || "/placeholder.svg"}
                    alt="アップロードされた画像"
                    width={200}
                    height={200}
                    className="mx-auto"
                  />
                ) : (
                  <CloudArrowUpIcon className="mx-auto h-12 w-12 text-gray-400" />
                )}
                <div className="flex text-sm text-gray-600">
                  <label
                    htmlFor="file-upload"
                    className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                  >
                    <span>画像をアップロード</span>
                    <input
                      id="file-upload"
                      name="file-upload"
                      type="file"
                      className="sr-only"
                      accept="image/*"
                      onChange={handleImageUpload}
                      ref={fileInputRef}
                    />
                  </label>
                  <p className="pl-1">またはドラッグ＆ドロップ</p>
                </div>
                <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              投稿する
            </button>
          </div>
        </form>
      </main>
    </div>
  )
}

