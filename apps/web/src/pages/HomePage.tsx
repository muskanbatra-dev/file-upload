import { useNavigate } from "react-router-dom";
import "./HomePage.css";

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <header className="home-header">
        <h1 className="brand">Image Drive</h1>
        <p className="tagline">
          Upload, store and share your images securely in one place
        </p>
      </header>

      <div className="hero">
        <div className="upload-icon">🖼️</div>

        <h2>Your personal image cloud</h2>
        <p>
          Register to upload images, generate share links, and access them
          anytime.
        </p>

        <div className="cta-buttons">
          <button className="primary-btn" onClick={() => navigate("/register")}>
            Get Started
          </button>

          <button className="secondary-btn" onClick={() => navigate("/login")}>
            Login
          </button>
        </div>
      </div>
    </div>
  );
}
