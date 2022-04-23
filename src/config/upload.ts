import crypto from "crypto";
import Multer from "multer";
import { resolve } from "path";

export default {
  upload(destFolder: string) {
    return {
      storage: Multer.diskStorage({
        destination: resolve(__dirname, "..", "..", destFolder),
        filename: (request, file, callback) => {
          const fileHash = crypto.randomBytes(16).toString("hex");
          const fileName = `${fileHash}-${file.originalname}`;

          return callback(null, fileName);
        },
      }),
    };
  },
};
