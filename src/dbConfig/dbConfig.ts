import mongoose from "mongoose";

export async function connect() {
  try {
    mongoose.connect(process.env.MONGODB_URI!);
    const connection = mongoose.connection;

    connection.on("connected", () => {
      /// On is Equivalent to listening on port
      console.log("MONGODB connnected succesfully");
    });

    connection.on("error", (err) => {
      console.log("MongoDB connection error." + err);
    });
  } catch (error) {
    console.log("MONGO DB Connection Error");
    console.log(error);
  }
}
