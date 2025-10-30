import React from "react";
import bgDark from "@/assets/branding/bacground-page.webp";

export default function BackgroundWrapper({ children }) {
  return (
    <div
      className="min-h-screen w-full"
      style={{
        backgroundImage: `url(${bgDark})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {children}
    </div>
  );
}
