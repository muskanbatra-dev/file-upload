import axios from "axios";
import { useState } from "react";

const API_BASE = "https://file-upload-pry8.onrender.com/api";

export default function ShareModal({ fileId, onClose }) {
  const [userId, setUserId] = useState("");
  const [shareLink, setShareLink] = useState("");
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  const shareWithUser = async () => {
    if (!userId) {
      alert("Please enter a user ID");
      return;
    }

    try {
      setLoading(true);

      await axios.post(
        `${API_BASE}/files/${fileId}/share-user`,
        {
          userIds: [userId],
         
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("File shared with user");
      setUserId("");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to share file");
    } finally {
      setLoading(false);
    }
  };

  const shareLinkHandler = async () => {
    try {
      setLoading(true);

      const res = await axios.post(
        `${API_BASE}/files/${fileId}/share-link`,
        {
         
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setShareLink(res.data.shareUrl);
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to generate link");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px", border: "1px solid #ccc" }}>
      <h3>Share File</h3>

      <div>
        <input
          placeholder="User ID"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />
        <button onClick={shareWithUser} disabled={loading}>
          Share with User
        </button>
      </div>

      <div style={{ marginTop: "10px" }}>
        <button onClick={shareLinkHandler} disabled={loading}>
          Generate Share Link
        </button>
      </div>

      {shareLink && (
        <div style={{ marginTop: "10px" }}>
          <p>Share link:</p>
          <a href={shareLink} target="_blank" rel="noreferrer">
            {shareLink}
          </a>
        </div>
      )}

      <button onClick={onClose} style={{ marginTop: "15px" }}>
        Close
      </button>
    </div>
  );
}
