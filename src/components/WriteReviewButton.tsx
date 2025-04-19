"use client"

import { useSession, signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import type React from "react"

export function WriteReviewButton() {
  const { data: session } = useSession()
  const router = useRouter()

  const handleReviewClick = (e: React.MouseEvent) => {
    e.preventDefault()
    if (!session) {
      signIn("google", { callbackUrl: "/write-review" })
    } else {
      router.push("/write-review")
    }
  }

  return (
    <button
      onClick={handleReviewClick}
      className="inline-block mb-8 px-8 py-3 border-2 border-black hover:bg-black hover:text-white transition-colors duration-300 font-serif tracking-wider"
    >
      口コミを投稿する
    </button>
  )
}

