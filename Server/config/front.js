import dotenv from "dotenv";
dotenv.config();
import front from "@api/front";

if (!process.env.FRONT_API_TOKEN) {
  console.error('FRONT_API_TOKEN is not set. Please add it to your .env file.');
}
front.auth(process.env.FRONT_API_TOKEN);

export default front;