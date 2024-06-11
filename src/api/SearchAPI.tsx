import { RestaurantSearchResponse } from "@/types"
import { useQuery } from "react-query"

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

export const useSearchRestaurant = (city?: string) => {
  const getSearchRestaurant = async (): Promise<RestaurantSearchResponse> => {
    const res = await fetch(`${API_BASE_URL}/api/restaurant/search/${city}`)

    if (!res.ok) {
      throw new Error("Failed to search restaurant")
    }
    return res.json()
  }
  const { data: results, isLoading } = useQuery(
    ["getSearchRestaurant"],
    getSearchRestaurant,
    { enabled: !!city }
  )
  return { results, isLoading }
}
