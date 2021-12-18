import { useState } from "react";
import axios from "axios";

const BACKEND_URL = "http://localhost:5000";

export const useSearch = (): [
  string,
  any[],
  (query: string, secured?: boolean) => Promise<void>
] => {
  const [results, setResults] = useState([]);
  const [queryString, setQueryString] = useState("");

  const search = async (query: string, secured: boolean = false) => {
    if (!query) {
      setResults([]);
    } else {
      const searchResults = await axios.get(
        `${BACKEND_URL}/${secured ? "secured-search" : "search"}`,
        {
          params: {
            query,
          },
        }
      );
      setQueryString(searchResults.data.query);
      setResults(searchResults.data.data);
    }
  };

  return [queryString, results, search];
};
