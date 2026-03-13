import { type ReactNode } from "react";
import { TabBar } from "./TabBar";
import { Header } from "./Header";
import { AudioPlayer } from "./AudioPlayer";

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col min-h-svh bg-bg-primary scanlines">
      <Header />
      <main className="flex-1 overflow-y-auto pb-28">{children}</main>
      <AudioPlayer />
      <TabBar />
    </div>
  );
}
