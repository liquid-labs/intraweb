import { OAuth2Client } from 'google-auth-library'

const setupAccessLib = ({ projectId, projectNumber }) => {
  let expectedAudience = null
  if (projectNumber && projectId) {
    // Expected Audience for App Engine.
    expectedAudience = `/projects/${projectNumber}/apps/${projectId}`
  }
  /* else if (projectNumber && backendServiceId) { // for future ref; not used here
    // Expected Audience for Compute Engine
    expectedAudience = `/projects/${projectNumber}/global/backendServices/${backendServiceId}`
  } */
  else {
    throw new Error('Could not determine \'expected audience\' for JWT verification.')
  }

  return {
    verifyToken : async(req) => {
      const iapJwt = req.headers?.['x-goog-iap-jwt-assertion']

      const oAuth2Client = new OAuth2Client()
      // Verify the id_token, and access the claims.
      const response = await oAuth2Client.getIapPublicKeys()
      const ticket = await oAuth2Client.verifySignedJwtWithCertsAsync(
        iapJwt,
        response.pubkeys,
        expectedAudience,
        ['https://cloud.google.com/iap']
      )

      return ticket
    }
  }
}

export { setupAccessLib }
