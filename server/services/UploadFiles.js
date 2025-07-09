const multer = require("multer");
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const storage = multer.memoryStorage();

// 5242880 => 5 MB
const FILE_LIMIT = process.env.FILE_LIMIT_TO_UPLOAD || 1024 * 1024 * 5;

const upload = multer({
  storage: storage,
  limits: {
    fileSize: FILE_LIMIT,
  },
});

const ResizeTheImage = async (file) => {
  const originalName = path.parse(file.originalname).name;
  const FileName = `${originalName}.webp`;
  let filePath = "";

  if (file.mimetype.startsWith("image/")) {
    switch (file.fieldname) {
      case "product":
        filePath = path.join(__dirname, "..", "uploads", "images", "products");
        break;
      case "supplier":
        filePath = path.join(__dirname, "..", "uploads", "images", "suppliers");
        break;
      default:
        filePath = path.join(__dirname, "..", "uploads", "images");
    }
  }

  if (!fs.existsSync(filePath)) {
    fs.mkdirSync(filePath, { recursive: true });
  }

  await sharp(file.buffer)
    .toFormat("webp")
    .webp({ quality: 90 })
    .toFile(path.join(filePath, FileName));

  return { FileName };
};

const DeleteFile = async (fileName) => {
  const filePath = path.join(__dirname, "..", "uploads", "images", "products");
  if (fs.existsSync(filePath)) {
    const deleteTheFile = fs.unlinkSync(path.join(filePath, fileName));
    console.log("deleteTheFile: ", deleteTheFile);
    return deleteTheFile;
  }
};

module.exports = { upload, ResizeTheImage, DeleteFile };
