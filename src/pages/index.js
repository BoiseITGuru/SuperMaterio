import { useEffect } from 'react'
import { useRouter } from 'next/router'
import Session from 'supertokens-web-js/recipe/session'
import Spinner from 'src/@core/components/spinner'

const Home = () => {
  const router = useRouter()

  useEffect(() => {
    async function doesSessionExist() {
      if ((await Session.doesSessionExist()) && router.route === '/') {
        router.replace('/admin')
      }
    }
    doesSessionExist()
  }, [router.route])

  return <Spinner sx={{ height: '100%' }} />
}

export default Home
