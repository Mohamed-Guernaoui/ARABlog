import { Request, Response, NextFunction } from 'express'

const requireUser = (req: Request, res: Response, next: NextFunction): void => {
  const user = res.locals.user

  console.log('🚀 ~ action requireUser ', user)

  if (!user) {
    res.sendStatus(403)
    return
  }

  return next()
}

export default requireUser
