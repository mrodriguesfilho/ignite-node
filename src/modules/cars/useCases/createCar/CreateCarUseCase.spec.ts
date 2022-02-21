import { AppError } from "../../../../shared/errors/AppError";
import { CarsRepositoryInMemory } from "../../repositories/in-memory/CarRepositoryInMemory";
import { CreateCarUseCase } from "./CreateCarUseCase";

let createCarUseCase: CreateCarUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("Create Car", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
  });

  it("should be able to create a new car", async () => {
    await createCarUseCase.execute({
      name: "Name",
      description: "Description",
      daily_rate: 100,
      license_plate: "License_Plate",
      fine_amount: 60,
      brand: "brand",
      category_id: "category id",
    });
  });

  it("should not be able to create a car with a license plate that was already registered", async () => {
    expect(async () => {
      await createCarUseCase.execute({
        name: "Name",
        description: "Description",
        daily_rate: 100,
        license_plate: "License_Plate",
        fine_amount: 60,
        brand: "brand",
        category_id: "category id",
      });

      await createCarUseCase.execute({
        name: "Name",
        description: "Description",
        daily_rate: 100,
        license_plate: "License_Plate",
        fine_amount: 60,
        brand: "brand",
        category_id: "category id",
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should be able to create a car with attribute avaliabity true", async () => {
    const car = await createCarUseCase.execute({
      name: "Name",
      description: "Description",
      daily_rate: 100,
      license_plate: "License_Plate",
      fine_amount: 60,
      brand: "brand",
      category_id: "category id",
    });

    expect(car.avaliable).toBe(true);
  });
});
