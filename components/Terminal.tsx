import Header from "./Header";
import ViewCounter from "./ViewCounter";

interface TerminalProps {
  children: React.ReactNode;
  showScanlines?: boolean;
}

export default function Terminal({ children, showScanlines = false }: TerminalProps) {
  return (
    <div className={showScanlines ? "crt-effect" : ""}>
      <Header />
      <main className="max-w-3xl mx-auto px-4 pb-16">
        {children}
      </main>
      <footer className="max-w-3xl mx-auto px-4 pb-8 text-center">
        <ViewCounter />
      </footer>
    </div>
  );
}
