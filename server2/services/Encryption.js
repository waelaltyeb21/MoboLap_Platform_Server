const bcrypt = require("bcrypt");
const crypto = require("crypto");

const algorithm = "aes-256-cbc";
const password = process.env.ENCRYPTION_KEY;
const key = crypto.createHash("sha256").update(password).digest();
const ivLength = 16;

const Encrypt = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  return hash;
};

const Compare = async (password, hash) => {
  const result = await bcrypt.compare(password, hash);
  return result;
};

const EncryptedEmail = async (data) => {
  const iv = crypto.randomBytes(ivLength);

  const cipher = crypto.createCipheriv(algorithm, key, iv);
  let encrypted = cipher.update(data, "utf-8", "hex");
  encrypted += cipher.final("hex");

  return {
    encryptedData: encrypted,
    iv: iv.toString("hex"),
  };
};

const DecryptedEmail = async (data, ivHex) => {
  const iv = Buffer.from(ivHex, "hex");

  const decipher = crypto.createDecipheriv(algorithm, key, iv);
  let decrypted = decipher.update(data, "hex", "utf-8");
  decrypted += decipher.final("utf-8");

  return decrypted;
};
module.exports = { Encrypt, Compare, EncryptedEmail, DecryptedEmail };
