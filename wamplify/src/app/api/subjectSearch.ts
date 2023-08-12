import { SearchResult } from '../types/types';
import initialSubjectList from '../utils/Subjects_2023.json'


export function getPredictiveSearch(searchTerm: string, count: number) {
    let matches = initialSubjectList.filter((subject: SearchResult) => {
        return subject.code.toLowerCase().includes(searchTerm.toLowerCase()) || subject.name.toLowerCase().includes(searchTerm.toLowerCase())
      }).slice(0,count);

    return matches;
}