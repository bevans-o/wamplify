import { JSDOM } from "jsdom";
import axios, { AxiosError } from "axios";
import { NextResponse } from "next/server";
import { StudyPeriod, StudyPeriodUrls } from "@/app/types/types";

let SUBJECTS = new Set<String>();
let REPEATS = new Set<String>();
export async function GET() {
  const response = await getSubjectList();

  return NextResponse.json(response);
}

async function fetchSubjectsPage(url: string) {
  const HTMLData = axios
    .get(url)
    .then((res: { data: any }) => res.data)
    .catch((error: AxiosError) => {
      console.error(error.toJSON());
    });

  const dom = new JSDOM(await HTMLData);

  return dom.window.document;
}

function getNumPages(document: Document) {
  // get the number of pages returned
  const numPagesText = document.querySelector(".search-results__paginate > span")?.innerHTML;
  let numPages = 0;
  if (numPagesText != "") {
    numPages = Number(numPagesText?.split(" ")[1]);
  }
  return numPages;
}

function subjectCheck(code: String): boolean {
  if (SUBJECTS.has(code)) {
    if (!REPEATS.has(code)) {
      REPEATS.add(code);
    }
    return false;
  } else {
    SUBJECTS.add(code);
    return true;
  }
}

function getSubjects(document: Document) {
  const list = document.querySelectorAll(".search-results__list > li");
  let result = Array();
  for (let i = 0; i < list.length; i++) {
    let subjectName = list[i].querySelector(".search-result-item__name > h3")?.innerHTML;
    let subjectCode = list[i].querySelector(".search-result-item__code")?.innerHTML;
    if (subjectCheck(subjectCode ?? "none")) {
      result.push({ name: subjectName, code: subjectCode });
    }
  }
  return result;
}

function buildUrl(semesterSubstring: any, year: Number, page: Number) {
  const handbookUrl =
    "https://handbook.unimelb.edu.au/search?types%5B%5D=subject&year=" +
    year.toString() +
    "" +
    semesterSubstring +
    "" +
    page.toString() +
    "&sort=_score%7Cdesc";
  return handbookUrl;
}

function getUrls(): Array<keyof typeof StudyPeriod> {
  let values = Array();
  (Object.keys(StudyPeriod) as Array<keyof typeof StudyPeriod>).forEach((element: keyof typeof StudyPeriod) => {
    let key: keyof typeof StudyPeriod = element;
    values.push(StudyPeriodUrls[key]);
  });
  return values;
}

async function getSubjectList() {
  const year = new Date().getFullYear();

  let subjectsList = Array();
  let values = getUrls();

  for (const url in values) {
    let pageNum = 1;
    let handbookUrl = buildUrl(values[url], year, pageNum);
    let document = await fetchSubjectsPage(handbookUrl);
    const numPages = getNumPages(document);
    subjectsList = subjectsList.concat(getSubjects(document));
    pageNum++;
    while (pageNum <= numPages) {
      console.log(`Page ${pageNum}/${numPages}`);
      handbookUrl = buildUrl(values[url], year, pageNum);
      subjectsList = subjectsList.concat(getSubjects(await fetchSubjectsPage(handbookUrl)));
      pageNum++;
    }
  }

  return subjectsList;
}
