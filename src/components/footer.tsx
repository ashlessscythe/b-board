import Image from "next/image";

export function Footer() {
  return (
    <footer className="border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-center">
          <a
            href="https://github.com/ashlessscythe/b-board"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <Image
              src="/github.svg"
              alt="GitHub"
              width={20}
              height={20}
              className="opacity-75 group-hover:opacity-100"
            />
            View on GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}
