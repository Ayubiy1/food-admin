import { Routes, Route } from "react-router-dom";
import MenuComp from "./menus/menu";
import NotPage from "./not-page";
import Products from "./products";

const ContantComp = () => {
  return (
    <Routes>
      <Route path="/menu">
        <Route path="categories" element={<MenuComp />} />
        <Route path="categories/:id" element={<Products />} />
      </Route>
      <Route path="/reklama" element={<NotPage />} />
      <Route path="/ishchilar" element={<NotPage />} />
      <Route path="/konpaniya-nomlari" element={<NotPage />} />
      <Route path="/bildirishnoma" element={<NotPage />} />
    </Routes>
  );
};

export default ContantComp;
