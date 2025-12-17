
import axios from "axios";
import { useState } from "react";

export default function ShareModal({ fileId }) {
  const [userId, setUserId] = useState("");

  const shareWithUser = async () => {
    await api.post(`/files/${fileId}/share-user`, {
      userIds: [userId],
    });
    alert("Shared!");
  };

  const shareLink = async () => {
    const res = await api.post(`/files/${fileId}/share-link`);
    alert(res.data.shareUrl);
  };

  return (
    <div>
      <input
        placeholder="User ID"
        onChange={(e) => setUserId(e.target.value)}
      />
      <button onClick={shareWithUser}>Share with user</button>
      <button onClick={shareLink}>Generate link</button>
    </div>
  );
}
