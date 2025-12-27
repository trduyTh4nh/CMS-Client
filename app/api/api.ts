type FetchOptions = RequestInit & {
    next?: {
        revalidate?: number;
        tags?: string[];
    }
}

const BASE_URL = process.env.BACKEND_URL || '';


export async function apiFetch<T>(path: string, options?: FetchOptions): Promise<T> {
    const res = await fetch(`${BASE_URL}${path}`, {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...options?.headers,
        },
    });


    if(!res.ok) {
        const errorData = await res.text();

        throw new Error(errorData || 'Something went wrong');
    }
    return res.json();

}