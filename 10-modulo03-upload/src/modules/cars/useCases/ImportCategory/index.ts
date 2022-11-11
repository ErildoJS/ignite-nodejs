import { CategoriesRepository } from "../../repositories/implementations/CategoriesRepository";
import { ImportCategoreUseCase } from "./ImportCategoreUseCase";
import { ImportCategoryController } from "./ImportCategoryController";

const categoriesRepository = CategoriesRepository.getInstance()
const importCategoryUseCase = new ImportCategoreUseCase(categoriesRepository)
const importCategoryController = new ImportCategoryController(importCategoryUseCase)

export {importCategoryController}