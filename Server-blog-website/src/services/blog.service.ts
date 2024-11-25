import { BLogInput, BlogDocument } from './../Models/Blog.model'
import { Blogmodel } from '../Models/Blog.model'
import mongoose from 'mongoose'
export async function createNewBlog(inputs: BLogInput) {
  try {
    return await Blogmodel.create(inputs)
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      throw new Error('ValidatorError' + error.message)
    } else {
      throw new Error('Unxpected Error' + error.message)
    }
  }
}

export async function GetLatestblogs(page: number) {
  try {
    const maxLimit = 5
    const blogs = await Blogmodel.find({ draft: false })
      .populate('author', 'name profile')
      .sort({ createdAt: -1 })
      .select('blog_id tags createdAt description title activity banner -_id ')
      .skip((page - 1) * maxLimit)
      .limit(maxLimit)

    return blogs
  } catch (error) {
    throw new Error('Unxpected Error' + error.message)
  }
}

export async function TrendyBlogs() {
  try {
    const Trends = await Blogmodel.find({ draft: false })
      .populate('author', 'name profile')
      .sort({ 'activity.total_reads': -1, 'activity.total_likes': -1, createdAt: -1 })
      .select('blog_id createdAt title -_id ')
      .limit(5)

    console.log('Trends', Trends)

    return Trends
  } catch (error) {
    throw new Error('Unxpected Error' + error.message)
  }
}
export async function SearchBlogService(Tag: string, page: number) {
  try {
    let findQuey = { tags: Tag, draft: false }
    const limit = 2 //limit

    const SearchingBlogs = await Blogmodel.find(findQuey)
      .populate('author', 'name')
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .select('blog_id tags createdAt description title activity banner -_id ')
      .limit(limit)
    return SearchingBlogs
  } catch (error) {
    throw new Error('Unxpected Error' + error.message)
  }
}
export async function getDocsCount() {
  try {
    const CountDocs = await Blogmodel.countDocuments({ draft: false })
    return CountDocs
  } catch (error) {
    throw new Error('Unxpected Error' + error.message)
  }
}
export async function getSearchCount(Tag: string) {
  try {
    let findQuey = { tags: Tag, draft: false }
    const CountDocs = await Blogmodel.countDocuments(findQuey)
    return CountDocs
  } catch (error) {
    throw new Error('Unxpected Error' + error.message)
  }
}
export async function SearchQueryService(query: string, page: number) {
  try {
    let findQuey = { title: new RegExp(query, 'i'), draft: false }
    const limit = 2 //limit

    const SearchingBlogs = await Blogmodel.find(findQuey)
      .populate('author', 'name')
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .select('blog_id tags createdAt description title activity banner -_id ')
      .limit(limit)
    return SearchingBlogs
  } catch (error) {
    throw new Error('Unxpected Error' + error.message)
  }
}
