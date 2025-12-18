import { useEffect, useState } from "react";
import axios from "axios";
import FileCard from "../components/FileCard";
import UploadModal from "../components/UploadModal";
import { FileItem } from "../types/file";
import "./Dashboard.css";

const API_BASE = "https://file-upload-pry8.onrender.com/api";

export default function Dashboard() {
  const [files, setFiles] = useState<FileItem[]>([]);
  const [showUpload, setShowUpload] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFiles = async () => {
      const token = localStorage.getItem("token");
      if (!token) return setLoading(false);

      try {
        const res = await axios.get<FileItem[]>(`${API_BASE}/files`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setFiles(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchFiles();
  }, []);

  if (loading) return <p className="loading">Loading files...</p>;

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h2>My Files</h2>
        <button className="upload-btn" onClick={() => setShowUpload(true)}>
          Upload
        </button>
      </div>

      {files.length === 0 && (
        <p className="empty-state">No files uploaded yet.</p>
      )}

      <div className="file-list">
        {files.map((file) => (
          <FileCard key={file._id} file={file} />
        ))}
      </div>

      {showUpload && (
        <UploadModal
          onClose={() => setShowUpload(false)}
          onUploadSuccess={(newFiles: FileItem[]) =>
            setFiles((prev) => [...newFiles, ...prev])
          }
        />
      )}
    </div>
  );
}
