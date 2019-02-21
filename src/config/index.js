import { clientId, clientSecret } from '../../.env'

const env = process.env.NODE_ENV
const dev = 'http://localhost:8000'
const prod = 'http://nit.uesc.br/sisnit-server/public'

const client = () => {
  return {
    client_id: clientId,
    client_secret: clientSecret
  }
}

const header = () => {
  const authTokens = JSON.parse(window.localStorage.getItem('authTokens'))
  const headers = {
    'Accept': 'application/json',
    'Authorization': 'Bearer ' + authTokens.access_token
  }
  return headers
}

export const api = options => {
  let secure = options.secure === undefined ? true : options.secure
  if (secure) {
    if (env === 'production') return `${prod}/api/v1/${options.service ? options.service + '/' : ''}${options.target}`
    return `${dev}/api/v1/${options.service ? options.service + '/' : ''}${options.target}`
  } else {
    if (env === 'production') return `${prod}/${options.service ? options.service + '/' : ''}${options.target}`
    return `${dev}/${options.service ? options.service + '/' : ''}${options.target}`
  }
}

// export const geoencoding = (key, options) => {
//   return `https://maps.googleapis.com/maps/api/geocode/json?latlng=${options.lat},${options.lng}&key=${key}`
// }

export {
  client,
  header
}
