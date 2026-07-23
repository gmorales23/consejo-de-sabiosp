import Link from "next/link";
import Image from "next/image";

const NAV = [
  { href: "/capitulos", label: "Capítulos" },
  { href: "/entrevistas", label: "Entrevistas" },
  { href: "/archivo", label: "Archivo" },
  { href: "/el-consejo", label: "El Consejo" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b hairline bg-[var(--color-ink)]/95 backdrop-blur">
      <div className="container-page flex items-center justify-between py-4">
        <Link href="/" className="flex items-center gap-3 group">
          <Image
            src="/images/logo-yoda-Photoroom.png"
            alt="Consejo de Sabios"
            width={36}
            height={36}
            className="h-9 w-9 shrink-0"
          />
          <span
            className="font-[var(--font-display)] text-lg sm:text-xl tracking-wide leading-none group-hover:text-[var(--color-yellow)] transition-colors"
            style={{ fontFamily: "var(--font-display)" }}
          >
            CONSEJO&nbsp;DE&nbsp;SABIOS
          </span>
        </Link>
        <nav className="hidden md:flex items-center gap-8">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="eyebrow !text-[var(--color-paper-dim)] hover:!text-[var(--color-yellow)] transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <nav className="flex md:hidden items-center gap-4 overflow-x-auto">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="eyebrow whitespace-nowrap !text-[var(--color-paper-dim)]"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
