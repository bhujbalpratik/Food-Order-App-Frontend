import {
  useCreateRestaurant,
  useGetRestaurant,
  useUpdateRestaurant,
} from "@/api/RestaurantAPI"
import { ManageRestaurantForm } from "@/forms/Manage-Restaurant-form/ManageRestaurantForm"

export const ManageRestaurantPage = () => {
  const { restaurant, refetch } = useGetRestaurant()
  const { createRestaurant, isLoading: createLoading } =
    useCreateRestaurant(refetch)
  const { updateRestarant, isLoading: updateLoading } =
    useUpdateRestaurant(refetch)

  const isEditable = !!restaurant
  return (
    <ManageRestaurantForm
      restaurant={restaurant}
      onSave={isEditable ? updateRestarant : createRestaurant}
      isLoading={createLoading || updateLoading}
    />
  )
}
