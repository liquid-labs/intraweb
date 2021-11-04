import { google } from 'googleapis'

const accessRules = [
  // { re: /company-org-chart.png/, groups: ['04iylrwe113ay6x'], }
]

const verifyAuthorization = async ({ user, path }) => {
  const { groups } = accessRules.find(({ re }) => path.match(re)) || {}
  
  if (groups) {
    const cloudidentity = google.cloudidentity('v1')
    
    const auth = new google.auth.GoogleAuth({
      scopes: [
        'https://www.googleapis.com/auth/cloud-identity.groups.readonly',
      ]
    })
    const authClient = await auth.getClient()
    google.options({auth: authClient})
    
    // To enable this call, you must give the service accounts 'Group Reader' (or better) admin rights in the Workspace admin console 'Admin roles | Groups Reader | Assign service accounts'
    for (const group of groups) {
      const res = await cloudidentity.groups.memberships.checkTransitiveMembership({
        parent: `groups/${group}`,
        query: `member_key_id == '${user}'`
      })
      
      if (res?.data?.hasMembership) {
        return true
      }
    }
    
    return false
  }
  else return true
}

export { verifyAuthorization }
