
import client from "./DB";

const main = async () => {
  await client.connect();
};

main()
  .then(() => console.log("successfully connected"))
//   .catch((err) => console.log(err));
