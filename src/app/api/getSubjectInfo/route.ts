import axios, { AxiosError } from "axios";
import { JSDOM } from "jsdom";
import { Assessment, AssessmentSet, SearchResult, Subject } from "../../types/types";
import { NextResponse } from "next/server";

export async function POST(req: Request, res: Response) {
  const request = await req.json();

  const response = await getSubjectInfo(request);

  return NextResponse.json(response);
}

async function fetchSubjectPage(url: string) {
  const HTMLData = axios
    .get(url)
    .then((res: { data: any }) => res.data)
    .catch((error: AxiosError) => {
      console.error(error.toJSON());
    });

  const dom = new JSDOM(await HTMLData);

  return dom.window.document;
}

function extractData(document: Document) {
  let assessmentSets: Array<AssessmentSet> = [];
  let studyPeriodTitles = document.querySelectorAll(".assessment-table > h3");
  let studyPeriods: Array<string | null> = [];
  studyPeriodTitles.forEach((title) => {
    studyPeriods.push(title.textContent);
  });

  if (studyPeriods.length == 0) {
    studyPeriods = ["none"];
  }
  const assessmentTable = document.querySelectorAll(".assessment-details");

  assessmentTable.forEach((assessmentTable, index) => {
    assessmentSets.push({
      period: studyPeriods[index] ?? "none",
      assessments: getAssessments(assessmentTable),
    });
  });

  return assessmentSets;
}

function getAssessments(table: Element): Array<Assessment> {
  const assessmentItems: Array<Assessment> = [];
  const subjectInfo = table?.querySelectorAll("tbody tr");
  let totalWeight = 0;
  subjectInfo?.forEach((assessment) => {
    const assessmentItem = parseAssessment(assessment);
    if (totalWeight <= 100 - assessmentItem.weight) {
      assessmentItems.push(assessmentItem);
      totalWeight += assessmentItem.weight;
    }
  });
  return assessmentItems;
}

function extractCredits(document: Document) {
  const creditTitle = document.querySelector(".header--course-and-subject__details")?.querySelectorAll("span");
  const creditString = creditTitle ? creditTitle[1].innerHTML.split(" ") : ["12.5"];
  const credits = creditString[creditString.length - 1];
  return parseFloat(credits);
}

function parseAssessment(tableRow: Element): Assessment {
  const fields = tableRow.querySelectorAll("td");
  let hurdle = fields[0].textContent?.includes("Hurdle") ? true : false;
  let title: string = parseTitle(fields[0].querySelector("p") ?? fields[0]);
  let weight: number = parseInt(fields[2].innerHTML.slice(0, -1));
  if (isNaN(weight)) {
    weight = 0;
  }
  let assessmentItem: Assessment = {
    title: title,
    weight: weight,
    hurdle: hurdle,
    score: 0,
    completed: false,
  };
  return assessmentItem;
}

function parseTitle(title: Element): string {
  let text = title.textContent;
  let sentences = text?.split(".") ?? "none";
  return sentences[0];
}

async function getSubjectInfo(subject: SearchResult): Promise<Subject> {
  const year = new Date().getFullYear();
  const assessmentUrl = `https://handbook.unimelb.edu.au/${year}/subjects/${subject.code}/assessment`;
  const overviewUrl = `https://handbook.unimelb.edu.au/${year}/subjects/${subject.code}`;
  const subjectOverview = await fetchSubjectPage(overviewUrl);
  let assessmentSets = extractData(await fetchSubjectPage(assessmentUrl));
  let credits = extractCredits(subjectOverview);
  let result: Subject = {
    name: subject.name,
    code: subject.code,
    activeStudyPeriod: 0,
    assessmentSets: assessmentSets,
    credits: credits,
    targetScore: 50,
  };
  return result;
}
