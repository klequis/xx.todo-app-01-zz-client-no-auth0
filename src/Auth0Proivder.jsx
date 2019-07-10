import React from 'react'
import { 
  auth0Client,
  handleRedirectCallback,
  init,
  isAuthenticated,
  loading,
  loginWithPopup,
  popupOpen,
  user,
} from './react-auth0-spa-2'
export const Auth0Context = React.createContext()

export const Auth0Provider = ({
  children,
}) => {
  return (
    <Auth0Context.Provider
      value={{
        getIdTokenClaims: (...p) => auth0Client.getIdTokenClaims(...p),
        getTokenSilently: (...p) => auth0Client.getTokenSilently(...p),
        getTokenWithPopup: (...p) => auth0Client.getTokenWithPopup(...p),
        handleRedirectCallback,
        init,
        isAuthenticated,
        loading,
        logout: (...p) => auth0Client.logout(...p),
        loginWithPopup,
        loginWithRedirect: (...p) => auth0Client.loginWithRedirect(...p),
        popupOpen,
        user,
      }}
    >
      {children}
    </Auth0Context.Provider>
  )
}

export default Auth0Provider