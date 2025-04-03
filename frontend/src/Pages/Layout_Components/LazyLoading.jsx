import React, { useEffect } from "react";

const LazyLoading = () => {
  useEffect(() => {
    import("@dotlottie/player-component");
  }, []);

  return (
    <div style={{
      position: "relative",
      width: "100%",
      paddingTop: "56.25%", // 16:9 aspect ratio (adjust as needed)
      overflow: "hidden",
      backgroundColor: "transparent",
      margin: "0 auto",
      maxWidth: "1920px" // Optional max-width for very large screens
    }}>
      <dotlottie-player
        src="https://lottie.host/4379f0b5-9f10-4f98-8d39-93aab6766b25/nSTPTJy1rF.lottie"
        background="transparent"
        speed="1"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "100%",
          height: "100%",
          minWidth: "300px", // Minimum reasonable size
        }}
        loop
        autoplay
      ></dotlottie-player>
    </div>
  );
};

export default LazyLoading;