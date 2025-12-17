
import axios from "axios";

export default function FileCard({ file }) {
  const download = async () => {
    const res = await axios.get(`/files/${file._id}/download`);
    window.open(res.data.downloadUrl, "_blank");
  };

  return (
    <div>
      <p>{file.filename}</p>
      <button onClick={download}>Download</button>
    </div>
  );
}
