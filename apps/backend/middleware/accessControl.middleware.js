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

  const userShare = await Share.findOne({
    fileId,
    sharedWith: userId,
    $or: [{ expiresAt: null }, { expiresAt: { $gt: new Date() } }],
  });

  if (userShare) {
    req.file = file;
    return next();
  }

  if (token) {
    const linkShare = await Share.findOne({
      fileId,
      shareToken: token,
      $or: [{ expiresAt: null }, { expiresAt: { $gt: new Date() } }],
    });

    if (linkShare) {
      req.file = file;
      return next();
    }
  }

  return res.status(403).json({ message: "Access denied" });
};
