// ** React Imports
import { useEffect, useState } from 'react'

// ** Next Import
import { useRouter } from 'next/router'

// ** SuperTokens Imports
import Session from 'supertokens-web-js/recipe/session'

const AuthGuard = props => {
  const [loggedIn, setLoggedIn] = useState(false)

  const { children, fallback } = props
  const router = useRouter()
  useEffect(
    () => {
      if (!router.isReady) {
        return
      }

      async function doesSessionExist() {
        if (await Session.doesSessionExist()) {
          // User is Logged In
          setLoggedIn(true)
        } else {
          // Not Logged In
          setLoggedIn(false)
          if (router.asPath !== '/') {
            router.replace({
              pathname: '/login',
              query: { returnUrl: router.asPath }
            })
          } else {
            router.replace('/login')
          }
        }
      }

      doesSessionExist()
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [router.route]
  )
  if (!loggedIn) {
    return fallback
  }

  return <>{children}</>
}

export default AuthGuard
