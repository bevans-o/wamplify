import React from "react";
import Dialog from "@mui/material/Dialog";
import ModalPanel from "./HelpPanel";
import Button from "../Button/Button";
import help from "./help.module.css";
import Logo from "../Logo/Logo";

function HelpDialog({ open, onClose }: { open: boolean; onClose: Function }) {
  return (
    <Dialog open={open} onClose={() => onClose()} PaperComponent={ModalPanel}>
      <h3 className={help.title}>
        <Logo />
      </h3>
      <div className={help.body}>
        <p>
          Wamplify is a tool for students at the University of Melbourne to
          estimate their marks and set academic goals.{" "}
        </p>
        <p>
          Enter your marks for the assessments you have completed. Then, choose
          the overall mark you’re aiming for and Wamplify will show you what you
          need in your remaining assessments to reach that target, and how it
          will affect your WAM. All scores are estimates!
        </p>
        <p>Good luck on your assessments!</p>

        <Button text="Wamplify me!" onClick={() => onClose()} />
      </div>
    </Dialog>
  );
}

export default HelpDialog;
