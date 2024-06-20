import { useAuth0 } from "@auth0/auth0-react"
import { Button } from "./ui/button"
import { UsernameMenu } from "./UsernameMenu"

export const MainNav = () => {
  const { loginWithRedirect } = useAuth0()

  const { isAuthenticated } = useAuth0()
  return (
    <span className="flex space-x-2 items-center">
      {isAuthenticated ? (
        <UsernameMenu />
      ) : (
        <Button
          variant={"ghost"}
          className="font-bold hover:text-orange-500 hover:bg-white disabled:opacity-85"
          onClick={async () => await loginWithRedirect()}
        >
          Log In
        </Button>
      )}
    </span>
  )
}
