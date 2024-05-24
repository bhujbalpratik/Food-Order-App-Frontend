import { Auth0Provider } from "@auth0/auth0-react"
import { useNavigate } from "react-router-dom"
type Props = {
  children: React.ReactNode
}
export const Auth0ProviderWithNavigate = ({ children }: Props) => {
  const navigate = useNavigate()
  const domain = import.meta.env.VITE_AUTH0_DOMAIN
  const clientID = import.meta.env.VITE_AUTH0_CLIENT_ID
  const redirectURI = import.meta.env.VITE_AUTH0_CALLBACK_URL
  const audience = import.meta.env.VITE_AUTH0_AUDIENCE
  if (!domain || !clientID || !redirectURI || !audience) {
    throw new Error("Unable to initialize auth")
  }

  const onRedirectCallback = async () => {
    navigate("/auth-callback")
  }

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientID}
      authorizationParams={{ redirect_uri: redirectURI, audience }}
      onRedirectCallback={onRedirectCallback}
    >
      {children}
    </Auth0Provider>
  )
}
