import type { Metadata } from "next"
import Image from "next/image"
import { Header } from "@/components/Header"
import { StarIcon } from "@heroicons/react/24/solid"
import { getPropertyData } from "@/lib/api"

type Props = {
  params: { id: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const property = await getPropertyData(params.id)
  return {
    title: `物件詳細 - ${property.name}`,
  }
}

export default async function PropertyPage({ params }: Props) {
  const property = await getPropertyData(params.id)

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="container mx-auto px-4 py-8 pt-24">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="relative h-64 sm:h-80 md:h-96">
            <Image src={property.image || "/placeholder.svg"} alt={property.name} fill className="object-cover" />
          </div>
          <div className="p-6">
            <h1 className="text-3xl font-bold mb-2">{property.name}</h1>
            <p className="text-gray-600 mb-4">{property.address}</p>
            <div className="flex items-center mb-6">
              <StarIcon className="h-6 w-6 text-yellow-400" />
              <span className="ml-2 text-xl font-semibold">{property.rating.toFixed(1)}</span>
            </div>

            <h2 className="text-2xl font-semibold mb-4">口コミ</h2>
            <div className="space-y-6">
              {property.reviews.map((review) => (
                <div key={review.id} className="border-b pb-4 last:border-b-0">
                  <div className="flex items-center mb-2">
                    <span className="font-semibold mr-2">{review.user}</span>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <StarIcon
                          key={i}
                          className={`h-5 w-5 ${i < review.rating ? "text-yellow-400" : "text-gray-300"}`}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-700">{review.comment}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

