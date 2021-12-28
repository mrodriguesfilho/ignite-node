import { CategoriesRepository } from "../../repositories/CategoriesRepository";
import { CraeteCategoryController } from "./CreateCategoryController";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

const categoriesRepository = new CategoriesRepository();
const createCategoryUseCase = new CreateCategoryUseCase(categoriesRepository);
const createCategoryController = new CraeteCategoryController(
  createCategoryUseCase
);

export { createCategoryController };
