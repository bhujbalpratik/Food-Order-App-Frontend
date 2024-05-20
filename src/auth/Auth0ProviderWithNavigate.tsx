import { AppState, Auth0Provider, useAuth0, User } from "@auth0/auth0-react"
import { useNavigate } from "react-router-dom"
type Props = {
  children: React.ReactNode
}
export const Auth0ProviderWithNavigate = ({ children }: Props) => {
  const { getAccessTokenSilently } = useAuth0()
  const navigate = useNavigate()
  const domain = import.meta.env.VITE_Auth0_DOMAIN
  const clientID = import.meta.env.VITE_Auth0_CLIENT_ID
  const redirectURI = import.meta.env.VITE_Auth0_CALLBACK_URL

  if (!domain || !clientID || !redirectURI) {
    throw new Error("Unable to initialize auth")
  }

  const onRedirectCallback = async () => {
    navigate("/auth-callback")
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
