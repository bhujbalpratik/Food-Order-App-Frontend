import { useGetCurrentUser, useUpdateUser } from "@/api/UserAPI"
import { UserProfileForm } from "@/forms/User-Profile-Form /UserProfileForm"

export const UserProfilePage = () => {
  const { currentUser, isLoading: isGetLoading, refetch } = useGetCurrentUser()
  const { updateUser, isLoading: isUpdateLoading } = useUpdateUser(refetch)

  if (isGetLoading) {
    return <span>Loading...</span>
  }
  if (!currentUser) {
    return <span>Unable To Load User Profile</span>
  }

  return (
    <UserProfileForm
      currentUser={currentUser}
      onSave={updateUser}
      isLoading={isUpdateLoading}
    />
  )
}
