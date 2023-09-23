import { atomWithStorage } from 'jotai/utils'


export const subjects = atomWithStorage('subjects', []) 
export const currentWam = atomWithStorage('currentWam', '')
export const unitsCompleted = atomWithStorage('unitsCompleted', '') 