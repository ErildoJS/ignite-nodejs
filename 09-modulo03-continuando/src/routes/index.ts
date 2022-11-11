import { Router } from 'express'
import { categoriesRoutes } from '../routes/categories.routes'
import { especificationsRoutes } from '../routes/especifications.routes'

const routes = Router()

routes.use("/categories", categoriesRoutes)
routes.use("/especifications", especificationsRoutes)

export {routes}