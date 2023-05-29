import { AbilityBuilder, Ability } from '@casl/ability'

export const AppAbility = Ability

const defineRulesFor = (roles, subject) => {
  const { can, rules } = new AbilityBuilder(AppAbility)

  if (roles !== undefined && roles.includes('admin')) {
    // User is an admin
    can('manage', 'all')
  } else {
    can(['read'], 'default')
  }

  return rules
}

export const buildAbilityFor = (roles, subject) => {
  return new AppAbility(defineRulesFor(roles, subject), {
    // https://casl.js.org/v5/en/guide/subject-type-detection
    // @ts-ignore
    detectSubjectType: object => object.type
  })
}

export const defaultACLObj = {
  action: 'read',
  subject: 'default'
}

export default defineRulesFor
