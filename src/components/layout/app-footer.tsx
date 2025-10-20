import Link from "next/link";

export function AppFooter() {
  return (
    <footer className="py-4 border-t">
      <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
        Made by{" "}
        <Link href="/about-author" className="text-foreground hover:underline">
          🐤
        </Link>{" "}
        with Next.js and ❤️
      </div>
    </footer>
  );
}
