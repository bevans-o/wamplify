"use client";

import React from "react";
import page from "./page.module.css";

function Error() {
  return (
    <div className={page.error}>
      <h2>Whoops! Something went wrong.</h2>
      <p>
        Try <a onClick={() => window.location.reload()}>refreshing the page.</a>
      </p>
    </div>
  );
}

export default Error;
