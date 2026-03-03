import { Routes, Route } from "react-router-dom";
import SyfcorpHomepage from "./pages/Home";
import SlimePage from "./pages/Slime";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<SyfcorpHomepage />} />
      <Route path="/slime" element={<SlimePage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
