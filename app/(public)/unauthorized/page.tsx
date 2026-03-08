export default function UnauthorizedPage() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center">
            <h1 className="text-2xl font-bold text-red-600">403 - Unauthorized</h1>
            <p className="mt-2 text-gray-600">
                You do not have permission to access this page.
            </p>
            <a
                href="/"
                className="mt-4 text-blue-600 underline"
            >
                Go back home
            </a>
        </div>
    );
}
