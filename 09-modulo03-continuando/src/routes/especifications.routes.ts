import { Router } from 'express'
import { CategoriesRepository } from '../modules/cars/repositories/CategoriesRepository'
import { EspecificationsRepository } from '../modules/cars/repositories/EspecificationsRepository'
import { CreateCategoryService } from '../modules/cars/services/CreateCategoryServices'
import { CreateEspecificationService } from '../modules/cars/services/CreateEspecificationService'

export const especificationsRoutes = Router()
const especificationsRepository = new EspecificationsRepository()

especificationsRoutes.post('/', (request, response) => {
  const {name, description} = request.body

  const createEspecificationService = new CreateEspecificationService(especificationsRepository)

  createEspecificationService.execute({name, description})

  return response.status(201).send()
})


//repositorios - responsaveis por manipular os dados, acessar o banco
//DTO - data transfer object - criar um objecto para transferir dados
//de uma camada para outra
