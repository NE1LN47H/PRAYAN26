import { useState, useCallback } from "react";
import SplashScreen from "@/components/SplashScreen";
import MainSite from "@/components/MainSite";

const Index = () => {
  const [showSplash, setShowSplash] = useState(true);

  const handleSplashComplete = useCallback(() => {
    setShowSplash(false);
  }, []);

  return (
    <>
      {showSplash && <SplashScreen onComplete={handleSplashComplete} />}
      {!showSplash && <MainSite />}
    </>
  );
};

export default Index;
