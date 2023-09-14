import axios, { AxiosError } from 'axios';
import {JSDOM} from 'jsdom';
import { Assessment, SearchResult, Subject, SubjectInfoRequest } from '../../types/types';
import { NextResponse } from 'next/server';


export async function POST(req: Request, res: Response) {
    const request = await req.json();

    const response = await getSubjectInfo(request);

    return NextResponse.json(response);

}

async function fetchSubjectPage(url: string) {
    const HTMLData = axios
        .get(url)
        .then((res: { data: any; }) => res.data)
        .catch((error: AxiosError) => {
            console.error(error.toJSON());
        });
    //console.log(await HTMLData)
    const dom = new JSDOM(await HTMLData);

    return  dom.window.document;
}

 function extractData(document: Document) {
    let assessmentItems : Array<Assessment> = []
    const assessmentTable = document.querySelector(".assessment-details")
    const subjectInfo = assessmentTable?.querySelectorAll("tbody tr");
    let totalWeight = 0;
    subjectInfo?.forEach((assessment) => {
        const assessmentItem = parseAssessment(assessment);
        if (totalWeight <= 100 - assessmentItem.weight) {
            assessmentItems.push(assessmentItem)
            totalWeight += assessmentItem.weight;
        }
    });
    return assessmentItems;
}

function extractCredits(document: Document) {
    const creditTitle = document.querySelector(".header--course-and-subject__details")?.querySelectorAll("span")
    const creditString = creditTitle ? creditTitle[1].innerHTML.split(" ") : ["12.5"]
    const credits = creditString[creditString.length - 1]
    return parseFloat(credits)
}


function parseAssessment(tableRow : Element) : Assessment {
    const fields = tableRow.querySelectorAll("td")
    let hurdle = fields[0].textContent?.includes("Hurdle") ? true : false ;
    let title : string = parseTitle(fields[0].querySelector("p") ?? fields[0]);
    let weight : number = parseInt(fields[2].innerHTML.slice(0,-1));
    if (isNaN(weight)) { weight = 0}
    let assessmentItem : Assessment = {title: title, weight: weight, hurdle: hurdle, score: 0, completed: false};
    return assessmentItem
}

function parseTitle(title: Element) : string {
    let text = title.textContent;
    let sentences = text?.split(".") ?? "none";
    return sentences[0];
}

async function getSubjectInfo(subject: SearchResult) : Promise<Subject> {
    const AssessmentUrl = "https://handbook.unimelb.edu.au/2023/subjects/" + subject.code +"/assessment";
    const CreditsUrl = "https://handbook.unimelb.edu.au/2023/subjects/" + subject.code;
    let assessments = extractData(await fetchSubjectPage(AssessmentUrl));
    let credits = extractCredits(await fetchSubjectPage(CreditsUrl));
    let result : Subject = {
        name : subject.name,
        code : subject.code,
        assessments : assessments,
        credits : credits,
    }
    return result
}
