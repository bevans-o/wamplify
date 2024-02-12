import React from "react";
import loading from "./loading.module.css";

function LoadingBox({ isLoading, rows }: { isLoading: boolean; rows: number }) {
  const lightsPerRow = 15;

  return (
    <div className={loading.container}>
      {[...Array(rows * lightsPerRow)].map((_, i) => (
        <div
          key={i}
          className={isLoading ? loading.lightOn : loading.lightOff}
          style={{ animationDelay: `${i * 6}0ms` }}
        ></div>
      ))}
    </div>
  );
}

export default LoadingBox;
