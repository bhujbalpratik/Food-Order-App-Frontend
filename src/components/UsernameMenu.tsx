import { CircleUserRound } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "./ui/dropdown-menu"
import { useAuth0 } from "@auth0/auth0-react"

import { Link } from "react-router-dom"
import { Separator } from "./ui/separator"
import { Button } from "./ui/button"
import { useGetCurrentUser } from "@/api/UserAPI"

export const UsernameMenu = () => {
  const { logout } = useAuth0()
  const { currentUser } = useGetCurrentUser()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center px-3 font-bold hover:text-orange-500 gap-2">
        <CircleUserRound className="text-orange-500" />
        {currentUser?.name}
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>
          <Link
            to={"/user-profile"}
            className="font-bold hover:text-orange-500"
          >
            Profile
          </Link>
        </DropdownMenuItem>
        <Separator />
        <DropdownMenuItem>
          <Button
            onClick={() => logout()}
            className="flex flex-1 font-bold bg-orange-500"
          >
            Log Out
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
