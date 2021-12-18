import { useEffect, useState, useRef } from "react";
import { OverlayProvider } from "./context/OverlayContext";
import { injectionExamples } from "./examples";

import { useSearch } from "./hooks";
import { SearchIcon } from "./icons";
import { ResultTable, Sidebar } from "./components";

import "./styles/app.css";

export const App = () => {
  const [query, results, search] = useSearch();
  const [inputValue, setInputValue] = useState("");
  const exampleStep = useRef(0);

  useEffect(() => {
    console.log(results);
  }, [results]);

  const submit = (secured: boolean = false) => {
    search(inputValue, secured);
  };

  const generateExample = () => {
    const randomExample = injectionExamples[exampleStep.current];
    exampleStep.current = (exampleStep.current + 1) % injectionExamples.length;
    setInputValue(randomExample);
  };

  return (
    <OverlayProvider>
      <div className="container font-mono w-full h-full max-w-full p-28  justify-start flex flex-wrap flex-col bg-[url('/static/background.jpeg')] bg-cover text-center relative">
        <Sidebar onGeneration={generateExample} />
        <p className="mb-12 text-2xl subpixel-antialiased font-medium leading-loose tracking-wide text-white">
          🍆 INJECT ME 💦
        </p>
        <div className="w-full items-center rounded-full overflow-hidden flex shadow-md px-4 py-2 bg-white">
          <SearchIcon />
          <input
            className="h-8 ml-2 grow focus-visible:outline-none"
            value={inputValue}
            onChange={(e) => setInputValue(e.currentTarget.value)}
          />
        </div>
        <div className="flex justify-center my-8">
          <button
            className="mx-4 py-2 px-4 rounded-full bg-blue-400 hover:bg-blue-500 hover:shadow-md transition-all text-white text-lg"
            onClick={() => submit()}
          >
            Unsecured search
          </button>
          <button
            className="mx-4 py-2 px-4 rounded-full bg-blue-400 hover:bg-blue-500 hover:shadow-md transition-all text-white text-lg"
            onClick={() => submit(true)}
          >
            Secured search
          </button>
        </div>
        <ResultTable results={results} />
      </div>
    </OverlayProvider>
  );
};
