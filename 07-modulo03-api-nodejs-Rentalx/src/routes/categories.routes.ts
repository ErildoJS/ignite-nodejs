import { Router } from 'express'
import { CategoriesRepository } from '../repositories/CategoriesRepository'

export const categoriesRoutes = Router()
const categoriesRepository = new CategoriesRepository()

categoriesRoutes.post('/', (request, response) => {
  const {name, description} = request.body

  const categoryAlreadyExists = categoriesRepository.findByName(name)

  if (categoryAlreadyExists) {
    return response.status(400).json({error: 'Category Already Exists'})
  }

  categoriesRepository.create({name, description})

  return response.status(201).send()
})

categoriesRoutes.get('/', (request, response) => {

  const all = categoriesRepository.list()

  return response.json(all)
})

//repositorios - responsaveis por manipular os dados, acessar o banco
//DTO - data transfer object - criar um objecto para transferir dados
//de uma camada para outra
