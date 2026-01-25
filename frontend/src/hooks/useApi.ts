import { useState, useCallback } from "react";
import api from "../lib/axios";

type HttpMethod = "GET" | "POST" | "PATCH" | "DELETE";

interface UseApiOptions<T> {
    onSuccess?: (data: T) => void;
    onError?: (error: string) => void;
}

export function useApi<T = unknown>() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const request = useCallback(
        async (
            method: HttpMethod,
            url: string,
            payload?: unknown,
            options?: UseApiOptions<T>
        ): Promise<T | null> => {
            setLoading(true);
            setError(null);

            try {
                let response;

                switch (method) {
                    case "GET":
                        response = await api.get<T>(url);
                        break;

                    case "POST":
                        response = await api.post<T>(url, payload);
                        break;

                    case "PATCH":
                        response = await api.patch<T>(url, payload);
                        break;

                    case "DELETE":
                        response = await api.delete<T>(url);
                        break;

                    default:
                        throw new Error("Unsupported HTTP method");
                }

                const data = response.data;
                options?.onSuccess?.(data);

                return data;
            } catch (err: any) {
                const message =
                    err?.response?.data?.message ||
                    err?.message ||
                    "Something went wrong";

                setError(message);
                options?.onError?.(message);

                return null;
            } finally {
                setLoading(false);
            }
        },
        []
    );

    return {
        request,
        loading,
        error,
    };
}
