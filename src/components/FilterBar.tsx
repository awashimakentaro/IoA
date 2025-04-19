"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { MapPinIcon, AdjustmentsHorizontalIcon, MapIcon } from "@heroicons/react/24/outline"

export function FilterBar() {
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [selectedAreas, setSelectedAreas] = useState<string[]>([])

  return (
    <div className="bg-white rounded-lg shadow-sm mb-6">
      <div className="grid grid-cols-3 divide-x">
        <button className="flex items-center justify-center py-4 hover:bg-gray-50">
          <MapPinIcon className="h-5 w-5 mr-2 text-gray-600" />
          <span>並び替え</span>
        </button>
        <button
          className="flex items-center justify-center py-4 hover:bg-gray-50"
          onClick={() => setIsFilterOpen(!isFilterOpen)}
        >
          <AdjustmentsHorizontalIcon className="h-5 w-5 mr-2 text-gray-600" />
          <span>条件変更</span>
        </button>
        <button className="flex items-center justify-center py-4 hover:bg-gray-50">
          <MapIcon className="h-5 w-5 mr-2 text-gray-600" />
          <span>地図表示</span>
        </button>
      </div>
      {isFilterOpen && (
        <div className="p-4 border-t">
          <div className="space-y-4">
            <div>
              <h3 className="font-bold mb-2 flex items-center">
                <MapPinIcon className="h-5 w-5 mr-2" />
                エリア
              </h3>
              <div className="flex flex-wrap gap-2">
                {["八戸駅", "陸奥白浜駅", "大久喜駅"].map((area) => (
                  <Button
                    key={area}
                    variant={selectedAreas.includes(area) ? "default" : "outline"}
                    onClick={() => {
                      if (selectedAreas.includes(area)) {
                        setSelectedAreas(selectedAreas.filter((a) => a !== area))
                      } else {
                        setSelectedAreas([...selectedAreas, area])
                      }
                    }}
                  >
                    {area}
                  </Button>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-bold mb-2">詳細条件</h3>
              <div className="space-y-2">
                <label className="flex items-center space-x-2">
                  <input type="checkbox" className="rounded" />
                  <span>キャッシュバック対象物件</span>
                </label>
              </div>
            </div>
          </div>
          <div className="mt-4 flex justify-end">
            <Button onClick={() => setIsFilterOpen(false)}>条件を適用</Button>
          </div>
        </div>
      )}
    </div>
  )
}

