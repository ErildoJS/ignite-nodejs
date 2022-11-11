import { Router } from 'express'
import { CategoriesRepository } from '../modules/cars/repositories/CategoriesRepository'
import { CreateCategoryService } from '../modules/cars/services/CreateCategoryServices'

export const categoriesRoutes = Router()
const categoriesRepository = new CategoriesRepository()

categoriesRoutes.post('/', (request, response) => {
  const {name, description} = request.body

  const createCategoryService = new CreateCategoryService(categoriesRepository)

  createCategoryService.execute({name, description})

  return response.status(201).send()
})

categoriesRoutes.get('/', (request, response) => {

  const all = categoriesRepository.list()

  return response.json(all)
})

//repositorios - responsaveis por manipular os dados, acessar o banco
//DTO - data transfer object - criar um objecto para transferir dados
//de uma camada para outra
