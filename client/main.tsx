import "./global.css";
import { createRoot } from "react-dom/client";
import App from "./App";

const container = document.getElementById("root");
if (!container) {
  throw new Error("Root container not found");
}

// Ensure we only create root once
let root = (window as any).__react_root__;
if (!root) {
  root = createRoot(container);
  (window as any).__react_root__ = root;
}

root.render(<App />);
