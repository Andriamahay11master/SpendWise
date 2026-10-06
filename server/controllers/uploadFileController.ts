import { randomUUID } from "node:crypto";
import { extname } from "node:path";
import { fileURLToPath } from "node:url";
import multer from "multer";
import type { RequestHandler } from "express";

const assetsDirectory = fileURLToPath(
  new URL("../../src/assets/", import.meta.url),
);

const storage = multer.diskStorage({
  destination: assetsDirectory,
  filename: (_request, file, callback) => {
    callback(null, `${randomUUID()}${extname(file.originalname).toLowerCase()}`);
  },
});

export const uploadSelectedFile = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (_request, file, callback) => {
    callback(null, file.mimetype.startsWith("image/"));
  },
}).single("file");

export const uploadFile: RequestHandler = (request, response) => {
  if (!request.file) {
    response.status(400).json({ message: "Please upload an image file" });
    return;
  }

  response.status(201).json({ filename: request.file.filename });
};