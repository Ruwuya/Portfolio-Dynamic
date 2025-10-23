import axios from "axios";
import { useState } from "react";

export default function UploadPDF() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [fileUrl, setFileUrl] = useState("");

  const handleUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post(
        "http://localhost/portfolio-backend/api/uploadFile.php",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      // backend returns { success: true, filePath: "../uploads/filename.pdf" }
      if (res.data.success) {
        setMessage("Upload successful!");
        // Build a full public URL to the uploaded file
        setFileUrl(
          "http://localhost/portfolio-backend/" +
            res.data.filePath.replace("../", "")
        );
      } else {
        setMessage(res.data.error || "Upload failed.");
      }
    } catch (err) {
      console.error(err);
      setMessage("Upload failed.");
    }
  };

  return (
    <div>
      <h2>Upload PDF</h2>
      <form onSubmit={handleUpload}>
        <input
          type="file"
          accept=".pdf"
          onChange={(e) => setFile(e.target.files[0])}
          required
        />
        <button type="submit">Upload</button>
      </form>

      <p>{message}</p>

      {/* Show link if upload succeeded */}
      {fileUrl && (
        <p>
          If you'd like my CV in PDF format, please feel free to{" "}
          <a href={fileUrl} download>
            download it here
          </a>
          .
        </p>
      )}
    </div>
  );
}