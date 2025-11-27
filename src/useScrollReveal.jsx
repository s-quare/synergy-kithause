import { useEffect } from "react";

export const useScrollReveal = (checker) => {

  useEffect(() => {
    if(checker) {
    const handleLoad = () => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.remove(
                "hidden-up",
                "hidden-left",
                "hidden-right",
                "zoom-in"
              );
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.2 }
      );

      const elements = document.querySelectorAll(
        ".hidden-up, .hidden-left, .hidden-right, .zoom-in"
      );
      elements.forEach((item) => observer.observe(item));
    }; // handleLoad

    if (document.readyState === "loading") {
      window.addEventListener("DOMContentLoaded", handleLoad);
    } else {
      handleLoad();
    }
  }
  }, [checker]);
};
