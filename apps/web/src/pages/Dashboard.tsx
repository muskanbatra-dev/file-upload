import { useEffect, useState } from "react";
import axios from "axios";
import FileCard from "../components/FileCard";
import UploadModal from "../components/UploadModal";
import { FileItem } from "../types/file";

const API_BASE = "https://file-upload-pry8.onrender.com/api";

export default function Dashboard() {
  const [files, setFiles] = useState<FileItem[]>([]);
  const [showUpload, setShowUpload] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFiles = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        console.error("No token found");
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get<FileItem[]>(`${API_BASE}/files`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setFiles(res.data);
      } catch (err) {
        console.error("Fetch files error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFiles();
  }, []);

  if (loading) return <p>Loading files...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>My Files</h2>

      <button onClick={() => setShowUpload(true)}>Upload</button>

      {files.length === 0 && <p>No files uploaded yet.</p>}

      <div style={{ marginTop: "20px" }}>
        {files.map((file) => (
          <FileCard key={file._id} file={file} />
        ))}
      </div>

      {showUpload && (
        <UploadModal
          onClose={() => setShowUpload(false)}
          onUploadSuccess={(newFiles: any) =>
            setFiles((prev) => [...newFiles, ...prev])
          }
        />
      )}
    </div>
  );
}
