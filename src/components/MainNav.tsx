import { useAuth0 } from "@auth0/auth0-react"
import { Button } from "./ui/button"
import { UsernameMenu } from "./UsernameMenu"
import { useGetCurrentUser } from "@/api/UserAPI"

export const MainNav = () => {
  const { loginWithRedirect } = useAuth0()
  const { currentUser, isLoading } = useGetCurrentUser()
  return (
    <span className="flex space-x-2 items-center">
      {currentUser ? (
        <UsernameMenu />
      ) : (
        <Button
          disabled={isLoading}
          variant={"ghost"}
          className="font-bold hover:text-orange-500 hover:bg-white disabled:opacity-85"
          onClick={async () => await loginWithRedirect()}
        >
          {isLoading ? "Loading..." : "Log In"}
        </Button>
      )}
    </span>
  )
}
