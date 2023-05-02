import { React, useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ResetScrollPos() {
  const routePath = useLocation();
  const toTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  };
  useEffect(() => {
    toTop();
  }, [routePath]);

  return null;
}
