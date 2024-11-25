import { createbloginput } from '../Schema/Blog.schema'

import {
  GetLatestblogs,
  createNewBlog,
  TrendyBlogs,
  SearchBlogService,
  getDocsCount,
  getSearchCount,
  SearchQueryService,
} from '../services/blog.service'

import { Request, Response } from 'express'

export async function createBlogHandler(req: Request<{}, {}, createbloginput['body']>, res: Response): Promise<void> {
  const user_id = res.locals.user._id
  console.log('🚀 ~ file: Blog.controller.ts:CreateBlogHandler ~ body', user_id)
  try {
    const user_id = res.locals.user._id
    const body = req.body
    const Blog = await createNewBlog({ ...body, author: user_id })
    res.status(200).json({ Blog })
  } catch (error) {
    res.status(409).send(error.message)
  }
}

export async function GetltestBloghandler(req: Request, res: Response) {
  try {
    const { page } = req.body
    const blogs = await GetLatestblogs(page)
    const BlogWithAuthor = blogs.filter((blog) => blog.author)
    return res.status(200).send(BlogWithAuthor)
  } catch (error) {
    return res.status(409).send(error.message)
  }
}

export async function GetTrendyBlogs(req: Request, res: Response) {
  try {
    const blogs = await TrendyBlogs()
    const BlogWithAuthor = blogs.filter((blog) => blog.author)

    return res.status(200).send(BlogWithAuthor)
  } catch (error) {
    return res.status(409).send(error.message)
  }
}
export async function SearchBlogController(req: Request, res: Response) {
  const { tag, page } = req.body
  try {
    const Foundedblogs = await SearchBlogService(tag, page)
    console.log(Foundedblogs)

    return res.status(200).send(Foundedblogs)
  } catch (error) {
    return res.status(409).send(error.message)
  }
}
export async function getTotalDocs(req: Request, res: Response) {
  try {
    const totalDocs = await getDocsCount().then((count) => {
      console.log(count)

      return res.status(200).json({ totalDocs: count })
    })
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

export async function getSearchTotalDocs(req: Request, res: Response) {
  try {
    const { tag } = req.body
    console.log(tag)
    const totalDocs = await getSearchCount(tag).then((count) => {
      console.log(count)

      return res.status(200).json({ totalDocs: count })
    })
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}
export async function SearchBlogByQueryController(req: Request, res: Response) {
  const { query, page } = req.body
  try {
    const Foundedblogs = await SearchQueryService(query, page)
    console.log(Foundedblogs)

    return res.status(200).send(Foundedblogs)
  } catch (error) {
    return res.status(409).send(error.message)
  }
}
