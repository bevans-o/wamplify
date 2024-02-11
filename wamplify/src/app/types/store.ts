import { splitAtom, atomWithStorage } from 'jotai/utils'
import { Subject, Assessment, StudyPeriod } from './types'
import { PrimitiveAtom, atom } from 'jotai'
import generateID from '../lib/functions/generateId'

//simple atoms for wamometer
export const currentWam = atomWithStorage('currentWam', '')
export const unitsCompleted = atomWithStorage('unitsCompleted', '')

//subject list related atoms
// update default in sem 2
const emptySubject = {name: "", code: "", assessmentSets: [], activeStudyPeriod: 0, credits: 0, targetScore: 50}
export const newSubjectAtom = atom<Subject>(emptySubject);
export const subjectsAtom = atomWithStorage<Subject[]>('subjects', []);

const addSubject = (subjects: Subject[]) : Subject[] => [
    ...subjects,
    {...emptySubject, id: generateID(32)},
];

const updateSubject = (subjects: Subject[], updatedSubject: Subject): Subject[] => 
    subjects.map((subject) => {
        if (subject.id === updatedSubject.id) {
            return {...updatedSubject}
        } else {
            return {...subject}
        }
    }
    )

const removeSubject = (subjects: Subject[], id: string)  : Subject[] => 
    subjects.filter((subject) => subject.id !== id);

export const addSubjectAtom = atom(() => 
    "", (get, set) => {
        set(subjectsAtom, addSubject(get(subjectsAtom)));
    }
);

export const removeSubjectAtom = atom(() => "",
(get, set, id: string) => {
    set(subjectsAtom, removeSubject(get(subjectsAtom), id))
})

export const updateSubjectAtom = atom(() => "",
(get, set, updatedSubject : Subject) => set(subjectsAtom, updateSubject(get(subjectsAtom), updatedSubject)))