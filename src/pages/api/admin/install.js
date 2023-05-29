import UserRoles from 'supertokens-node/recipe/userroles'
import ThirdPartyEmailPassword from 'supertokens-node/recipe/thirdpartyemailpassword'
import NextCors from 'nextjs-cors'
import supertokens from 'supertokens-node'
import { backendConfig } from 'src/configs/backendConfig'

supertokens.init(backendConfig())

export default async function install(req, res) {
  // Set CORs headers
  await NextCors(req, res, {
    methods: ['POST'],
    origin: process.env.NEXT_PUBLIC_WEBSITE_DOMAIN,
    credentials: true,
    allowedHeaders: ['content-type', ...supertokens.getAllCORSHeaders()]
  })

  // Restrict to POST requests only
  if (req.method !== 'POST') {
    res.status(405).send({ message: 'Only POST requests allowed' })
    return
  }

  // Create Admin Role
  await UserRoles.createNewRoleOrAddPermissions('admin', [])

  // Get Submited User's Info
  let usersInfo = await ThirdPartyEmailPassword.getUsersByEmail(req.body.email)

  // Add Admin Role to Submited User
  const response = await UserRoles.addRoleToUser(usersInfo[0].id, 'admin')

  if (response.status === 'UNKNOWN_ROLE_ERROR') {
    res.status(500).send({ error: 'Someting went wrong... admin role not found' })
    return
  }

  if (response.didUserAlreadyHaveRole === true) {
    res.status(400).send({ error: 'Someting went wrong... user already had role' })
    return
  }

  res.status(200).send({ message: 'Admin role created successfully and assigned to user' })
}
