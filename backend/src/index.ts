import app from "./app.js";
import connect from "./db/connection.js";

connect()
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(5000, () => {
      console.log("Server is running on port 5000");
    });
  })
  .catch((error) => {
    console.error("Failed to connect to MongoDB", error);
  });
