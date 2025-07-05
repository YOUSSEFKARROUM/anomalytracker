import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./styles/tailwind.css";
import "./styles/index.css";
import { Toaster } from 'react-hot-toast';

const container = document.getElementById("root");
const root = createRoot(container);

function MainApp() {
  return (
    <>
      <App />
      <Toaster position="top-right" toastOptions={{ duration: 3500 }} />
    </>
  );
}

root.render(<MainApp />);
