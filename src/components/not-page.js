import { useNavigate } from "react-router";
import "./not-page.css";

const NotPage = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="body">
        <main class="container">
          <div>
            <span class="particle">4</span>
            <span class="particle">4</span>
            <span class="particle">4</span>
            <span class="particle">4</span>
            <span class="particle">4</span>
            <span class="particle">4</span>
            <span class="particle">4</span>
            <span class="particle">4</span>
            <span class="particle">4</span>
            <span class="particle">4</span>
            <span class="particle">4</span>
            <span class="particle">4</span>
            <span class="particle">4</span>
            <span class="particle">4</span>
            <span class="particle">4</span>
            <span class="particle">4</span>
            <span class="particle">4</span>
            <span class="particle">4</span>
            <span class="particle">4</span>
            <span class="particle">4</span>
            <span class="particle">4</span>
            <span class="particle">4</span>
            <span class="particle">4</span>
            <span class="particle">4</span>
            <span class="particle">4</span>
            <span class="particle">4</span>
            <span class="particle">4</span>
            <span class="particle">4</span>
            <span class="particle">4</span>
            <span class="particle">4</span>
            <span class="particle">4</span>
            <span class="particle">4</span>
            <span class="particle">4</span>
            <span class="particle">4</span>
            <span class="particle">4</span>
            <span class="particle">4</span>
            <span class="particle">4</span>
            <span class="particle">4</span>
            <span class="particle">4</span>
            <span class="particle">4</span>
            <span class="particle">0</span>
            <span class="particle">0</span>
            <span class="particle">0</span>
            <span class="particle">0</span>
            <span class="particle">0</span>
            <span class="particle">0</span>
            <span class="particle">0</span>
            <span class="particle">0</span>
            <span class="particle">0</span>
            <span class="particle">0</span>
            <span class="particle">0</span>
            <span class="particle">0</span>
            <span class="particle">0</span>
            <span class="particle">0</span>
            <span class="particle">0</span>
            <span class="particle">0</span>
            <span class="particle">0</span>
            <span class="particle">0</span>
            <span class="particle">0</span>
            <span class="particle">0</span>
            <span class="particle">0</span>
            <span class="particle">0</span>
            <span class="particle">0</span>
            <span class="particle">0</span>
            <span class="particle">0</span>
            <span class="particle">0</span>
            <span class="particle">0</span>
            <span class="particle">0</span>
            <span class="particle">0</span>
            <span class="particle">0</span>
            <span class="particle">0</span>
            <span class="particle">0</span>
            <span class="particle">0</span>
            <span class="particle">0</span>
            <span class="particle">0</span>
            <span class="particle">0</span>
            <span class="particle">0</span>
            <span class="particle">0</span>
            <span class="particle">0</span>
            <span class="particle">0</span>
          </div>
          <article class="content">
            <p>Bu Sahifa ishlab chiqish jarayonida</p>
            <p>
              Asosiy
              <strong
                onClick={() => {
                  navigate("/menu");
                }}
                style={{ cursor: "pointer", margin: "0 4px" }}
              >
                Menu
              </strong>
              ga qaytishingiz mumkin
            </p>
            <button
              onClick={() => {
                navigate("/menu");
              }}
            >
              Go back to earth.
            </button>
          </article>
        </main>
      </div>
    </>
  );
};

export default NotPage;
