"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { useSession, signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/Header"
import { SearchForm } from "@/components/SearchForm"
import { SearchResults } from "@/components/SearchResults"
import type { Review } from "@/types/review"
import gsap from "gsap"

export default function Home() {
  const { data: session } = useSession()
  const router = useRouter()
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const searchFormRef = useRef<HTMLDivElement>(null)

  const [searchResults, setSearchResults] = useState<Review[]>([])

  useEffect(() => {
    // Headerのアニメーションが完了するのを待ってから開始
    // Headerのアニメーションは約1.2秒で完了するため、1.5秒後に開始

    // タイトルのアニメーション
    gsap.fromTo(
      titleRef.current,
      {
        opacity: 0,
        x: -50,
      },
      {
        opacity: 1,
        x: 0,
        duration: 1,
        delay: 1.5, // Headerアニメーション完了後に開始
        ease: "power3.out",
      },
    )

    // サブタイトルのアニメーション
    gsap.fromTo(
      subtitleRef.current,
      {
        opacity: 0,
        x: -30,
      },
      {
        opacity: 1,
        x: 0,
        duration: 0.8,
        delay: 2.0, // タイトルの後に開始
        ease: "power2.out",
      },
    )

    // ボタンのアニメーション
    gsap.fromTo(
      buttonRef.current,
      {
        opacity: 0,
        y: 20,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        delay: 2.3, // サブタイトルの後に開始
        ease: "back.out(1.7)",
      },
    )

    // 検索フォームのアニメーション
    gsap.fromTo(
      searchFormRef.current,
      {
        opacity: 0,
        y: 20,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        delay: 2.5, // ボタンの後に開始
        ease: "back.out(1.4)",
      },
    )
  }, [])

  const handleReviewClick = (e: React.MouseEvent) => {
    e.preventDefault()
    if (!session) {
      signIn("google", { callbackUrl: "/write-review" })
    } else {
      router.push("/write-review")
    }
  }

  const handleSearch = (searchTerm: string) => {
    // この部分は実際のAPIコールに置き換えてください
    const allReviews: Review[] = [
      {
        id: 1,
        propertyName: "アワシマンション",
        propertyImages: [
          "https://images.unsplash.com/photo-1568605114967-8130f3a36994",
          "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2",
        ],
        rating: 4.5,
        reviewCount: 10,
        liked: false,
        details: {
          rent: 80000,
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
        ],
        rating: 4.2,
        reviewCount: 8,
        liked: false,
        details: {
          rent: 75000,
          size: "30㎡",
          location: "喜多方市 バス停から徒歩3分",
          features: ["駐車場付き", "ペット可", "オートロック"],
        },
      },
    ]

    const filteredResults = allReviews.filter(
      (review) =>
        review.propertyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        review.details?.location.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    setSearchResults(filteredResults)
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="container mx-auto px-5 py-8 pt-24 flex flex-col items-center justify-center">
        {/* ロゴとタイトル */}
        <div className="text-center mb-12 mt-8">
          <h1 ref={titleRef} className="font-serif text-5xl mb-4 opacity-0">
            <span className="text-6xl">会津</span>の賃貸の
            <span className="text-6xl font-bold tracking-wider">Real</span>
          </h1>
          <div ref={subtitleRef} className="font-serif text-2xl tracking-widest mb-4 opacity-0">
            <div>IoA</div>
            <div className="text-sm text-gray-600">Information Of Aizu apartment</div>
          </div>
        </div>

        <div className="flex flex-col items-center space-y-8 mb-12 w-full max-w-4xl">
          {/* 口コミ投稿ボタン */}
          <button
            ref={buttonRef}
            onClick={handleReviewClick}
            className="inline-block px-8 py-3 border-2 border-black hover:bg-black hover:text-white transition-colors duration-300 font-serif tracking-wider opacity-0"
          >
            口コミを投稿する
          </button>

          {/* 検索フォーム */}
          <div ref={searchFormRef} className="w-full opacity-0">
            <SearchForm onSearch={handleSearch} />
          </div>
        </div>

        {/* 検索結果 */}
        {searchResults.length > 0 && <SearchResults results={searchResults} />}
      </main>
    </div>
  )
}
