"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-bg px-4">
      <div className="flex flex-col items-center gap-4 text-center">
        <h2 className="text-[20px] font-semibold text-text">
          Bir hata oluştu
        </h2>
        <p className="text-[14px] text-text-muted">
          {error.message || "Sayfa yüklenirken beklenmeyen bir sorun oluştu."}
        </p>
        <button
          type="button"
          onClick={reset}
          className="rounded-lg bg-primary px-6 py-3 text-[14px] font-medium text-white transition-colors hover:bg-primary/90"
        >
          Tekrar Dene
        </button>
      </div>
    </div>
  );
}
