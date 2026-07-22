export function EmptyState({ children }: { children: React.ReactNode }) {
  return (
    <div className="card-acta border-dashed p-10 text-center">
      <p className="eyebrow mb-2">Expediente sin abrir</p>
      <p className="text-[var(--color-paper-dim)] max-w-md mx-auto text-sm leading-relaxed">
        {children}
      </p>
    </div>
  );
}
