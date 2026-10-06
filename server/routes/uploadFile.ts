import { Router } from "express";
import {
  uploadFile,
  uploadSelectedFile,
} from "../controllers/uploadFileController";

const uploadRouter = Router();

uploadRouter.post("/api/upload", uploadSelectedFile, uploadFile);
export default uploadRouter;
