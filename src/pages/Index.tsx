import { useState, useCallback } from "react";
import SplashScreen from "@/components/SplashScreen";
import MainSite from "@/components/MainSite";
import SmoothScroll from "@/components/SmoothScroll";

const Index = () => {
  const [showSplash, setShowSplash] = useState(true);

  const handleSplashComplete = useCallback(() => {
    setShowSplash(false);
  }, []);

  return (
    <SmoothScroll>
      {showSplash && <SplashScreen onComplete={handleSplashComplete} />}
      {!showSplash && <MainSite />}
    </SmoothScroll>
  );
};

export default Index;
