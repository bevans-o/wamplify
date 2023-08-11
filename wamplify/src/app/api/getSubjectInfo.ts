import axios, { AxiosError } from 'axios';
import {JSDOM} from 'jsdom';
import { Assessment } from '../types/types';


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
    return document;
}

function parseAssessment(tableRow : Element) : Assessment {
    const fields = tableRow.querySelectorAll("td")
    let hurdle = fields[0].textContent?.includes("Hurdle");
    let title : string = parseTitle(fields[0])
    console.log("Title: " + title)
    console.log("Hurdle: " + hurdle)
    let weight : number = Number(fields[2].innerHTML.slice(0,-1));
    console.log("Weight: " + weight)
    let assessmentItem : Assessment = {title: title, weight: weight, score: -1};
    return assessmentItem
}

function parseTitle(title: Element) : string {
    let text = title.textContent;
    let sentences = text?.split(".") ?? "none";
    return sentences[0];
}

export async function getAssessments(subjectCode: string) {
    const url = "https://handbook.unimelb.edu.au/2023/subjects/" + subjectCode +"/assessment";
    extractData(await fetchSubjectPage(url));
}
