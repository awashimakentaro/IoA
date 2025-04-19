"use client"

import { useState, useEffect, useRef } from "react"
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline"

interface SearchFormProps {
  onSearch: (term: string) => void
}

export function SearchForm({ onSearch }: SearchFormProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const recommendedAreas = ["会津若松市", "喜多方市", "会津坂下町", "会津美里町", "南会津町"]

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
        setShowSuggestions(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchTerm(value)
    setShowSuggestions(true)

    if (value.length > 0) {
      const filtered = recommendedAreas.filter((area) => area.toLowerCase().includes(value.toLowerCase()))
      setSuggestions(filtered)
    } else {
      setSuggestions([])
    }
  }

  const handleSuggestionClick = (suggestion: string) => {
    setSearchTerm(suggestion)
    setShowSuggestions(false)
    onSearch(suggestion)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch(searchTerm)
    setShowSuggestions(false)
  }

  return (
    <div className="w-full max-w-4xl px-4 relative">
      <form onSubmit={handleSubmit} className="relative">
        <input
          ref={inputRef}
          type="text"
          placeholder="エリア・物件名で検索"
          className="w-full py-3 px-4 pr-12 border-2 border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-serif"
          value={searchTerm}
          onChange={handleInputChange}
        />
        <button type="submit" className="absolute right-0 top-0 h-full flex items-center pr-4">
          <MagnifyingGlassIcon className="h-6 w-6" />
        </button>
      </form>
      {showSuggestions && suggestions.length > 0 && (
        <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-lg mt-1 shadow-lg">
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleSuggestionClick(suggestion)}
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
      <div className="mt-2 flex flex-wrap gap-2">
        <span className="text-sm text-gray-600">おすすめエリア:</span>
        {recommendedAreas.map((area, index) => (
          <button
            key={index}
            className="text-sm bg-gray-200 hover:bg-gray-300 rounded-full px-3 py-1"
            onClick={() => handleSuggestionClick(area)}
          >
            {area}
          </button>
        ))}
      </div>
    </div>
  )
}

