import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home/Home";
import Events from "./pages/Events/Events";
import Show from "./pages/Show/Show";
import NewsDetail from "./pages/NewsDetail/NewsDetail";

/* =========================
   PAGE TRANSITION WRAPPER
   ========================= */
function PageTransition({ children }) {
  const location = useLocation();
  const [displayLocation, setDisplayLocation] = useState(location);
  const [transitionStage, setTransitionStage] = useState("fadeIn");

  useEffect(() => {
    if (location !== displayLocation) {
      setTransitionStage("fadeOut");
    }
  }, [location, displayLocation]);

  return (
    <div
      className={`page-transition ${transitionStage}`}
      onAnimationEnd={() => {
        if (transitionStage === "fadeOut") {
          setTransitionStage("fadeIn");
          setDisplayLocation(location);
          window.scrollTo(0, 0);
        }
      }}
    >
      {children}
    </div>
  );
}

/* =========================
   APP ROUTES WITH TRANSITIONS
   ========================= */
function AppRoutes() {
  return (
    <PageTransition>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/event" element={<Events />} />
        <Route path="/show" element={<Show />} />
        <Route path="/news/:slug" element={<NewsDetail />} />
      </Routes>
    </PageTransition>
  );
}

/* =========================
   MAIN APP COMPONENT
   ========================= */
export default function App() {
  useEffect(() => {
    // Prevent browser from restoring scroll position on navigation
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  return (
    <BrowserRouter>
      <div className="">
        {/* Fixed Header */}
        <Header />

        {/* Main Content with Page Transitions */}
        <main className="app-main">
          <AppRoutes />
        </main>

        {/* Fixed Footer Navigation */}
        <Footer />
      </div>
    </BrowserRouter>
  );
}