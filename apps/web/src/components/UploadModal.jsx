
import axios from "axios";
import { useState } from "react";

export default function UploadModal({ onClose }) {
  const [files, setFiles] = useState([]);

  const upload = async () => {
    const formData = new FormData();
    files.forEach((f) => formData.append("files", f));

    await axios.post("/files/upload", formData);
    window.location.reload();
  };

  return (
    <div>
      <input
        type="file"
        multiple
        onChange={(e) => setFiles([...e.target.files])}
      />
      <button onClick={upload}>Upload</button>
      <button onClick={onClose}>Cancel</button>
    </div>
  );
}
