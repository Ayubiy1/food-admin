import { Routes, Route } from "react-router-dom";
import MenuComp from "./menus/menu";
import NotPage from "./not-page";

const ContantComp = () => {
  return (
    <Routes>
      <Route path="/menu" element={<MenuComp />} />
      <Route path="/reklama" element={<NotPage />} />
      <Route path="/ishchilar" element={<NotPage />} />
      <Route path="/konpaniya-nomlari" element={<NotPage />} />
      <Route path="/bildirishnoma" element={<NotPage />} />
    </Routes>
  );
};

export default ContantComp;
