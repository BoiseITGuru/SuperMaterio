// ** React Imports
import { useEffect, useState } from 'react'

// ** Next Import
import { useRouter } from 'next/router'

// ** SuperTokens Imports
import Session from 'supertokens-web-js/recipe/session'

const GuestGuard = props => {
  const { children, fallback } = props

  const [loggedIn, setLoggedIn] = useState(false)

  const router = useRouter()

  useEffect(() => {
    if (!router.isReady) {
      return
    }

    async function doesSessionExist() {
      if ((await Session.doesSessionExist()) && !router.query.returnUrl) {
        setLoggedIn(true)
        router.replace('/')
      } else {
        setLoggedIn(false)
      }
    }
    doesSessionExist()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.route])

  if (!loggedIn) {
    return <>{children}</>
  } else {
    return fallback
  }
}

export default GuestGuard
