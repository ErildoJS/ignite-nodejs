import { Especification } from "../../models/Especification";
import { CreateEspecificationDTO, IEspecificationsRepository } from "../IEspecificationsRepository";

class EspecificationsRepository implements IEspecificationsRepository {
  private especifications: Especification[]

  constructor() {
    this.especifications = []
  }
  create({ name, description }: CreateEspecificationDTO): void {
    const especification = new Especification()

    Object.assign(especification, {
      name,
      description
    })

    this.especifications.push(especification)
  }

  findByName(name: string): Especification {
    const especification = this.especifications.find(especification => especification.name === name)

    return especification
  }
}

export {EspecificationsRepository}
