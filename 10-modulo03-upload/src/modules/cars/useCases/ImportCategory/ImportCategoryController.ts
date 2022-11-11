import { Request, Response } from "express";
import { ImportCategoreUseCase } from "./ImportCategoreUseCase";

class ImportCategoryController {
  constructor(private importCategoryUseCase: ImportCategoreUseCase) {}
  handle(request: Request, response: Response) {
    const {file} = request

    this.importCategoryUseCase.execute(file)
    return response.send()
  }
}

export {ImportCategoryController}