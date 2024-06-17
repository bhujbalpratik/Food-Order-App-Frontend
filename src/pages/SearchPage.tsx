import { useSearchRestaurant } from "@/api/SearchAPI"
import CuisineFilter from "@/components/CuisineFilter"
import PaginationSelector from "@/components/PaginationSelector"
import SearchBar, { SearchForm } from "@/components/SearchBar"
import SearchResultCard from "@/components/SearchResultCard"
import SearchResultInfo from "@/components/SearchResultInfo"
import { useState } from "react"
import { useParams } from "react-router-dom"

export type SearchState = {
  searchQuery: string
  page: number
  selectedCuisines: string[]
}

export const SearchPage = () => {
  const { city } = useParams()

  const [searchState, setSearchState] = useState<SearchState>({
    searchQuery: "",
    page: 1,
    selectedCuisines: [],
  })

  const [isExpanded, setIsExpanded] = useState<boolean>(false)
  const { results, isLoading } = useSearchRestaurant(searchState, city)

  const setSelectedCuisines = (selectedCuisines: string[]) => {
    setSearchState((prev) => ({ ...prev, selectedCuisines, page: 1 }))
  }
  const setPage = (page: number) => {
    setSearchState((prev) => ({ ...prev, page }))
  }

  const setSearchQuery = (searchFormData: SearchForm) => {
    setSearchState((prev) => ({
      ...prev,
      searchQuery: searchFormData.searchQuery,
      page: 1,
    }))
  }

  const resetSearch = () => {
    setSearchState((prev) => ({
      ...prev,
      searchQuery: "",
      page: 1,
    }))
  }
  if (isLoading) {
    return <span>Loading...</span>
  }

  if (!results?.data || !city) {
    return <span>No Results found in {city}</span>
  }
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
      <div id="cuisinesList">
        <CuisineFilter
          selectedCuisines={searchState.selectedCuisines}
          onChange={setSelectedCuisines}
          isExpanded={isExpanded}
          onExpandedClick={() => setIsExpanded((prev) => !prev)}
        />
      </div>
      <div id="mainContent" className="flex flex-col gap-5">
        <SearchBar
          searchQuery={searchState.searchQuery}
          onSubmit={setSearchQuery}
          onReset={resetSearch}
          placeholder="Search By Restaurant Names and Cuisines"
        />
        <SearchResultInfo total={results?.pagignation.total} city={city} />
        {results.data.map((restaurant) => (
          <SearchResultCard restaurant={restaurant} />
        ))}
        <PaginationSelector
          page={results.pagignation.page}
          pages={results.pagignation.pages}
          onPageChange={setPage}
        />
      </div>
    </div>
  )
}
