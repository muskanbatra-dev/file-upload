import axios from "axios";

const API_BASE = "https://file-upload-pry8.onrender.com/api";

export default function FileCard({ file }) {
  const download = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(`${API_BASE}/files/${file._id}/download`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      window.open(res.data.downloadUrl, "_blank");
    } catch (err) {
      console.error(err);
      alert("You are not allowed to download this file");
    }
  };

  return (
    <div
      style={{
        border: "1px solid #ccc",
        padding: "10px",
        marginBottom: "10px",
      }}
    >
      <p>{file.filename}</p>
      <button onClick={download}>Download</button>
    </div>
  );
}
