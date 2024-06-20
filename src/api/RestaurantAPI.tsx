import { Restaurant } from "@/types"
import { useAuth0 } from "@auth0/auth0-react"
import { useMutation, useQuery } from "react-query"
import { toast } from "sonner"

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

export const useCreateRestaurant = (refetch: () => void) => {
  const { getAccessTokenSilently } = useAuth0()
  const createRestaurantRequest = async (
    restaurantFormData: FormData
  ): Promise<Restaurant> => {
    console.log("Inside hook formData", restaurantFormData)

    const accessToken = await getAccessTokenSilently()
    const res = await fetch(`${API_BASE_URL}/api/restaurant`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: restaurantFormData,
    })
    if (!res.ok) {
      throw new Error("Failed to create restaurant")
    }
    return res.json()
  }
  const { mutate: createRestaurant, isLoading } = useMutation(
    createRestaurantRequest,
    {
      onSuccess: () => {
        toast.success("Restaurant Created")
        refetch()
      },
      onError: () => {
        toast.error("Unable to create restaurant")
      },
    }
  )

  return { createRestaurant, isLoading }
}

export const useGetRestaurant = () => {
  const { getAccessTokenSilently } = useAuth0()

  const getRestaurantRequest = async (): Promise<Restaurant> => {
    const accessToken = await getAccessTokenSilently()
    const res = await fetch(`${API_BASE_URL}/api/restaurant`, {
      method: "GET",
      headers: { Authorization: `Bearer ${accessToken}` },
    })

    if (!res.ok) {
      throw new Error(`Failed to get restaurant`)
    }
    return res.json()
  }
  const {
    data: restaurant,
    isLoading,
    refetch,
  } = useQuery("fetchRestaurant", getRestaurantRequest)
  return { restaurant, isLoading, refetch }
}

export const useUpdateRestaurant = (refetch: () => void) => {
  const { getAccessTokenSilently } = useAuth0()

  const updateRestaurantRequest = async (
    restaurantFormData: FormData
  ): Promise<Restaurant> => {
    const accessToken = await getAccessTokenSilently()
    const res = await fetch(`${API_BASE_URL}/api/restaurant`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: restaurantFormData,
    })

    if (!res.ok) {
      throw new Error(`Failed to update Restaurant`)
    }

    return res.json()
  }

  const { mutate: updateRestarant, isLoading } = useMutation(
    updateRestaurantRequest,
    {
      onSuccess: () => {
        toast.success("Restaurant updated successfully")
        refetch()
      },
      onError: () => {
        toast.error("Unable to update restaurant")
      },
    }
  )

  return { updateRestarant, isLoading }
}

export const useGetRestaurantDetails = (restaurantId?: string) => {
  const getRestaurantDetailsRequest = async (): Promise<Restaurant> => {
    const res = await fetch(`${API_BASE_URL}/api/restaurant/${restaurantId}`)

    if (!res.ok) {
      throw new Error(`Failed to fetch restaurant details`)
    }
    return res.json()
  }

  const { data: restaurant, isLoading } = useQuery(
    "fetchRestaurantDetails",
    getRestaurantDetailsRequest,
    { enabled: !!restaurantId }
  )
  return { restaurant, isLoading }
}
