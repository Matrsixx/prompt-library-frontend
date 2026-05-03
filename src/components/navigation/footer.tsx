export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-16 border-t border-neutral-200 bg-white">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-2 px-6 py-6 text-xs text-neutral-500 sm:flex-row">
        <span>© {year} Prompt Library</span>
        <nav className="flex items-center gap-4">
          <a
            href="https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-indigo-600"
          >
            Prompt engineering guide
          </a>
          <a
            href="https://claude.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-indigo-600"
          >
            Open Claude
          </a>
        </nav>
      </div>
    </footer>
  );
}
