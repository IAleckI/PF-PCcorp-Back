import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { DocumentNode } from "graphql";
import fileUpload from "express-fileupload";
import uploadRouter from "./route/upload";
import cors from "cors";
import morgan from "morgan";

const PORT = process.env.PORT || 4000;

async function Server (typeDefs: DocumentNode[], resolvers: any) {
  const corsOptions = {
    origin: ['https://p-final-p-ccorp-front.vercel.app', 'http://localhost:5173'],
    
  };
  const apolloServer = new ApolloServer({ typeDefs, resolvers });
  const server = express();
  
  await apolloServer.start();

  server.use("/graphql",
    cors(corsOptions),
    express.json(),
    expressMiddleware(apolloServer)
  );
 server.use("/files",
    fileUpload({
      useTempFiles: true,
      tempFileDir: "./uploads"
    }),
    cors(corsOptions),
    morgan("dev"),
    uploadRouter
  );

 

  server.listen(PORT, () => console.log(`Server ready at: http://localhost:${PORT}/graphql`));
}

export default Server;
