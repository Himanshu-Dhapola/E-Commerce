import { connectDB } from "./db/index.js";
import { app } from "./app.js";
import dotenv from "dotenv";
import serverless from "serverless-http";


connectDB()
  .then(() => {
    app.listen(process.env.PORT || 3000, () => {
      
      console.log(`Server is running at Port : ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log(`DB Connection Failed!! ${error}`);
  });

const handler = serverless(app);
export default handler;
