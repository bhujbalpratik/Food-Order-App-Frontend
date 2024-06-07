import { useCreateRestaurant } from "@/api/RestaurantAPI"
import { ManageRestaurantForm } from "@/forms/Manage-Restaurant-form/ManageRestaurantForm"

export const ManageRestaurantPage = () => {
  const { createRestaurant, isLoading } = useCreateRestaurant()
  return (
    <ManageRestaurantForm onSave={createRestaurant} isLoading={isLoading} />
  )
}
