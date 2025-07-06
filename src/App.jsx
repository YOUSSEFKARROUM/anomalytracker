import React from "react";
import Routes from "./Routes";
<<<<<<< HEAD

function App() {
  return (
    <Routes />
  );
}

export default App;
=======
import { ToastProvider } from "./components/ui/Toast";

function App() {
  return (
    <ToastProvider>
      <Routes />
    </ToastProvider>
  );
}

export default App;
>>>>>>> bc000c11974367210cfab4d6dedc04071ffb1d60
