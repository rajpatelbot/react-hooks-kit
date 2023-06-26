export default function useFetch(url, onSuccess) {
  const c_url = useRef(url);
  const [fetching, setFetching] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);


  const refetch = useCallback(() => {
    const controller = new AbortController();
    (async function () {
      try {
        setFetching(true);
        const res = await fetch(c_url.current, {
          signal: controller.signal,
          headers: {
            
          },
        });
        const data = await res.json();
        if (data) setData(data);
        onSuccess?.(data)
      } catch (err) {
        setError(err);
      } finally {
        setFetching(false);
      }
    })();
    return () => {
      controller.abort();
    };
  }, [])


  useEffect(() => {
    return refetch()
  }, []);

  return { data, fetching, error, refetch };
}
