import { useEffect, useState } from "react";
import axios from "axios";
import FileCard from "../components/FileCard";
import UploadModal from "../components/UploadModal";

const API_BASE = "https://file-upload-pry8.onrender.com/api";

export default function Dashboard() {
  const [files, setFiles] = useState([]);
  const [showUpload, setShowUpload] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(`${API_BASE}/files`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setFiles(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error(err);
        alert("Failed to load files");
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
          onUploadSuccess={(newFiles) =>
            setFiles((prev) => [...newFiles, ...prev])
          }
        />
      )}
    </div>
  );
}
