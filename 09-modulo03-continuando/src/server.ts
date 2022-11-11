import express from 'express'
import { categoriesRoutes } from './routes/categories.routes'
import { especificationsRoutes } from './routes/especifications.routes'

const app = express()
app.use(express.json())

app.use("/categories", categoriesRoutes)
app.use("/especifications", especificationsRoutes)

app.listen(3333, () => {
  console.log('running....');

})
