import { Header } from "@/components/Header"
import { LikedReviewList } from "@/components/LikedReviewList"

export default function LikedReviewsPage() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="container mx-auto px-4 py-8 pt-24">
        <h1 className="text-3xl font-bold mb-6">いいねした口コミ</h1>
        <LikedReviewList />
      </main>
    </div>
  )
}

