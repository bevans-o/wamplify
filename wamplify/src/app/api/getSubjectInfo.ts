import axios, { AxiosError } from 'axios';
import {JSDOM} from 'jsdom';

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
    const subjectInfo = document.querySelectorAll(".assessment-details tr");
    subjectInfo.forEach((assessment) => console.log(assessment.outerHTML));
    return document;
}

export async function getAssessmentTable() {
    const url = "https://handbook.unimelb.edu.au/2023/subjects/swen20003/assessment";
    extractData(await fetchSubjectPage(url));
}

getAssessmentTable();