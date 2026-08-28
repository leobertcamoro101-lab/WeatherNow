const ErrorMessage = ({ message }) => (
  <div className="flex items-center gap-3 bg-red-500/15 border border-red-500/30 rounded-xl px-5 py-4 text-red-300 text-[0.95rem]">
    <span>⚠️</span>
    <p>{message}</p>
  </div>
);

export default ErrorMessage;
