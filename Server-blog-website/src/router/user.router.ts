import { getAuthorsBysearch ,getAuthorByIdController} from '../controller/user.controller'
import { Router } from 'express'

export default (router: Router) => {
  router.post('/api/search-authors', getAuthorsBysearch);
  router.post('/api/author',getAuthorByIdController);
}
