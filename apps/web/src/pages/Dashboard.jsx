import { useEffect, useState } from "react";
import axios from "axios";
import FileCard from "../components/FileCard";
import UploadModal from "../components/UploadModal";

export default function Dashboard() {
  const [files, setFiles] = useState([]);
  const [showUpload, setShowUpload] = useState(false);

  useEffect(() => {
    axios.get("/files").then((res) => setFiles(res.data));
  }, []);

  return (
    <div>
      <h2>My Files</h2>
      <button onClick={() => setShowUpload(true)}>Upload</button>

      {files.map((file) => (
        <FileCard key={file._id} file={file} />
      ))}

      {showUpload && <UploadModal onClose={() => setShowUpload(false)} />}
    </div>
  );
}
