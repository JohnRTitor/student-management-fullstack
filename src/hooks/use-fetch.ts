import { useCallback, useEffect, useState } from "react";

export const useFetch = <T, R = T>(
  url: string,
  options?: RequestInit,
  transform?: (data: T) => R,
  manual?: boolean,
) => {
  const [data, setData] = useState<R | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const execute = useCallback(async (): Promise<R | null> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const rawData: T = await response.json();

      const finalData = transform
        ? transform(rawData)
        : (rawData as unknown as R);

      setData(finalData);
      return finalData;
    } catch (err) {
      console.error("Fetch error:", err);
      setError(err instanceof Error ? err.message : String(err));

      return null;
    } finally {
      setIsLoading(false);
    }
  }, [url, options, transform]);

  useEffect(() => {
    if (manual) return;

    (async () => {
      await execute();
    })();
  }, [execute, manual]);

  return { data, execute, isLoading, error };
};
