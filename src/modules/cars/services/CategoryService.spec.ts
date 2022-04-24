import { CategoriesRepository } from "@modules/cars/infra/typeorm/repositories/CategoriesRepository";
import { AppError } from "@shared/errors/AppError";

import { CategoryService } from "./CategoryService";

let categoryService: CategoryService;
let categoriesRepository: CategoriesRepository;

describe("Create Category", () => {
  beforeEach(() => {
    categoriesRepository = new CategoriesRepository();
    categoryService = new CategoryService(categoriesRepository);
  });

  it("Shoul be able to create a new category", async () => {
    const category = {
      name: "Category test",
      description: "Category test description",
    };

    await categoryService.create(category);

    const categoryCreated = await categoriesRepository.findByName(
      category.name
    );

    expect(categoryCreated).toHaveProperty("id");
  });

  it("Shoul NOT be able to create a new category", async () => {
    expect(async () => {
      const category = {
        name: "Category test",
        description: "Category test description",
      };

      await categoryService.create(category);
    }).rejects.toBeInstanceOf(AppError);
  });
});
