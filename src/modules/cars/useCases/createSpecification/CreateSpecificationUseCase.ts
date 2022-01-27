import { Specification } from "../../model/Specification";
import { ISpecificationsRepository } from "../../repositories/ISpecificationsRepository";

interface IRequest {
  name: string;
  description: string;
}

class CreateSpecificationUseCase {
  // eslint-disable-next-line prettier/prettier
  constructor(private specificationsRepository: ISpecificationsRepository) { }

  execute({ name, description }: IRequest): void {
    const specificationAlreadyExist =
      this.specificationsRepository.findByName(name);

    if (specificationAlreadyExist) {
      throw new Error("Specification already exists!");
    }

    this.specificationsRepository.create({
      name,
      description,
    });
  }

  list(): Specification[] {
    const all = this.specificationsRepository.list();
    return all;
  }
}

export { CreateSpecificationUseCase };
