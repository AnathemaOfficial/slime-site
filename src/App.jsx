import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import SyfcorpHomepage from "./pages/Home";
import SlimePage from "./pages/Slime";
import NotFound from "./pages/NotFound";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<SyfcorpHomepage />} />
        <Route path="/slime" element={<SlimePage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}
