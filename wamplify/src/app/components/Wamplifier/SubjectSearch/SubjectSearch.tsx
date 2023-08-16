import React, { useEffect, useState } from 'react'
import search from './search.module.css'
import { SearchResult } from '@/app/types/types';
import { getPredictiveSearch } from '@/app/api/subjectSearch';

interface SubjectSearchProps {
  id: string,
  onSelect: Function,
  resultLimit?: number
}

function SubjectSearch({id, onSelect, resultLimit=6} : SubjectSearchProps) {
  const [focused, setFocused] = useState(false);
  const [value, setValue] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);

  useEffect(() => {
    const subjectSearch : HTMLElement | null = document.querySelector(`#SubjectSearch--${id}`);
    const subjectSearchInput : HTMLElement | null = document.querySelector(`#SubjectSearch--${id} input`);

    // ensure that dropdown elements receive click events by manually handling focus
    subjectSearchInput?.addEventListener("focusin", () => {
      setFocused(true);
    })

    // make sure focus is leaving the subject list before blurring
    subjectSearchInput?.addEventListener("focusout", (event) => {
      if (!subjectSearch?.contains(event.relatedTarget as HTMLElement)) {
        setTimeout(() => setFocused(false), 200)
      }
    })

  }, [id])

  function onResultClick(result: SearchResult) {
    const subjectSearchInput : HTMLElement | null = document.querySelector(`#SubjectSearch--${id} input`);

    subjectSearchInput?.setAttribute('disabled', 'disabled');
    onSelect(result);
    setFocused(false);
  }

  function onSearchChange(event: React.SyntheticEvent) {
    let subjectInput = event.target as HTMLInputElement;
    setValue(subjectInput.value);
    setResults(getPredictiveSearch(subjectInput.value, resultLimit))
  }


  return (
    <label className={`${search.search} ${(focused ? search.focused : "")}`} id={`SubjectSearch--${id}`}>
      <input
        onChange={(event) => onSearchChange(event)}
        value={value}
        placeholder="Search for a subject or subject code."
        className={((results.length == 0 && value != "") ? search.noResults : "")}
      />

      {results.length != 0 && value != "" &&
      <ul className={search.results}>
      {results?.map((result : SearchResult, index : number) =>
        <li tabIndex={-1} onClick={(event) =>  { onResultClick(result) }} className={search.result} key={index}>
            <h3>{result.name}</h3>
            <p>{result.code}</p>
        </li>
      )}
      </ul>}
    </label>
  )
}

export default SubjectSearch
