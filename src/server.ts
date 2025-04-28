import config from "./config";
import app from "./routes";



const main = async () => {
  app.listen(config.port, () => {
    console.log(`server is running on port ${config.port}`);
  });
};

main()
  .then(() => console.log("successfully connected"))
  .catch((err) => console.log(err));
