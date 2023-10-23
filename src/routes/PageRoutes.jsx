import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage";
import SavedRecipe from "../components/SavedRecipe/SavedRecipe";

const PageRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/savedrecipe" element={<SavedRecipe />} />
    </Routes>
  );
};

export default PageRoutes;
