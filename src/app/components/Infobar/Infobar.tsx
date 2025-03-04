import React from "react";
import infobar from "./infobar.module.css";

function Infobar({ version, message }: { version: string; message: string }) {
  return (
    <div className={infobar.container}>
      <div>
        <span className={infobar.version}>Wamplify {version}</span>
        <span className={infobar.message}>{message}</span>
      </div>

      <div className={infobar.credits}>
        👹
        <a target="_blank" href="https://www.linkedin.com/in/risa-pais/">
          Risa
        </a>
        <span> & </span>
        <a target="_blank" href="https://www.linkedin.com/in/bevans-o/">
          Ben
        </a>
      </div>
    </div>
  );
}

export default Infobar;
