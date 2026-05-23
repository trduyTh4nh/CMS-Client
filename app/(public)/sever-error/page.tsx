export default function SeverError() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center">
            <h1 className="text-2xl font-bold text-red-600">Oops!</h1>
            <p className="mt-2 text-gray-600">
                Something went wrong. Please try again later.
            </p>
            {/* <a
                href="/"
                className="mt-4 text-blue-600 underline"
            >
                Go back home
            </a> */}
        </div>
    );
}
