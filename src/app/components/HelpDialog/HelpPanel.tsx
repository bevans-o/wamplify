import React, { ReactNode } from "react";
import help from "../HelpDialog/help.module.css";

function ModalPanel({ children }: { children?: ReactNode }) {
  return <div className={`${help.panel} panel`}>{children}</div>;
}

export default ModalPanel;
