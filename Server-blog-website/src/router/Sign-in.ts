import { Router } from 'express'
import { DeleteSessionHandeler, createSessionHandler, getUserSessionHandeler } from '../controller/session.controller'
import { CreateUserZodShema } from '../Schema/user.schema'
import { createUserHandler } from '../controller/user.controller'
import { CreatesessionSchema } from '../Schema/session.Schema'
import { FindPostHandler } from '../controller/Post.Controller'
import { GetPostSchema } from '../Schema/Post.schema'
import { CreateblogSchema } from '../Schema/Blog.schema'
import { createBlogHandler } from '../controller/Blog.controller'
import Validate from '../Middlewares/validateRessources'
import requireUser from '../Middlewares/requireUser'
// NOTE: all requests should hace requieUser Middelware
export default (router: Router) => {
  router.post('/api/sign-up', Validate(CreateUserZodShema), createUserHandler)
  router.post('/api/sign-in', Validate(CreatesessionSchema), createSessionHandler)
  router.get('/api/session', requireUser, getUserSessionHandeler)
  router.delete('/api/session', requireUser, DeleteSessionHandeler)
  router.get('/api/posts/:postid', Validate(GetPostSchema), FindPostHandler)
  router.post('/api/newBlog', [requireUser, Validate(CreateblogSchema)], createBlogHandler)
}
