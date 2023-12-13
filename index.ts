import Server from "./src/server";
import sequelize from "./src/database/db";
import { RootDefs } from "./src/schemas/typeDef";
import { RootResolver } from "./src/resolvers/resolver";
import "./src/database/associations/associations";

(async function main() {
  try {
    await sequelize.sync({ force: false });
    console.log("Connection has been established successfully.");
    await Server(RootDefs, RootResolver);
  } catch (error: any) {
    console.log({ error: error.message });
  }
})();