import { useEffect } from "react";

const useSmoothScroll = () => {
  useEffect(() => {
    let scrollTarget = window.scrollY;
    let isScrolling = false;
    const easeFactor = 0.02;

    const handleWheel = (event) => {
      if (event.target.closest(".modal") || event.target.closest(".modal-overlay")) {
        document.body.style.overflow = "hidden";
        return;
      } else {
        document.body.style.overflow = "";
      }

      event.preventDefault();

      scrollTarget += event.deltaY * 1.5;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      scrollTarget = Math.max(0, Math.min(scrollTarget, maxScroll));

      if (!isScrolling) {
        isScrolling = true;
        requestAnimationFrame(smoothScroll);
      }
    };

    const smoothScroll = () => {
      const currentScroll = window.scrollY;
      const distance = scrollTarget - currentScroll;

      if (Math.abs(distance) > 0.5) {
        window.scrollTo(0, currentScroll + distance * easeFactor);
        requestAnimationFrame(smoothScroll);
      } else {
        isScrolling = false;
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      window.removeEventListener("wheel", handleWheel);
    };
  }, []);
};

export default useSmoothScroll;