import {
  useCreateRestaurant,
  useGetRestaurant,
  useUpdateRestaurant,
} from "@/api/RestaurantAPI"
import { ManageRestaurantForm } from "@/forms/Manage-Restaurant-form/ManageRestaurantForm"

export const ManageRestaurantPage = () => {
  const { createRestaurant, isLoading: createLoading } = useCreateRestaurant()
  const { restaurant, refetch } = useGetRestaurant()
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
