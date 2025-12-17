import File from "../models/File.js";
import Share from "../models/Share.js";

export const canAccessFile = async (req, res, next) => {
  const { fileId } = req.params;
  const userId = req.user.id;
  const token = req.query.token;

  const file = await File.findById(fileId);
  if (!file) {
    return res.status(404).json({ message: "File not found" });
  }

  if (file.ownerId.toString() === userId) {
    req.file = file;
    return next();
  }

  const share = await Share.findOne({
    fileId,
    $or: [
      { sharedWith: userId },
      { shareToken: token }
    ]
  });

  if (!share) {
    return res.status(403).json({ message: "Access denied" });
  }

  if (share.expiresAt && share.expiresAt < new Date()) {
    return res.status(403).json({ message: "Share expired" });
  }

  req.file = file;
  next();
};
ß