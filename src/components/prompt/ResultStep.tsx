import { useState } from "react";
import { claudeUrl } from "../../lib/buildPrompt";

type Props = {
  prompt: string;
  onBack: () => void;
  onStartOver: () => void;
};

export function ResultStep({ prompt, onBack, onStartOver }: Props) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(prompt);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  const handleCopyAndOpen = async () => {
    await handleCopy();
    window.open(claudeUrl(prompt), "_blank", "noopener,noreferrer");
  };

  return (
    <section className="space-y-6">
      <header>
        <h2 className="text-xl font-semibold text-neutral-900">Your prompt</h2>
        <p className="mt-1 text-sm text-neutral-600">
          Review, then copy or hand it off to Claude in a new tab.
        </p>
      </header>

      <div className="rounded-md border border-neutral-200 bg-neutral-50 p-4">
        <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed text-neutral-900">
          {prompt}
        </pre>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={handleCopy}
          className="rounded-md border border-neutral-300 bg-white px-4 py-2 text-sm font-medium text-neutral-800 shadow-sm hover:bg-neutral-50"
        >
          {copied ? "Copied!" : "Copy"}
        </button>
        <button
          type="button"
          onClick={handleCopyAndOpen}
          className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-500"
        >
          Copy & open in Claude
        </button>
        <div className="grow" />
        <button
          type="button"
          onClick={onBack}
          className="rounded-md px-3 py-2 text-sm font-medium text-neutral-600 hover:bg-neutral-100"
        >
          Back
        </button>
        <button
          type="button"
          onClick={onStartOver}
          className="rounded-md px-3 py-2 text-sm font-medium text-neutral-600 hover:bg-neutral-100"
        >
          New prompt
        </button>
      </div>
    </section>
  );
}
