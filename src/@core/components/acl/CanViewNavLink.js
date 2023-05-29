// ** React Imports
import { useContext } from 'react'

// ** Component Imports
import { AbilityContext } from 'src/@core/components/acl/Can'

const CanViewNavLink = props => {
  // ** Props
  const { children, navLink } = props

  // ** Hook
  const ability = useContext(AbilityContext)
  if (navLink && (!navLink.action || !navLink.subject)) {
    return <>{children}</>
  } else {
    return ability && ability.can(navLink?.action, navLink?.subject) ? <>{children}</> : null
  }
}

export default CanViewNavLink
