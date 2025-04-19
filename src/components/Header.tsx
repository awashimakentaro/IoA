"use client"

import Link from "next/link"
import Image from "next/image"
import { ListBulletIcon, HeartIcon, LockClosedIcon, PencilIcon } from "@heroicons/react/24/outline"
import { useSession, signIn, signOut } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect, useRef } from "react"
import gsap from "gsap"

export function Header() {
  const { data: session } = useSession()
  const router = useRouter()
  
  const logoRef = useRef<HTMLSpanElement>(null)
  const navItemsRef = useRef<HTMLUListElement>(null)

  useEffect(() => {
    
    

    // ロゴのアニメーション
    gsap.fromTo(
      logoRef.current,
      {
        opacity: 0,
        x: -20,
      },
      {
        opacity: 1,
        x: 0,
        duration: 0.8,
        delay: 0.2,
        ease: "back.out(1.7)",
      },
    )

    // ナビゲーションアイテムのアニメーション
    const navItems = navItemsRef.current?.children
    if (navItems) {
      gsap.fromTo(
        navItems,
        {
          opacity: 0,
          y: 20,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.1,
          delay: 0.4,
          ease: "power2.out",
        },
      )
    }
  }, [])

  const handleWriteReviewClick = () => {
    if (!session) {
      signIn("google", { callbackUrl: "/write-review" })
    } else {
      router.push("/write-review")
    }
  }

  return (
    <header  className="bg-white/90 backdrop-blur-sm shadow-sm z-50 fixed w-full">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center font-serif">
        <Link href="/" className="flex items-center">
          <span ref={logoRef} className="ml-2 text-3xl font-bold tracking-widest text-gray-800 relative">
            IoA
            <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-blue-600 transform scale-x-0 hover:scale-x-100 transition-transform duration-300"></span>
          </span>
        </Link>
        <nav>
          <ul ref={navItemsRef} className="flex space-x-6">
            <li>
              <Link href="/reviews" className="flex flex-col items-center text-gray-600 hover:text-gray-800">
                <ListBulletIcon className="h-6 w-6" />
                <span className="text-xs mt-1">一覧表示</span>
              </Link>
            </li>
            <li>
              <Link href="/liked-reviews" className="flex flex-col items-center text-gray-600 hover:text-gray-800">
                <HeartIcon className="h-6 w-6" />
                <span className="text-xs mt-1">いいね</span>
              </Link>
            </li>
            <li>
              <button
                onClick={handleWriteReviewClick}
                className="flex flex-col items-center text-gray-600 hover:text-gray-800"
              >
                <PencilIcon className="h-6 w-6" />
                <span className="text-xs mt-1">口コミを書く</span>
              </button>
            </li>
            <li>
              {session ? (
                <button
                  onClick={() => signOut()}
                  className="flex flex-col items-center text-gray-600 hover:text-gray-800"
                >
                  <Image
                    src={session.user?.image || "/placeholder.svg?height=24&width=24&query=user"}
                    alt="プロフィール"
                    width={24}
                    height={24}
                    className="rounded-full"
                  />
                  <span className="text-xs mt-1">ログアウト</span>
                </button>
              ) : (
                <button
                  onClick={() => signIn("google")}
                  className="flex flex-col items-center text-gray-600 hover:text-gray-800"
                >
                  <LockClosedIcon className="h-6 w-6" />
                  <span className="text-xs mt-1">ログイン</span>
                </button>
              )}
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}
