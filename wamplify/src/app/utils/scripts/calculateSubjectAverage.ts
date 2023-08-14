import { Assessment } from "@/app/types/types";
import { EscalatorSharp } from "@mui/icons-material";

export default function calculateSubjectAverage(assessments :Assessment[]) {
    let sum = 0;
    let subjectScore = 0;
    let count = 0;
    assessments.forEach((assessment) => {
        if (assessment.completed) {
            subjectScore += assessment.score * (assessment.weight/100);
            sum += assessment.score
            count += 1;
        }
    });
    if (count == 0) {
        return 100;
    }
    else {
        let average = sum/count;
        assessments.forEach((assessment) => {
            if (!assessment.completed) {
                subjectScore += average * (assessment.weight/100);
            }
        });
    }
    return subjectScore
}