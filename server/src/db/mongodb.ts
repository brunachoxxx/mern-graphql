import { connect } from "mongoose";
import "dotenv/config";

export const dbConnect = async () => {
  try {
    const MONGODB_URI = <string>process.env.MONGODB_URI;
    const start = await connect(MONGODB_URI);
    console.log(`connected to database ${start.connection.name}`);
  } catch (error: any) {
    console.log("Error: " + error.message);
    process.exit(1);
  }
};
