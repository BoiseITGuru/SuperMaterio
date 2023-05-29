// ** Icon imports
import Login from 'mdi-material-ui/Login'
import Table from 'mdi-material-ui/Table'
import CubeOutline from 'mdi-material-ui/CubeOutline'
import HomeOutline from 'mdi-material-ui/HomeOutline'
import FormatLetterCase from 'mdi-material-ui/FormatLetterCase'
import AccountCogOutline from 'mdi-material-ui/AccountCogOutline'
import CreditCardOutline from 'mdi-material-ui/CreditCardOutline'
import AccountPlusOutline from 'mdi-material-ui/AccountPlusOutline'
import AlertCircleOutline from 'mdi-material-ui/AlertCircleOutline'
import GoogleCirclesExtended from 'mdi-material-ui/GoogleCirclesExtended'

const navigation = () => {
  return [
    {
      title: 'Dashboard',
      icon: HomeOutline,
      path: '/dashboard'
    },
    {
      title: 'Account Settings',
      icon: AccountCogOutline,
      path: '/dashboard/account-settings'
    },
    {
      sectionTitle: 'Site Administration',
      action: 'read',
      subject: 'admin'
    },
    {
      title: 'Users',
      icon: FormatLetterCase,
      path: '/dashboard/admin/users',
      action: 'read',
      subject: 'admin'
    },
    {
      title: 'Site Settings',
      path: '/dashboard/admin/settings',
      icon: GoogleCirclesExtended,
      action: 'read',
      subject: 'admin'
    },
    {
      sectionTitle: 'User Interface'
    },
    {
      title: 'Typography',
      icon: FormatLetterCase,
      path: '/dashboard/typography'
    },
    {
      title: 'Icons',
      path: '/dashboard/icons',
      icon: GoogleCirclesExtended
    },
    {
      title: 'Cards',
      icon: CreditCardOutline,
      path: '/dashboard/cards'
    },
    {
      title: 'Tables',
      icon: Table,
      path: '/dashboard/tables'
    },
    {
      icon: CubeOutline,
      title: 'Form Layouts',
      path: '/dashboard/form-layouts'
    },
    {
      title: 'Error',
      icon: AlertCircleOutline,
      path: '/dashboard/error',
      openInNewTab: true
    }
  ]
}

export default navigation
