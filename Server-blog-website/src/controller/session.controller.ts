import { Request, Response } from 'express'
import { ValidatePassword } from '../services/user.service'
import { UpdateSession, createSession, findSessions } from '../services/session.service'

import { SignJwt } from '../utils/jwt.utils'
import config from 'config'

export async function createSessionHandler(req: Request, res: Response): Promise<void> {
  // Todo: Validate user's password

  const user = await ValidatePassword(req.body)
  if (!user) {
    res.status(401).send('invalid Email or password')
    return
  }
  console.log('this should be the logged')

  // Todo: Create Session

  const session = await createSession(user._id, req.get('user-agent') || '')

  //TODO: Create Access Token

  const AccessToken = SignJwt(
    { ...user, session: session._id },
    { expiresIn: config.get<string>('accessTokenTtl') }, //15min
  )

  //TODO: Create Refresh Token

  const RefreshToken = SignJwt(
    { ...user, session: session._id },
    { expiresIn: config.get<string>('refreshTokenttl') }, //15min
  )

  // Todo: Return access and refresh token

  res.send({ AccessToken, RefreshToken })
}

export async function getUserSessionHandeler(req: Request, res: Response): Promise<void> {
  const userId = res.locals.user._id
  const sessions = await findSessions({ user: userId, valid: true })
  res.send(sessions)
}

export async function DeleteSessionHandeler(req: Request, res: Response): Promise<void> {
  const sessionId = res.locals.user.session
  await UpdateSession({ _id: sessionId }, { valid: false })
  res.send({
    accessToken: null,
    refreshToken: null,
  })
}
