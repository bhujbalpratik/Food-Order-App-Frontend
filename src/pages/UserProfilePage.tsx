import { useGetCurrentUser, useUpdateUser } from "@/api/UserAPI"
import { UserProfileForm } from "@/forms/User-Profile-Form /UserProfileForm"

export const UserProfilePage = () => {
  const { updateUser, isLoading: isUpdateLoading } = useUpdateUser()
  const { currentUser, isLoading: isGetLoading } = useGetCurrentUser()

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
