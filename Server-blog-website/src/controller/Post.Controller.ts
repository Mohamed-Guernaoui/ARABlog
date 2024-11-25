import express, { Request, Response } from 'express'
import { CreatePost, DeletePost, FindPost, FindandUpdatePost } from '../services/Post.service'
import { CreatePostInput, DeletePostInput, GetPostInput, UpdatePostInput } from '../Schema/Post.schema'

export async function CreatePostHandler(req: Request<{}, {}, CreatePostInput['body']>, res: Response) {
  try {
    const user_id = res.locals.user._id
    const body = req.body
    const Post = await CreatePost({ ...body, user: user_id }) // TODO Create Service Post

    return res.status(200).send(Post)
  } catch (error) {
    return res.status(409).send(error.message)
  }
}

//BUG: bug here ⬇

export async function FindPostHandler(req: Request<GetPostInput['params']>, res: Response): Promise<void> {
  try {
    const postid = req.params.postid

    console.log(postid)

    const post = await FindPost({ postid })

    if (!post) {
      res.sendStatus(404)
      return
    }

    res.send(post)
  } catch (error) {
    res.status(409).send(error.message)
  }
}

// export async function findandUpdatePostHandler(req:Request<UpdatePostInput["params"]>,res:Response) {
//           try{
//                     const user_id = res.locals.user._id;

//                     const Post_id = req.params.postid;

//                     const update = req.body

//                     const post = await FindPost({Post_id})

//                     if(!post){
//                               return res.status(404);
//                     }
//                     if(String(post.user) !== user_id){
//                               return res.send(403)
//                     }
//                    const updatpost =  await FindandUpdatePost({Post_id},update,{new:true})
//                    return res.send(updatpost)

//           }catch (error){
//                     return res.status(409).send(error.message)
//           }
// }

// export async function DeletPostHandler(req:Request<DeletePostInput["params"]>,res:Response) {
//           try{
//                     const user_id = res.locals.user._id;

//                     const Post_id = req.params.postid;

//                     const post = await FindPost({Post_id})

//                     if(!post){
//                               return res.status(404);
//                     }
//                     if(post.user !== user_id){
//                               return res.send(403)
//                     }
//                    await DeletePost({Post_id})
//                    return res.send(200)

//           }catch (error){
//                     return res.status(409).send(error.message)
//           }
// }
