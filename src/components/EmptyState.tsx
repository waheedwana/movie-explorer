export function EmptyState({
  title,
  message,
}: {
  title: string;
  message: string;
}) {
  return (
    <div className="empty-state">
      <span className="empty-icon" aria-hidden="true">
        🎬
      </span>
      <h3>{title}</h3>
      <p>{message}</p>
    </div>
  );
}
