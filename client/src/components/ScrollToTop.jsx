import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Instantly scroll to the top-left of the window
    window.scrollTo(0, 0);
  }, [pathname]); // Fires every time the route path changes

  return null; // This component doesn't render anything UI-wise
};

export default ScrollToTop;
