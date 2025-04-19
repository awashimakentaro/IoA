import { Header } from "@/components/Header"
import { ReviewList } from "@/components/ReviewList"
import { FilterBar } from "@/components/FilterBar"

export default function ReviewsPage() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="container mx-auto px-4 py-8 pt-24">
        <FilterBar />
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold mb-6">すべての物件</h1>
          <ReviewList />
        </div>
      </main>
    </div>
  )
}

