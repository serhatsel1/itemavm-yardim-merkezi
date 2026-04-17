import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-bg px-4 text-center">
      <p className="text-[80px] font-bold leading-none text-text/10">404</p>
      <h1 className="mt-4 text-[22px] font-semibold text-text">
        Sayfa Bulunamadı
      </h1>
      <p className="mt-2 max-w-sm text-[14px] font-medium leading-[1.714] text-text-muted">
        Aradığınız sayfa mevcut değil veya taşınmış olabilir.
      </p>
      <Link
        href="/yardim-merkezi"
        className="mt-8 inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-[14px] font-medium text-text transition-opacity hover:opacity-90"
      >
        Yardım Merkezine Dön
      </Link>
    </div>
  );
}
