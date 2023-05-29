// ** React Imports
import { useContext } from 'react'

// ** Component Imports
import { AbilityContext } from 'src/@core/components/acl/Can'

const CanViewNavSectionTitle = props => {
  // ** Props
  const { children, navTitle } = props

  // ** Hook
  const ability = useContext(AbilityContext)
  if (navTitle && (!navTitle.action || !navTitle.subject)) {
    return <>{children}</>
  } else {
    return ability && ability.can(navTitle?.action, navTitle?.subject) ? <>{children}</> : null
  }
}

export default CanViewNavSectionTitle
