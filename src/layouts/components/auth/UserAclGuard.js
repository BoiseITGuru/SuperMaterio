// ** React Imports
import { useCallback, useEffect } from 'react'

// ** Next Import
import { useRouter } from 'next/router'

// ** SuperTokens Imports
import Session from 'supertokens-web-js/recipe/session'

// ** Context Imports
import { AbilityContext } from 'src/layouts/components/acl/Can'

// ** Config Import
import { buildAbilityFor } from 'src/configs/acl'

// ** Component Import
import NotAuthorized from 'src/pages/401'
import Spinner from 'src/@core/components/spinner'
import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Util Import
import getHomeRoute from 'src/layouts/components/acl/getHomeRoute'

const AclGuard = props => {
  // ** Props
  const { aclAbilities, children, guestGuard = false, authGuard = true } = props

  // ** Hooks
  const router = useRouter()

  // ** SuperTokens Session
  const doesSessionExist = useCallback(async () => {
    if (await Session.doesSessionExist()) {
      // user is logged in
      return true
    } else {
      // user has not logged in yet
      return false
    }
  }, [])

  // ** Vars
  let ability
  useEffect(() => {
    if (doesSessionExist && !guestGuard && router.route === '/') {
      const homeRoute = getHomeRoute('<TODO - ROLES>')
      router.replace(homeRoute)
    }
  }, [guestGuard, router])

  // User is logged in, build ability for the user based on his role
  if (doesSessionExist && !ability) {
    ability = buildAbilityFor('<TODO - ROLES>', aclAbilities.subject)
    if (router.route === '/') {
      return <Spinner />
    }
  }

  // If guest guard or no guard is true or any error page
  if (guestGuard || router.route === '/404' || router.route === '/500' || !authGuard) {
    // If user is logged in and his ability is built
    if (doesSessionExist && ability) {
      return <AbilityContext.Provider value={ability}>{children}</AbilityContext.Provider>
    } else {
      // If user is not logged in (render pages like login, register etc..)
      return <>{children}</>
    }
  }

  // Check the access of current user and render pages
  if (ability && doesSessionExist && ability.can(aclAbilities.action, aclAbilities.subject)) {
    if (router.route === '/') {
      return <Spinner />
    }

    return <AbilityContext.Provider value={ability}>{children}</AbilityContext.Provider>
  }

  // Render Not Authorized component if the current user has limited access
  return (
    <BlankLayout>
      <NotAuthorized />
    </BlankLayout>
  )
}

export default AclGuard
