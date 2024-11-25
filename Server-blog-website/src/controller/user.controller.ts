import { CreateUser, getAuthors } from '../services/user.service'
import { CreateZod_UserInput } from './../Schema/user.schema'
import { Request, Response } from 'express'
import { omit } from 'lodash'

export async function createUserHandler(
  req: Request<{}, {}, CreateZod_UserInput['body']>,
  res: Response,
): Promise<void> {
  try {
    const user = await CreateUser(req.body)
    res.status(200).send(omit(user.toJSON(), 'password'))
  } catch (error) {
    res.status(409).send(error.message)
  }
}
export async function getAuthorsBysearch(req: Request, res: Response) {
  try {
    const { query } = req.body
    const user = await getAuthors(query)
    return res.status(200).send(user)
  } catch (error) {
    return res.status(409).send(error.message)
  }
}
