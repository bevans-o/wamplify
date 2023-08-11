export interface Assessment {
    title: string,
    weight: number,
    score: number,
  }
  
export interface Subject {
    name: string,
    code: string,
    assessments: Assessment[],
  }

export interface SearchResult {
    code: string,
    name: string
  }