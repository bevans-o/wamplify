import React, { useEffect, useState } from 'react'
import entry from './entry.module.css'


function SubjectSearch({value, onChange, onSelect, id, searchResults} : any) {
  const [focused, setFocused] = useState(false);
  
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
        setFocused(false);
      }
    })
    
  }, [])

  function onResultClick(code: string) {
    const subjectEntry : HTMLElement | null = document.querySelector(`#SubjectEntry--${id}`);
    const subjectSearchInput : HTMLElement | null = document.querySelector(`#SubjectSearch--${id} input`);

    subjectSearchInput?.setAttribute('disabled', 'disabled');
    onSelect(code);
    setFocused(false);
  }
  

  return (
    <label className={entry.search} id={`SubjectSearch--${id}`} data-focus={focused}>
      <input 
        onChange={(event) => onChange(event)}
        value={value} 
        placeholder="Search for a subject or subject code."
      />
      
      {value != "" && 
      <ul className={entry.search__results}>
      {searchResults?.map((result, index: number) => 
        <li tabIndex={-1} onClick={() => onResultClick(result.code)} className={entry.search__result} key={index}>
          <h3>{result.name}</h3>
          <p>{result.code}</p>
        </li>
      )}
      </ul>}

    </label>
  )
}

export default SubjectSearch