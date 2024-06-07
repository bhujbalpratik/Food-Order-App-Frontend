import { RestaurantFormData } from "@/forms/Manage-Restaurant-form/ManageRestaurantForm"
import { Restaurant } from "@/types"
import { useAuth0 } from "@auth0/auth0-react"
import { useMutation } from "react-query"
import { toast } from "sonner"

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

export const useCreateRestaurant = () => {
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
  const {
    mutate: createRestaurant,
    isLoading,
    isSuccess,
    error,
  } = useMutation(createRestaurantRequest)
  if (isSuccess) {
    toast.success("Restaurant Created")
  }
  if (error) {
    toast.error("Unable to create restaurant")
  }
  return { createRestaurant, isLoading }
}
