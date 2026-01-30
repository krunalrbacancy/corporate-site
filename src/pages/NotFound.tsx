function NotFound() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 px-4">
      <div className="max-w-md text-center">
        <div className="mb-6">
          <span className="text-7xl font-extrabold text-slate-800">404</span>
        </div>

        <h1 className="text-2xl font-semibold text-slate-800 mb-2">
          Page not found
        </h1>

        <p className="text-slate-600 mb-8">
          Sorry, the page you're looking for doesn't exist or has been moved.
        </p>

        <div className="flex justify-center gap-4">
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-slate-700"
          >
            Go home
          </a>

          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center rounded-lg border border-slate-300 px-5 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-200"
          >
            Go back
          </button>
        </div>
      </div>
    </section>
  );
}

export default NotFound;
