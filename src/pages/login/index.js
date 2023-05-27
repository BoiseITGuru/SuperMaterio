// ** SuperToken Imports
import { SignInAndUp } from 'supertokens-auth-react/recipe/thirdpartyemailpassword/prebuiltui'
import Session from 'supertokens-auth-react/recipe/session'

// ** MUI Components
import Box from '@mui/material/Box'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Demo Imports
import FooterIllustrationsV1 from 'src/views/pages/auth/FooterIllustration'

const LoginPage = () => {
  let sessionContext = Session.useSessionContext()
  if (sessionContext.loading) {
    return null
  }

  return (
    <Box className='content-center'>
      <SignInAndUp />
      <FooterIllustrationsV1 />
    </Box>
  )
}
LoginPage.getLayout = page => <BlankLayout>{page}</BlankLayout>
LoginPage.guestGuard = true

export default LoginPage
