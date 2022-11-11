import express from 'express'
import { routes } from './routes'
import SwaggerUi from 'swagger-ui-express'
import SwaggerFile from './swagger.json'

const app = express()

app.use(express.json())
app.use("/doc", SwaggerUi.serve, SwaggerUi.setup(SwaggerFile))
app.use(routes)

app.listen(3333, () => {
  console.log('running....');

})
