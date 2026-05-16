import { useEffect, useState } from "react";

const useLoader = () => {
  const [loading, setLoading] = useState(true);
  const [online, setOnline] = useState(navigator.onLine);

  useEffect(() => {
    // ONLINE / OFFLINE handler
    const handleOnline = () => setOnline(true);
    const handleOffline = () => setOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    // fake initial loading finish
    const timer = setTimeout(() => {
      setLoading(false); // 🔥 THIS FIXES YOUR ISSUE
    }, 800);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return { loading, online };
};

export default useLoader;