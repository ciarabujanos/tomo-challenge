interface ErrorBannerProps {
  error: string;
}

const ErrorBanner = ({ error }: ErrorBannerProps) => {
  return (
    <div
      role="alert"
      className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded"
    >
      {error}
    </div>
  );
};

export default ErrorBanner;
