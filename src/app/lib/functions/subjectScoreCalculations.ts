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
    assessments.forEach((assessment) => {
        if (assessment.completed && assessment.weight > 0) {
            maxScore -= assessment.weight - (assessment.score * (assessment.weight)/100);
        }
    });

    return maxScore;


}

export function getRemainingTarget(assessments: Assessment[], targetScore: number) {
    let maxScore = targetScore
    assessments.forEach((assessment) => {
        if (assessment.completed && assessment.weight > 0) {
            maxScore -= assessment.score * (assessment.weight/100)
        }
    })

    return Math.max(maxScore, 0);
}