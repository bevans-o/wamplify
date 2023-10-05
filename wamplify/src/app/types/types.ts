import { NextApiRequest } from "next"

export interface Assessment {
    title: string,
    weight: number,
    hurdle: boolean,
    score: number,
    completed: boolean,
    desiredScore?: number,
}
  
export interface Subject {
    id?: string,
    name: string,
    code: string,
    assessments: Assessment[],
    credits: number,
    targetScore: number,
  }

export interface SearchResult {
    code: string,
    name: string
  }

export interface SubjectInfoRequest extends NextApiRequest {
  body: {
    subject: SearchResult
  }
}