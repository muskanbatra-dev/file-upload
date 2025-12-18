import axios from "axios";
import { useState } from "react";
import "./ShareModal.css";

const API_BASE = "https://file-upload-pry8.onrender.com/api";

interface Props {
  fileId: string;
  onClose: () => void;
}

export default function ShareModal({ fileId, onClose }: Props) {
  const [userId, setUserId] = useState("");
  const [shareLink, setShareLink] = useState("");
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  const shareWithUser = async () => {
    if (!userId) return alert("Enter user ID");

    try {
      setLoading(true);
      await axios.post(
        `${API_BASE}/files/${fileId}/share-user`,
        { userIds: [userId] },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Shared with user");
      setUserId("");
    } finally {
      setLoading(false);
    }
  };

  const generateLink = async () => {
    try {
      setLoading(true);
      const res = await axios.post(
        `${API_BASE}/files/${fileId}/share-link`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setShareLink(res.data.shareUrl);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="share-overlay">
      <div className="share-modal">
        <h3>Share File</h3>

        <input
          className="share-input"
          placeholder="Enter User ID"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />

        <div className="share-actions">
          <button onClick={shareWithUser} disabled={loading}>
            Share with User
          </button>

          <button onClick={generateLink} disabled={loading}>
            Generate Link
          </button>
        </div>

        {shareLink && (
          <div className="share-link">
            <p>Shareable link:</p>
            <a href={shareLink} target="_blank" rel="noreferrer">
              {shareLink}
            </a>
          </div>
        )}

        <button className="close-btn" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}
