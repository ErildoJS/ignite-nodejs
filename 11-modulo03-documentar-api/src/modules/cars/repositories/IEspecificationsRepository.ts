import { Especification } from "../models/Especification";

interface CreateEspecificationDTO {
  name: string;
  description: string;
}

interface IEspecificationsRepository {
  create({name, description}: CreateEspecificationDTO): void
  findByName(name: string): Especification
}

export {CreateEspecificationDTO, IEspecificationsRepository}
