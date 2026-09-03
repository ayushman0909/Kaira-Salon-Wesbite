import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Home from "./pages/Home";
import Admin from "./pages/Admin";

import AdminHome from "./admin/AdminHome";
import GalleryManager from "./admin/GalleryManager";
import ServicesManager from "./admin/ServicesManager";
import ReviewsManager from "./admin/ReviewsManager";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ================= PUBLIC WEBSITE ================= */}

        <Route path="/" element={<Home />} />

        {/* ================= ADMIN ================= */}

        <Route path="/admin" element={<Admin />}>
          <Route index element={<AdminHome />} />

          <Route
            path="gallery"
            element={<GalleryManager />}
          />

          <Route
            path="services"
            element={<ServicesManager />}
          />

          <Route
            path="reviews"
            element={<ReviewsManager />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;