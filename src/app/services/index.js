import axios from "axios";
import useSwr from "swr";
import { baseURL } from "../utils/baseURL";

export const useRequest = (path) => {
  if (!path) {
    throw new Error("Path is required");
  }
  const fetcher = (...args) => axios.get(...args).then((res) => res.data);
  const url = `${baseURL}${path}`;
  const { data, error } = useSwr(url, fetcher);

  return { data, error, isLoading: !data && !error };
};
export default useRequest;
