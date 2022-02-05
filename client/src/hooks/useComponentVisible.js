import { useEffect } from "react";
import { useState } from "react";
import { useRef } from "react";

export default function useComponentVisible(initialVisible) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(initialVisible);

  const handleHideKeyboardEsc = (e) => {
    if (e.key === "Escape") {
      setVisible(false);
    }
  };
  const handleClickOutside = (e) => {
    if (ref.current && !ref.current.contains(e.target)) {
      setVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleHideKeyboardEsc, true);
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("keydown", handleHideKeyboardEsc, true);
      document.removeEventListener("click", handleClickOutside, true);
    };
  });

  return { ref, visible, setVisible };
}
