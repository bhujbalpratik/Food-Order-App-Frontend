import { useCreateUser } from "@/api/UserAPI"
import { useAuth0 } from "@auth0/auth0-react"
import { useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom"

export const AuthCallbackPage = () => {
  const navigate = useNavigate()
  const { user } = useAuth0()
  const { createUser } = useCreateUser()

  const hasCreatedUser = useRef(false)
  useEffect(() => {
    if (user?.sub && user?.email && user?.nickname && !hasCreatedUser.current) {
      createUser({
        auth0Id: user.sub,
        email: user.email,
        name: user.nickname,
      })
      hasCreatedUser.current = true
    }
    navigate("/")
  }, [createUser, navigate, user])
  return <>Loading...</>
}
