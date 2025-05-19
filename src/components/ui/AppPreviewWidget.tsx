import React, { useState, useEffect } from "react";
import styles from "./styles/AppPreviewWidget.module.css";
import { Color } from "@/lib/types";

interface AppPreviewWidgetProps {
  size: "banner" | "square";
  color: Color;
  fileType: "svg" | "png";
  apiEndpoint: string;
}

export default function AppPreviewWidget({ size, color, fileType, apiEndpoint }: AppPreviewWidgetProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [key, setKey] = useState(0);

  const previewDimensions = {
    width: size === "banner" ? "360px" : "180px",
    height: "180px",
  };

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
      setKey(prev => prev + 1);
    }, 100);

    return () => clearTimeout(timer);
  }, [size, color, fileType]);

  const imageURL = `${apiEndpoint}?size=${size}&theme=${color}&format=${fileType}`;
  const shouldShowSkeleton = isLoading || apiEndpoint.includes("*");

  return (
    <div 
      className={styles.previewArea} 
      style={previewDimensions}
    >
      {shouldShowSkeleton ? (
        <div className={styles.skeleton} />
      ) : (
        <object
          key={key}
          className={styles.previewImage}
          data={imageURL}
          type="image/svg+xml"
        >
          <p>Unable to load SVG</p>
        </object>
      )}
    </div>
  );
}
