import { User } from "@/types"
import { useAuth0 } from "@auth0/auth0-react"
import { useMutation, useQuery } from "react-query"
import { toast } from "sonner"

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

type CreateUserRequest = {
  auth0Id: string
  email: string
  name: string
}

export const useCreateUser = () => {
  const { getAccessTokenSilently } = useAuth0()

  const createUserRequest = async (user: CreateUserRequest) => {
    const accessToken = await getAccessTokenSilently()
    const res = await fetch(`${API_BASE_URL}/api/user/create`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
    if (!res.ok) {
      throw new Error("Failed to create user")
    }
  }
  const {
    mutateAsync: createUser,
    isLoading,
    isError,
    isSuccess,
  } = useMutation(createUserRequest)

  return { createUser, isLoading, isError, isSuccess }
}

type UpdateUserRequest = {
  name: string
  addressLine1: string
  city: string
  country: string
}

export const useUpdateUser = (refetch: () => void) => {
  const { getAccessTokenSilently } = useAuth0()
  const updateUserRequest = async (formData: UpdateUserRequest) => {
    const accessToken = await getAccessTokenSilently()
    const res = await fetch(`${API_BASE_URL}/api/user/update`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
    if (!res.ok) {
      throw new Error("Failed to update user")
    }
    console.log("Response : ", res.json())
    return res.json
  }
  const {
    mutateAsync: updateUser,
    isLoading,
    error,
    reset,
  } = useMutation(updateUserRequest, {
    onSuccess: () => {
      toast.success("User Profile Updated")
      refetch()
    },
    onError: (error: any) => {
      toast.error(error.toString())
      reset()
    },
  })

  if (error) {
  }
  return { updateUser, isLoading }
}

export const useGetCurrentUser = () => {
  const { getAccessTokenSilently } = useAuth0()

  const getCurrentUserRequest = async (): Promise<User> => {
    const accessToken = await getAccessTokenSilently()
    const res = await fetch(`${API_BASE_URL}/api/user/currentuser`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    })
    if (!res.ok) {
      throw new Error(`Failed to fetch user`)
    }
    return res.json()
  }

  const {
    data: currentUser,
    isLoading,
    error,
    refetch,
  } = useQuery("fetchCurrentUser", getCurrentUserRequest)

  if (error) {
    toast.error(error.toString())
  }
  return { currentUser, isLoading, refetch }
}
