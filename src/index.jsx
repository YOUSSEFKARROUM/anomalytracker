import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./styles/tailwind.css";
import "./styles/index.css";
<<<<<<< HEAD
import { Toaster } from 'react-hot-toast';
=======
>>>>>>> bc000c11974367210cfab4d6dedc04071ffb1d60

const container = document.getElementById("root");
const root = createRoot(container);

<<<<<<< HEAD
function MainApp() {
  return (
    <>
      <App />
      <Toaster position="top-right" toastOptions={{ duration: 3500 }} />
    </>
  );
}

root.render(<MainApp />);
=======
root.render(<App />);
>>>>>>> bc000c11974367210cfab4d6dedc04071ffb1d60
