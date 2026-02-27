import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Marketplace from "./pages/Marketplace";
import "./App.css";

function NotFound() {
  return (
    <div className="mx-auto flex min-h-screen max-w-5xl items-center justify-center px-6">
      <div className="glass-panel w-full max-w-xl rounded-3xl p-10 text-center">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-brand-700">
          404
        </p>
        <h1 className="font-display text-4xl font-semibold text-slate-900">
          Page Not Found
        </h1>
        <p className="mt-3 text-slate-600">
          The route you opened is not available in this frontend build.
        </p>
      </div>
    </div>
  );
}

function App() {
  return (
    <div className="app-shell">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/marketplace" replace />} />
          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
