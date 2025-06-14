// src/stores/provider.js
"use client";

import { useEffect, useState } from "react";

export default function StoreProvider({ children }) {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return null;
  }

  return children;
}
