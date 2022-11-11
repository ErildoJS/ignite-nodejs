import { Router } from 'express'
import { createEspecificationController } from '../modules/cars/useCases/createEspecification'

const especificationsRoutes = Router()

especificationsRoutes.post('/', (request, response) => {
  return createEspecificationController.handle(request, response)
})

export {especificationsRoutes}

//repositorios - responsaveis por manipular os dados, acessar o banco
//DTO - data transfer object - criar um objecto para transferir dados
//de uma camada para outra
