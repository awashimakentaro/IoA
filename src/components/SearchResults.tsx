import Image from "next/image"
import { StarIcon } from "@heroicons/react/24/solid"
import type { Review } from "@/types/review"

interface SearchResultsProps {
  results: Review[]
}

export function SearchResults({ results }: SearchResultsProps) {
  return (
    <div className="w-full max-w-4xl">
      <h2 className="text-2xl font-bold mb-4">検索結果</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {results.map((result) => (
          <div key={result.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="relative h-48">
              <Image
                src={result.propertyImages[0] || "/placeholder.svg"}
                alt={result.propertyName}
                layout="fill"
                objectFit="cover"
              />
            </div>
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">{result.propertyName}</h3>
              <div className="flex items-center mb-2">
                <div className="flex mr-2">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon
                      key={i}
                      className={`h-5 w-5 ${i < Math.floor(result.rating) ? "text-yellow-400" : "text-gray-300"}`}
                    />
                  ))}
                </div>
                <span className="text-lg font-semibold">{result.rating.toFixed(1)}</span>
                <span className="text-sm text-gray-500 ml-2">({result.reviewCount}件の口コミ)</span>
              </div>
              {result.details && (
                <div className="mt-2 text-sm">
                  <p>
                    <span className="font-medium">家賃:</span> {result.details.rent}
                  </p>
                  <p>
                    <span className="font-medium">広さ:</span> {result.details.size}
                  </p>
                  <p>
                    <span className="font-medium">立地:</span> {result.details.location}
                  </p>
                  <p>
                    <span className="font-medium">特徴:</span> {result.details.features.join(", ")}
                  </p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

