import { NextApiRequest } from "next";

export interface Assessment {
  title: string;
  weight: number;
  hurdle: boolean;
  score: number;
  completed: boolean;
  desiredScore?: number;
}

export interface AssessmentSet {
  period: "none" | string;
  assessments: Assessment[];
}

export interface Subject {
  id?: string;
  name: string;
  code: string;
  assessmentSets: AssessmentSet[];
  activeStudyPeriod: number;
  credits: number;
  assessments?: Assessment[]; // for backwards compatibility
  targetScore: number;
}

export interface SearchResult {
  code: string;
  name: string;
}

export interface SubjectInfoRequest extends NextApiRequest {
  body: {
    subject: SearchResult;
  };
}

export enum StudyPeriod {
  SEM_ONE,
  SEM_TWO,
  YEAR_LONG,
  TEACHING_START,
  TEACHING_END,
  SUMMER,
  WINTER,
  MONTHLY,
  SCHOOL_TERM,
}

export const StudyPeriodUrls = {
  SEM_ONE:
    "&subject_level_type%5B%5D=all&study_periods%5B%5D=semester_1&study_periods%5B%5D=semester_1_%28early-start%29&study_periods%5B%5D=semester_1_%28extended%29&area_of_study%5B%5D=all&org_unit%5B%5D=all&campus_and_attendance_mode%5B%5D=all&page=",
  SEM_TWO:
    "&subject_level_type%5B%5D=all&study_periods%5B%5D=semester_2&study_periods%5B%5D=semester_2_%28early-start%29&study_periods%5B%5D=semester_2_%28extended%29&area_of_study%5B%5D=all&org_unit%5B%5D=all&campus_and_attendance_mode%5B%5D=all&page=",
  YEAR_LONG:
    "&subject_level_type%5B%5D=all&study_periods%5B%5D=year_long&study_periods%5B%5D=year_long_%28extended%29&area_of_study%5B%5D=all&org_unit%5B%5D=all&campus_and_attendance_mode%5B%5D=all&page=",
  TEACHING_START:
    "&subject_level_type%5B%5D=all&study_periods%5B%5D=march%7Cjanuary%7Capril%7Cfebruary%7Cmay%7Cjune%7Csemester_1%7Csemester_1_%28early_start%29%7Csemester_1_%28extended%29%7Cyear_long%7Cyear_long_%28extended%29%7Cterm_1%7Cterm_2%7Csummer_term&area_of_study%5B%5D=all&org_unit%5B%5D=all&campus_and_attendance_mode%5B%5D=all&page=",
  TEACHING_END:
    "&subject_level_type%5B%5D=all&study_periods%5B%5D=july%7Cnovember%7Coctober%7Caugust%7Cseptember%7Cdecember%7Csemester_2%7Csemester_2_%28early-start%29%7Csemester_2_%28extended%29%7Cterm_3%7Cterm_4%7Cwinter_term&area_of_study%5B%5D=all&org_unit%5B%5D=all&campus_and_attendance_mode%5B%5D=all&page=",
  SUMMER:
    "&subject_level_type%5B%5D=all&study_periods%5B%5D=summer_term&area_of_study%5B%5D=all&org_unit%5B%5D=all&campus_and_attendance_mode%5B%5D=all&page=",
  WINTER:
    "&subject_level_type%5B%5D=all&study_periods%5B%5D=winter_term&area_of_study%5B%5D=all&org_unit%5B%5D=all&campus_and_attendance_mode%5B%5D=all&page=",
  MONTHLY:
    "&subject_level_type%5B%5D=all&study_periods%5B%5D=december&study_periods%5B%5D=november&study_periods%5B%5D=october&study_periods%5B%5D=september&study_periods%5B%5D=august&study_periods%5B%5D=july&study_periods%5B%5D=june&study_periods%5B%5D=may&study_periods%5B%5D=april&study_periods%5B%5D=march&study_periods%5B%5D=february&study_periods%5B%5D=january&area_of_study%5B%5D=all&org_unit%5B%5D=all&campus_and_attendance_mode%5B%5D=all&page=",
  SCHOOL_TERM:
    "&subject_level_type%5B%5D=all&study_periods%5B%5D=term_1&study_periods%5B%5D=term_2&study_periods%5B%5D=term_3&study_periods%5B%5D=term_4&area_of_study%5B%5D=all&org_unit%5B%5D=all&campus_and_attendance_mode%5B%5D=all&page=",
};
