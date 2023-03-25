import { v2 as cloudinary } from "cloudinary";
import "dotenv/config";

cloudinary.config({
  cloud_name: process.env.ClOUDINARY_NAME,
  api_key: process.env.ClOUDINARY_KEY,
  api_secret: process.env.ClOUDINARY_SECRET,
  secure: true,
});

/////////////////////////
// Uploads an image file
/////////////////////////
export const uploadImage = async (
  imagePath: string,
  Option: "productImg" | "userImg"
) => {
  // Use the uploaded file's name as the asset's public ID and
  // allow overwriting the asset with new versions
  let Options;

  switch (Option) {
    case "productImg":
      Options = {
        use_filename: true,
        unique_filename: false,
        allowed_formats: ["jpg", "png"],
        folder: "profile pics",
        overwrite: true,
        transformation: [
          { radius: "max" },
          { effect: "outline:100", color: "lightblue" },
          { background: "lightblue" },
          { height: 300, crop: "scale" },
        ],
      };
      break;

    case "userImg":
      Options = {
        use_filename: true,
        unique_filename: false,
        allowed_formats: ["jpg", "png"],
        folder: "products pics",
        overwrite: true,
        transformation: [
          { radius: 60 },
          { width: 400, height: 250, gravity: "south", crop: "fill" },
        ],
      };
      break;
  }

  try {
    // Upload the image
    const result = await cloudinary.uploader.upload(imagePath, Options);
    console.log(result);
    return result.url;
  } catch (error) {
    console.error(error);
  }
};
