import { JsonPostRepository } from "@/repositories/post/json-post-repository";
import { drizzleDb } from ".";
import { postsTable } from "./schemas";

// aqui foi feito a inserção dos posts na base de dados
(async () => {
  const jsonPostRepository = new JsonPostRepository();
  const posts = await jsonPostRepository.findAll();

  try {
    await drizzleDb.delete(postsTable);
    await drizzleDb.insert(postsTable).values(posts);
    // const porra = await drizzelDb.select().from(postsTable);
  } catch (error) {
    console.log(error);
  }
})();
