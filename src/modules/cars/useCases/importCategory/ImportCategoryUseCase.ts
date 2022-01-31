import csvParse from "csv-parse";
import fs from "fs";
import { inject, injectable } from "tsyringe";

import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";

interface IImportCategory {
  name: string;
  description: string;
}

@injectable()
class ImportCategoryUseCase {
  constructor(
    @inject("CategoriesRepository")
    private categoriesRepository: ICategoriesRepository
  ) {}

  loadCategories(file: Express.Multer.File): IImportCategory[] {
    const stream = fs.createReadStream(file.path);
    const categories: IImportCategory[] = [];

    const parseFile = csvParse();

    stream.pipe(parseFile);

    parseFile.on("data", async (line) => {
      const [name, description] = line;
      this.categoriesRepository.create({ name, description });
    });

    return categories;
  }

  execute(file: Express.Multer.File): void {
    const categories = this.loadCategories(file);
    console.log(categories);
  }
}

export { ImportCategoryUseCase };
