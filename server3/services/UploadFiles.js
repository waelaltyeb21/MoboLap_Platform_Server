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
      case "ProductImages":
        filePath = path.join(__dirname, "..", "uploads", "products");
        break;
      case "category":
        filePath = path.join(__dirname, "..", "uploads", "categories");
        break;
      case "blog":
        filePath = path.join(__dirname, "..", "uploads", "blogs");
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

const DeleteFile = (fileName, folderName) => {
  const filePath = path.join(__dirname, "..", "uploads", folderName, fileName);

  if (fs.existsSync(filePath)) {
    const deleteTheFile = fs.unlinkSync(filePath);
    return deleteTheFile;
  }
};

module.exports = { upload, ResizeTheImage, DeleteFile };
