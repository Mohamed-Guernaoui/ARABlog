import mongoose, { FilterQuery } from 'mongoose'
import { UserDoc, UserInput, UserModal } from '../Models/user.modal'
import { omit } from 'lodash'
import log from '../utils/logger'

export async function CreateUser(input: UserInput) {
  try {
    return await UserModal.create(input)
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      throw new Error('validation Error' + error.message)
    } else {
      throw new Error('Unexpected error: ' + error.message)
    }
  }
}

export async function ValidatePassword({ email, password }: { email: String; password: String }) {
  const user = await UserModal.findOne({ email })

  if (!user) return false

  const IsValid = await user.comparePassword(password)
  console.log(IsValid)

  if (!IsValid) return false

  return omit(user.toJSON(), 'password')
}

export async function findUser(query: FilterQuery<UserDoc>) {
  return UserModal.findOne(query).lean()
}
export async function getAuthors(query: string) {
  return UserModal.find({ name: new RegExp(query, 'i') })
    .limit(50)
    .select('name -_id profile')
}

export async function getAuthorById(query: string) {
  console.log("qury Debug",query);
  return UserModal.findOne({ name: query })
    .select('name -_id profile')
    .lean()
}