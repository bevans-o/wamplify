import { NextApiRequest } from "next"

export interface Assessment {
    title: string,
    weight: number,
    hurdle: boolean,
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

export interface SubjectInfoRequest extends NextApiRequest {
  body: {
    subject: SearchResult
  }
}