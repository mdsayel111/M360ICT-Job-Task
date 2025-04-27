import config from "./config";
import client from "./DB";
import app from "./routes";

const main = async () => {
  await client.connect();
  app.listen(config.port, () => {
    console.log(`server is running on port ${config.port}`);
  });
};

main()
  .then(() => console.log("successfully connected"))
  .catch((err) => console.log(err));
