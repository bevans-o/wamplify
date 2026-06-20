"use client";

import React from "react";
import page from "./page.module.css";

function Error() {
  return (
    <div className={page.error}>
      <h2>Whoops! Something went wrong.</h2>
      <p style={{ maxWidth: "25rem", textAlign: "center" }}>
        The University has made it harder for third-party applications like Wamplify to access the handbook, so you
        might not see assessments 🥹. You can still enter subject scores and use the Wamometer.
      </p>
      <p>
        Try{" "}
        <a
          onClick={() => {
            localStorage.removeItem("subjects");
            window.location.reload();
          }}
        >
          clearing your subjects
        </a>
        .
      </p>
    </div>
  );
}

export default Error;
