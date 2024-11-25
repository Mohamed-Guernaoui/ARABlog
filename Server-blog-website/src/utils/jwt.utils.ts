import jwt from 'jsonwebtoken'
// import * as crypto from "crypto";
import config from 'config'
const publicKey = config.get<string>('publicKey')
const privateKey = config.get<string>('privateKey')

/**
 * Signs a given object with a JSON Web Token, using the RS256 algorithm
 * @param object The object to be signed
 * @param options Optional options for the signing
 * @returns A signed token
 */
export function SignJwt(object: Object, options?: jwt.SignOptions | undefined) {
  return jwt.sign(object, privateKey, {
    ...(options && options),
    algorithm: 'RS256',
  })
}
// Verify the token with the same algorithm
export function verifyJwt(token: string) {
  try {
    console.log(`🚀 ~ file: jwt.utils.ts:32 ~ verifyJwt ~ verificating`)
    const decoded = jwt.verify(token, publicKey, { algorithms: ['RS256'] })
    return {
      valid: true,
      expired: false,
      decoded,
    }

  } catch (e) {
    return {
      valid: false,
      expired: e.message === 'jwt expired',
      decoded: null,
    }
  }
}
