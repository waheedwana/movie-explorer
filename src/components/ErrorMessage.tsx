export function ErrorMessage({ message }: { message: string }) {
  return (
    <div className="error-message" role="alert">
      <span className="error-icon" aria-hidden="true">
        ⚠️
      </span>
      <p>{message}</p>
    </div>
  );
}
