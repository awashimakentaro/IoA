import "./globals.css"
import type { Metadata } from "next"
import { Providers } from "@/components/Providers"
import type React from "react" // Added import for React

export const metadata: Metadata = {
  title: "アパート情報サイト",
  description: "学生向けアパート情報共有サービス",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
{/* このレイアウトファイルは、アプリケーション全体の基本構造を定義し、共通の設定（メタデータ、言語、プロバイダーなど）を適用します。これにより、個々のページコンポーネントでこれらの共通要素を繰り返し記述する必要がなくなり、コードの重複を避けることができます*/}

