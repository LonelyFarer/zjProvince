
const DEVHOSTURL = '/api' // 奎
const PROHOSTURL = '/nypt/' // build
export default {
  baseUrl: process.env.NODE_ENV === 'development' ? DEVHOSTURL : PROHOSTURL,
  // baseUrl: baseUrl,
  // version: VERSION,
  secret: 'zzsoftBase',
  token_key: 'token'
}
