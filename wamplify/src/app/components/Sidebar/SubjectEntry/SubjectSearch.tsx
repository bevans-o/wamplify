import React from 'react'
import entry from './entry.module.css'

interface SearchResult {
  name: string,
  code: string
}

function SubjectSearch({value, onChange, onSelect} : any) {
  const predictiveSearch : SearchResult[] = [
    {
      name: "Advanced Studies in Computing",
      code: "COMP30013"
    },
    {
      name: "Graphics and Interaction",
      code: "COMP30019"
    },
    {
      name: "IT Project",
      code: "COMP30022"
    },
    {
      name: "Declarative Programming",
      code: "COMP30020"
    }
  ]

  return (
    <label className={entry.search}>
      <input onChange={(event) => onChange(event)} value={value} placeholder="Search for a subject or subject code."/>
      
      {value != "" && 
      <ul className={entry.search__results}>
      {predictiveSearch?.map((result, index) => 
        <li onClick={() => onSelect(result.code)} className={entry.search__result} key={index}>
        <h3>{result.name}</h3>
        <p>{result.code}</p>
        </li>
      )}
      </ul>}

    </label>
  )
}

export default SubjectSearch