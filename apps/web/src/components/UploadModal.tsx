import axios from "axios";
import { useState } from "react";
import { FileItem } from "../types/file";

const API_BASE = "https://file-upload-pry8.onrender.com/api";

interface Props {
  onClose: () => void;
  onUploadSuccess: (files: FileItem[]) => void;
}

export default function UploadModal({ onClose, onUploadSuccess }: Props) {
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);

  const upload = async () => {
    if (files.length === 0) {
      alert("Please select at least one file");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      files.forEach((file) => formData.append("files", file));

      const token = localStorage.getItem("token");

      const res = await axios.post(`${API_BASE}/files/upload`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      onUploadSuccess(res.data.files);
      onClose();
    } catch (err) {
      alert("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px", border: "1px solid #ccc" }}>
      <h3>Upload Files</h3>

      <input
        type="file"
        multiple
        onChange={(e) => setFiles(Array.from(e.target.files || []))}
      />

      <button onClick={upload} disabled={loading}>
        {loading ? "Uploading..." : "Upload"}
      </button>

      <button onClick={onClose} style={{ marginLeft: "10px" }}>
        Cancel
      </button>
    </div>
  );
}
