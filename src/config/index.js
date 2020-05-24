import { clientId, clientSecret } from '../../.env.js'

const env = process.env.NODE_ENV
const dev = {
  prod: 'http://localhost:8000',
  beta: 'http://localhost:8001'
}
const prod = {
  prod: 'https://prod.race.srv.br',
  beta: 'https://beta.race.srv.br'
}
// const dev = 'https://back.race.srv.br'

const client = (conn) => {
  return {
    client_id: clientId,
    client_secret: clientSecret(conn)
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
  let conn = options.conn === undefined ? 'prod' : options.conn
  let clerance = options.clerance === undefined ? '' : (options.clerance === 'admin' ? '' : options.clerance + '/')

  if (secure) {
    if (env === 'production') return `${prod[conn]}/api/v1/${clerance}${options.service ? options.service + '/' : ''}${options.target}`
    return `${dev[conn]}/api/v1/${clerance}${options.service ? options.service + '/' : ''}${options.target}`
  } else {
    if (env === 'production') return `${prod[conn]}/${options.service ? options.service + '/' : ''}${options.target}`
    return `${dev[conn]}/${options.service ? options.service + '/' : ''}${options.target}`
  }
}

// export const geoencoding = (key, options) => {
//   return `https://maps.googleapis.com/maps/api/geocode/json?latlng=${options.lat},${options.lng}&key=${key}`
// }

export {
  client,
  header
}
