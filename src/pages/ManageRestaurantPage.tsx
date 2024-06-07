import { useCreateRestaurant, useGetRestaurant } from "@/api/RestaurantAPI"
import { ManageRestaurantForm } from "@/forms/Manage-Restaurant-form/ManageRestaurantForm"

export const ManageRestaurantPage = () => {
  const { createRestaurant, isLoading } = useCreateRestaurant()
  const { restaurant } = useGetRestaurant()
  return (
    <ManageRestaurantForm
      restaurant={restaurant}
      onSave={createRestaurant}
      isLoading={isLoading}
    />
  )
}
