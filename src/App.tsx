import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AppShell } from "./components/layout/AppShell";
import { RulesPage } from "./components/rules/RulesPage";
import { ForceBuilderPage } from "./components/force-builder/ForceBuilderPage";
import { PlayPage } from "./components/play/PlayPage";
import { LorePage } from "./components/lore/LorePage";

export default function App() {
  return (
    <BrowserRouter>
      <AppShell>
        <Routes>
          <Route path="/" element={<Navigate to="/rules" replace />} />
          <Route path="/rules" element={<RulesPage />} />
          <Route path="/forces" element={<ForceBuilderPage />} />
          <Route path="/play" element={<PlayPage />} />
          <Route path="/lore" element={<LorePage />} />
        </Routes>
      </AppShell>
    </BrowserRouter>
  );
}
