import { useCallback, useEffect, useState } from "react";

type ExecuteParams<T, R> = {
  url?: string;
  options?: RequestInit;
  transform?: (data: T) => R;
};

export const useFetch = <T, R = T>(
  defaultUrl: string,
  defaultOptions?: RequestInit,
  defaultTransform?: (data: T) => R,
  manual = false,
) => {
  const [data, setData] = useState<R | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const execute = useCallback(
    async (params?: ExecuteParams<T, R>): Promise<R | null> => {
      const finalUrl = params?.url ?? defaultUrl;

      const finalOptions: RequestInit = {
        ...defaultOptions,
        ...params?.options,
        headers: {
          ...(defaultOptions?.headers || {}),
          ...(params?.options?.headers || {}),
        },
      };

      const finalTransform = params?.transform ?? defaultTransform;

      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(finalUrl, finalOptions);

        if (!response.ok) {
          const errorData = await response.text();
          console.error("API Error Response:", errorData);
          throw new Error(
            `HTTP error! status: ${response.status} - ${errorData}`,
          );
        }

        const rawData: T = await response.json();

        const finalData = finalTransform
          ? finalTransform(rawData)
          : (rawData as unknown as R);

        setData(finalData);
        return finalData;
      } catch (err) {
        console.error("Fetch error:", err);
        const message = err instanceof Error ? err.message : String(err);

        setError(message);
        return null;
      } finally {
        setIsLoading(false);
      }
    },
    [defaultUrl, defaultOptions, defaultTransform],
  );

  useEffect(() => {
    if (manual) return;

    (async () => {
      await execute();
    })();
  }, [execute, manual]);

  return { data, execute, isLoading, error };
};
