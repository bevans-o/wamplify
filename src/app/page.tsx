"use client";

import wamplify from "./page.module.css";
import Infobar from "./components/Infobar/Infobar";
import PanelSlider from "./components/PanelSlider/PanelSlider";
import Header from "./components/Header/Header";

export default function Home() {
  return (
    <main className={wamplify.main}>
      <div>
        <p
          style={{
            position: "absolute",
            left: "-99999px",
            top: "-99999px",
            visibility: "hidden",
          }}
        >
          Wamplify is a UniMelb WAM calculator for students at the University of Melbourne. Enter your marks for the
          assessments you have completed. Then, choose the overall mark you’re aiming for and Wamplify will show you
          what you need in your remaining assessments to reach that target, and how it will affect your WAM.
        </p>
      </div>
      <Header />

      <PanelSlider />

      <Infobar version="1.3.0" message="2025 subjects are here!" />
    </main>
  );
}
