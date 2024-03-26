import { Header } from './_components/header';
import { Sidebar } from './_components/sidebar';

export default function ProtectedLayout({ children }: WithChildren) {
  return (
    <main className="min-w-full min-h-svh p-4 relative z-30">
      <Header />
      <section className="main-section">
        <Sidebar />
        <div className="pr-1.5 grid-screen-container hide-scrollbar">
          {children}
        </div>
      </section>
    </main>
  );
}
