import express from "express";
import { v4 as uuid } from "uuid";

import File from "../models/File.js";
import Share from "../models/Share.js";

import { authMiddleware } from "../middleware/auth.middleware.js";
import { upload } from "../middleware/upload.middleware.js";
import { validate } from "../middleware/validate.middleware.js";
import { canAccessFile } from "../middleware/accessControl.middleware.js";

import {
  uploadFilesSchema,
  shareWithUserSchema,
  shareViaLinkSchema,
  fileIdParamSchema,
} from "../validators/file.validators.js";

import { uploadToS3, getSignedDownloadUrl } from "../utils/s3.js";

const router = express.Router();

router.post(
  "/upload",
  authMiddleware,
  upload.array("files", 5),
  validate(uploadFilesSchema),
  async (req, res) => {
    try {
      if (!req.files?.length) {
        return res.status(400).json({ message: "No files uploaded" });
      }

      const savedFiles = [];

      for (const file of req.files) {
        const storageKey = `uploads/${uuid()}-${file.originalname}`;

        await uploadToS3({
          key: storageKey,
          buffer: file.buffer,
          contentType: file.mimetype,
        });

        const dbFile = await File.create({
          ownerId: req.user.id,
          filename: file.originalname,
          mimeType: file.mimetype,
          size: file.size,
          storageKey,
        });

        savedFiles.push(dbFile);
      }

      res.status(201).json({
        message: "Files uploaded successfully",
        files: savedFiles,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Upload failed" });
    }
  }
);
const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

router.get(
  "/",
  authMiddleware,
  asyncHandler(async (req, res) => {
    const files = await File.find({ ownerId: req.user.id }).select(
      "filename mimeType size createdAt"
    );

    res.json(files);
  })
);

router.get(
  "/:fileId/download",
  authMiddleware,
  validate(fileIdParamSchema),
  canAccessFile,
  async (req, res) => {
    const file = req.file;

    const downloadUrl = await getSignedDownloadUrl(file.storageKey);

    res.json({ downloadUrl });
  }
);

router.post(
  "/:fileId/share-user",
  authMiddleware,
  validate(shareWithUserSchema),
  async (req, res) => {
    const { userIds, expiresAt } = req.body;
    const { fileId } = req.params;

    const file = await File.findById(fileId);

    if (!file || file.ownerId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const shares = await Promise.all(
      userIds.map((userId) =>
        Share.create({
          fileId,
          sharedBy: req.user.id,
          sharedWith: userId,
          expiresAt,
        })
      )
    );

    res.status(201).json({
      message: "File shared with users",
      shares,
    });
  }
);

router.post(
  "/:fileId/share-link",
  authMiddleware,
  validate(shareViaLinkSchema),
  async (req, res) => {
    const { expiresAt } = req.body;
    const { fileId } = req.params;

    const file = await File.findById(fileId);

    if (!file || file.ownerId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const token = uuid();

    await Share.create({
      fileId,
      sharedBy: req.user.id,
      shareToken: token,
      expiresAt,
    });

    res.json({
      shareUrl: `${process.env.FRONTEND_URL}/share/${token}`,
    });
  }
);

router.get("/shared-with-me", authMiddleware, async (req, res) => {
  const shares = await Share.find({
    sharedWith: req.user.id,
    $or: [{ expiresAt: null }, { expiresAt: { $gt: new Date() } }],
  }).populate("fileId", "filename mimeType size createdAt");

  res.json(shares.map((s) => s.fileId));
});

export default router;
