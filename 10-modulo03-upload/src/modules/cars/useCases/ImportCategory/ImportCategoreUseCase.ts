import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";
import fs from 'fs'
import csvParse from 'csv-parse'

interface IImportCategory {
  name: string,
  description: string
}

class ImportCategoreUseCase {
  constructor(private categoriesRepository: ICategoriesRepository) {}

  loadCategories(file: Express.Multer.File): Promise<IImportCategory[]> {
    return new Promise((resolve, reject) => {
      const stream = fs.createReadStream(file.path)

    const categories: IImportCategory[] = []

    const parseFile = csvParse()

    stream.pipe(parseFile)

    parseFile.on('data', async (line) => {
      const [name, description] = line

      categories.push({
        name, description
      })
    }).on('end', () => {
      resolve(categories)
    }).on('error', (err) => {
      reject(err)
    })
  })
  }

  async execute(file: Express.Multer.File): Promise<void> {
    const categories = await this.loadCategories(file)

    categories.map(async (category) => {
      const {name, description} = category

      const categoriesExists = this.categoriesRepository.findByName(name)

      if (!categoriesExists) {
        this.categoriesRepository.create({name, description})
      }
    })
  }
}

export {ImportCategoreUseCase}