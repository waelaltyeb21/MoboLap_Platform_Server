const multer = require("multer");
const fs = require("fs");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log("File: ", file);
    if (file.mimetype.startsWith("image/")) {
      if (file.fieldname === "product") {
        const filePath = path.join(
          __dirname,
          "..",
          "uploads",
          "images",
          "products"
        );

        if (!fs.existsSync(filePath)) {
          const created = fs.mkdirSync(filePath, { recursive: true });
          console.log("Directory Created: ", created, " Path: ", filePath);
          cb(null, filePath);
        }
      }
    } else if (file.mimetype === "application/pdf") {
      cb(null, "uploads/documents");
    } else {
      cb(null, false);
    }
  },
  filename: (req, file, cb) => {
    const fileName = `${file.originalname}`;
    cb(null, fileName);
  },
});

// 5242880 => 5 MB
const FILE_LIMIT = process.env.FILE_LIMIT_TO_UPLOAD || 1024 * 1024 * 5;
console.log("File Limit: ", FILE_LIMIT);

const upload = multer({
  storage: storage,
  limits: {
    fileSize: FILE_LIMIT,
  },
});

module.exports = upload;

// else if (file.fieldname === "laptop") {
//         cb(null, "uploads/images/laptops");
//       } else if (file.fieldname === "accessories") {
//         cb(null, "uploads/images/accessories");
//       } else {
//         cb(null, "uploads/images");
//       }
