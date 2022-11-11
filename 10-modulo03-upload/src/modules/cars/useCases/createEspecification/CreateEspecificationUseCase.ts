import { IEspecificationsRepository } from "../../repositories/IEspecificationsRepository";

type IRequest = {
  name: string;
  description: string;
}

class CreateEspecificationUseCase {
  constructor(private especificationsRepository: IEspecificationsRepository) {}

  execute({name, description}: IRequest): void {
    const especificationAlreadyExists = this.especificationsRepository.findByName(name)

    if (especificationAlreadyExists) {
      throw new Error('Especification Already Exists!')
    }
    this.especificationsRepository.create({
      name,
      description
    })
  }
}

export {CreateEspecificationUseCase}
