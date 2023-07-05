import axios, { AxiosError } from 'axios';
import {JSDOM} from 'jsdom';

interface AssessmentItem {
    title: string;
    weight: Number;
    isHurdle: Boolean;
}

interface SubjectEntry {
    title: string;
    code: string;
    assessmentItems: Array<AssessmentItem>;
}

interface Score {
    assessmentItem: AssessmentItem;
    score: Score;
}

async function fetchSubjectPage(url: string) {
    const HTMLData = axios
        .get(url)
        .then(res => res.data)
        .catch((error: AxiosError) => {
            console.error(error.toJSON());
        });

    
    const dom = new JSDOM(await HTMLData);
    return  dom.window.document;
}

 function extractData(document: Document) {
    let assessmentItems : Array<AssessmentItem> = []
    const subjectInfo = document.querySelectorAll(".assessment-details tbody tr");
    subjectInfo.forEach((assessment) => assessmentItems.push(parseAssessmentItem(assessment)));
    return document;
}

function parseAssessmentItem(tableRow : Element) : AssessmentItem {
    const fields = tableRow.querySelectorAll("td")
    let hurdle = fields[0].textContent?.includes("Hurdle") ? true : false;
    let title : string = parseTitle(fields[0])
    console.log("Title: " + title)
    console.log("Hurdle: " + hurdle)
    let weight : number = Number(fields[2].innerHTML.slice(0,-1))/100
    console.log("Weight: " + weight)
    let assessmentItem : AssessmentItem = {title: title, weight: weight, isHurdle: hurdle};
    return assessmentItem
}

function parseTitle(title: Element) : string {
    let text = title.textContent;
    text?.toLowerCase;
    return text ?? "none";
}

async function getAssessmentTable() {
    const url = "https://handbook.unimelb.edu.au/2023/subjects/swen20003/assessment";
    extractData(await fetchSubjectPage(url));
}




getAssessmentTable();