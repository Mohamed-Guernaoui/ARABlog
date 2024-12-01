import { CreateUser, getAuthors,getAuthorById } from '../services/user.service'
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
export async function getAuthorsBysearch(req: Request, res: Response): Promise<void> {
  try {
    const { query } = req.body
    const user = await getAuthors(query)
     res.status(200).send(user)
  } catch (error) {
     res.status(409).send(error.message)
  }
}

export async function getAuthorByIdController(req: Request, res: Response): Promise<void> {
  try {
    const { id } = req.body;
    const user = await getAuthorById(id);
    console.log(`new usr profile ${user}`)
    res.status(200).send(user)
  } catch (error) {
    res.status(409).send(error.message)
  }
}