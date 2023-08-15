import { Assessment } from "@/app/types/types";

export function calculateSubjectAverage(assessments :Assessment[]) {
    let sum = 0;
    let subjectScore = 0;
    let count = 0;
    assessments.forEach((assessment) => {
        if (assessment.completed && assessment.weight > 0) {
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
            if (!assessment.completed && assessment.weight > 0) {
                subjectScore += average * (assessment.weight/100);
            }
        });
    }
    return subjectScore
}

export function getMaxScore(assessments: Assessment[]) {
    let maxScore = 100;
    let hurdleMet = true;
    assessments.forEach((assessment) => {
        if (assessment.completed && assessment.weight > 0) {
            maxScore -= assessment.weight - (assessment.score * (assessment.weight)/100);
            if (assessment.hurdle && assessment.score < 50) {
                hurdleMet = false;
            }
        }
    });

    return hurdleMet ? maxScore : Math.min(49, maxScore);


}