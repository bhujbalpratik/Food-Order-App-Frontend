import { useCreateUser } from "@/api/UserAPI"
import { AppState, Auth0Provider, User } from "@auth0/auth0-react"
type Props = {
  children: React.ReactNode
}
export const Auth0ProviderWithNavigate = ({ children }: Props) => {
  const { createUser } = useCreateUser()
  const domain = import.meta.env.VITE_Auth0_DOMAIN
  const clientID = import.meta.env.VITE_Auth0_CLIENT_ID
  const redirectURI = import.meta.env.VITE_Auth0_CALLBACK_URL

  if (!domain || !clientID || !redirectURI) {
    throw new Error("Unable to initialize auth")
  }

  const onRedirectCallback = (appState?: AppState, user?: User) => {
    if (user?.sub && user?.email && user?.nickname) {
      createUser({ auth0Id: user.sub, email: user.email, name: user.nickname })
    }
    console.log("User", user)
  }

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientID}
      authorizationParams={{ redirect_uri: redirectURI }}
      onRedirectCallback={onRedirectCallback}
    >
      {children}
    </Auth0Provider>
  )
}
