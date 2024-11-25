import { Request, Response, NextFunction } from 'express'
import { get } from 'lodash'
import {  verifyJwt } from '../utils/jwt.utils'
import { ReIssueAccessToken } from '../services/session.service'

const deserializeUser = async (req: Request, res: Response, next: NextFunction) => {
  const accessToken = get(req, 'headers.authorization', '').replace(/^Bearer\s/, '')
  const refreshToken = String(get(req, 'headers.x-refresh', ''))
  if (!accessToken) {
    console.log('the user is not authenticated yet');
    return next()
  }

  const { decoded, expired } = verifyJwt(accessToken)
  if (decoded) {
    res.locals.user = decoded
    return next()
  }

  if (refreshToken && expired) {
    try {
      const newAccessToken = await ReIssueAccessToken({ refreshToken })
      if (newAccessToken) {
        res.setHeader('x-access-token', newAccessToken) // Set new access token in the response header

        // Verify the new token
        const result = verifyJwt(newAccessToken)
        res.locals.user = result.decoded
      }
    } catch (error) {
      console.error('Failed to reissue access token:', error)
    }
  }

  return next()
}

export default deserializeUser
