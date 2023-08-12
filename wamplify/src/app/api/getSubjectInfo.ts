import axios, { AxiosError } from 'axios';
import {JSDOM} from 'jsdom';
import { Assessment, SearchResult, Subject } from '../types/types';


async function fetchSubjectPage(url: string) {
    const HTMLData = axios
        .get(url)
        .then((res: { data: any; }) => res.data)
        .catch((error: AxiosError) => {
            console.error(error.toJSON());
        });

    
    const dom = new JSDOM(await HTMLData);
    return  dom.window.document;
}

 function extractData(document: Document) {
    let assessmentItems : Array<Assessment> = []
    const subjectInfo = document.querySelectorAll(".assessment-details tbody tr");
    subjectInfo.forEach((assessment) => assessmentItems.push(parseAssessment(assessment)));
    return assessmentItems;
}

function parseAssessment(tableRow : Element) : Assessment {
    const fields = tableRow.querySelectorAll("td")
    let hurdle = fields[0].textContent?.includes("Hurdle");
    let title : string = parseTitle(fields[0])

    let weight : number = Number(fields[2].innerHTML.slice(0,-1));
    let assessmentItem : Assessment = {title: title, weight: weight};
    return assessmentItem
}

function parseTitle(title: Element) : string {
    let text = title.textContent;
    let sentences = text?.split(".") ?? "none";
    return sentences[0];
}

export async function getSubjectInfo(subject: SearchResult) : Promise<Subject> {
    const url = "https://handbook.unimelb.edu.au/2023/subjects/" + subject.code +"/assessment";
    let assessments = extractData(await fetchSubjectPage(url));
    let result : Subject = {
        name : subject.name,
        code : subject.code,
        assessments : assessments
    }
    return result
}
