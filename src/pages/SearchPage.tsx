import { useSearchRestaurant } from "@/api/SearchAPI"
import SearchResultCard from "@/components/SearchResultCard"
import SearchResultInfo from "@/components/SearchResultInfo"
import { useParams } from "react-router-dom"

export const SearchPage = () => {
  const { city } = useParams()
  const { results, isLoading } = useSearchRestaurant(city)

  if (!results?.data || !city) {
    return <span>NO Results found</span>
  }
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
      <div id="cuisinesList">inserts cuisines here</div>
      <div id="mainContent" className="flex flex-col gap-5">
        <SearchResultInfo total={results?.pagignation.total} city={city} />
        {results.data.map((restaurant) => (
          <SearchResultCard restaurant={restaurant} />
        ))}
      </div>
    </div>
  )
}
