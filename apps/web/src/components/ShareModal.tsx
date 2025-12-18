import axios from "axios";
import { useState } from "react";

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
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
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
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setShareLink(res.data.shareUrl);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px", border: "1px solid #ccc" }}>
      <input
        placeholder="User ID"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
      />

      <button onClick={shareWithUser} disabled={loading}>
        Share with User
      </button>

      <button onClick={generateLink} disabled={loading}>
        Generate Link
      </button>

      {shareLink && (
        <p>
          <a href={shareLink} target="_blank" rel="noreferrer">
            {shareLink}
          </a>
        </p>
      )}

      <button onClick={onClose}>Close</button>
    </div>
  );
}
