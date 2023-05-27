import ThirdPartyEmailPasswordReact from 'supertokens-auth-react/recipe/thirdpartyemailpassword'
import SessionReact from 'supertokens-auth-react/recipe/session'
import { appInfo } from './appInfo'
import Router from 'next/router'

export const frontendConfig = () => {
  return {
    appInfo,
    recipeList: [
      ThirdPartyEmailPasswordReact.init({
        signInAndUpFeature: {
          disableDefaultUI: true,
          providers: [
            ThirdPartyEmailPasswordReact.Google.init(),
            ThirdPartyEmailPasswordReact.Facebook.init(),
            ThirdPartyEmailPasswordReact.Github.init(),
            ThirdPartyEmailPasswordReact.Apple.init()
          ]
        }
      }),
      SessionReact.init()
    ],
    // The user will be taken to the custom path when then need to login.
    getRedirectionURL: async context => {
      if (context.action === 'TO_AUTH') {
        return '/login'
      }
    },
    windowHandler: oI => {
      return {
        ...oI,
        location: {
          ...oI.location,
          setHref: href => {
            Router.push(href)
          }
        }
      }
    }
  }
}
