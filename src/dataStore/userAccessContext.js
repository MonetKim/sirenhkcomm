//import userReducer from "./dataStore/reducer.js";

export function useAsync(callback, deps = [], skip = false) {
  const [state, dispatch] = userReducer(reducer, {
    loading: false,
    data: null,
    error: null,
  });

  const fetchData = useCallback(async () => {
    dispatch({ type: 'LOADING' });
    try {
      const data = await callback();
      dispatch({ type: 'SUCCESS', data });
    } catch (e) {
      dispatch({ type: 'ERROR', error: e });
    }
  }, [callback]);

  useEffect(() => {
    if (skip) return;
    fetchData();
    //eslint-disable-next-line
  }, deps);

  return [state, fetchData];
}