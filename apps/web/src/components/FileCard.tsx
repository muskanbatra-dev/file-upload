import axios from "axios";
import { FileItem } from "../types/file";
import "./FileCard.css";
import ShareModal from "./ShareModal";
import { useState } from "react";

const API_BASE = "https://file-upload-pry8.onrender.com/api";

interface Props {
  file: FileItem;
}

export default function FileCard({ file }: Props) {
  const [showShare, setShowShare] = useState(false);

  const download = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(`${API_BASE}/files/${file._id}/download`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      window.open(res.data.downloadUrl, "_blank");
    } catch {
      alert("You are not allowed to download this file");
    }
  };

  return (
    <div className="file-card">
      <div className="file-icon">📄</div>

      <div className="file-info">
        <span className="file-name">{file.filename}</span>

        <div className="file-actions">
          <button className="download-btn" onClick={download}>
            Download
          </button>
          <button className="share-btn" onClick={() => setShowShare(true)}>
            Share
          </button>
        </div>
      </div>

      {showShare && (
        <ShareModal fileId={file._id} onClose={() => setShowShare(false)} />
      )}
    </div>
  );
}
