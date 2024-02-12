import { calculateSubjectAverage, getMaxScore, getRemainingTarget } from "./subjectScoreCalculations"
import { Assessment } from "@/app/types/types";

describe('calculateSubjectAverage', () => {
  it('should return 100 when there are no completed assessments', () => {
    const assessments: Assessment[] = [
      { title: 'Assessment 1', weight: 20, hurdle: false, score: 0, completed: false },
      { title: 'Assessment 2', weight: 30, hurdle: false, score: 0, completed: false },
      { title: 'Assessment 3', weight: 50, hurdle: false, score: 0, completed: false },
    ];

    const result = calculateSubjectAverage(assessments);

    expect(result).toBe(100);
  });

  it('should calculate the subject average correctly with completed assessments', () => {
    const assessments: Assessment[] = [
      { title: 'Assessment 1', weight: 20, hurdle: false, score: 80, completed: true },
      { title: 'Assessment 2', weight: 30, hurdle: false, score: 90, completed: true },
      { title: 'Assessment 3', weight: 50, hurdle: false, score: 75, completed: true },
    ];

    const result = calculateSubjectAverage(assessments);

    // The expected average is (20% * 80 + 30% * 90 + 50% * 75) = 80.5
    expect(result).toBe(80.5);
  });

  it('should handle assessments with zero weight', () => {
    const assessments: Assessment[] = [
      { title: 'Assessment 1', weight: 0, hurdle: false, score: 80, completed: true },
      { title: 'Assessment 2', weight: 30, hurdle: false, score: 90, completed: true },
      { title: 'Assessment 3', weight: 0, hurdle: false, score: 75, completed: true },
    ];

    const result = calculateSubjectAverage(assessments);

    // Only Assessment 2 contributes to the average: (30% * 90) = 27
    expect(result).toBe(27);
  });

  it('should handle assessments with incomplete status', () => {
    const assessments: Assessment[] = [
      { title: 'Assessment 1', weight: 20, hurdle: false, score: 80, completed: true },
      { title: 'Assessment 2', weight: 30, hurdle: false, score: 90, completed: false },
      { title: 'Assessment 3', weight: 50, hurdle: false, score: 75, completed: true },
    ];

    const result = calculateSubjectAverage(assessments);

    // The expected average is (20% * 80 + 50% * 75 + 30% * average_of_completed) = 71.25
    expect(result).toBe(76.75);
  });
});

describe('getMaxScore', () => {
    it('should return 100 when there are no completed assessments', () => {
      const assessments: Assessment[] = [
        { title: 'Assessment 1', weight: 20, hurdle: false, score: 0, completed: false },
        { title: 'Assessment 2', weight: 30, hurdle: false, score: 0, completed: false },
        { title: 'Assessment 3', weight: 50, hurdle: false, score: 0, completed: false },
      ];
  
      const result = getMaxScore(assessments);
  
      expect(result).toBe(100);
    });
  
    it('should calculate the maximum possible score correctly with completed assessments', () => {
      const assessments: Assessment[] = [
        { title: 'Assessment 1', weight: 20, hurdle: false, score: 80, completed: true },
        { title: 'Assessment 2', weight: 30, hurdle: false, score: 90, completed: true },
        { title: 'Assessment 3', weight: 50, hurdle: false, score: 75, completed: true },
      ];
  
      const result = getMaxScore(assessments);
  
      // The expected maximum possible score is (100 - (20% * 80 + 30% * 90 + 50% * 75)) = 17.5
      expect(result).toBe(80.5);
    });
  
    it('should handle assessments with zero weight', () => {
      const assessments: Assessment[] = [
        { title: 'Assessment 1', weight: 0, hurdle: false, score: 80, completed: true },
        { title: 'Assessment 2', weight: 30, hurdle: false, score: 90, completed: true },
        { title: 'Assessment 3', weight: 0, hurdle: false, score: 75, completed: true },
      ];
  
      const result = getMaxScore(assessments);
  
      // Only Assessment 2 contributes to the maximum possible score: (100 - (30% * 90)) = 73
      expect(result).toBe(97);
    });
  
    it('should handle assessments with incomplete status', () => {
      const assessments: Assessment[] = [
        { title: 'Assessment 1', weight: 20, hurdle: false, score: 80, completed: true },
        { title: 'Assessment 2', weight: 30, hurdle: false, score: 90, completed: false },
        { title: 'Assessment 3', weight: 50, hurdle: false, score: 75, completed: true },
      ];
  
      const result = getMaxScore(assessments);
  
      // The expected maximum possible score is (100 - (20% * 80 + 50% * 75)) = 70
      expect(result).toBe(83.5);
    });
  });


  describe('getRemainingTarget', () => {
    it('should return the target score when there are no completed assessments', () => {
      const assessments: Assessment[] = [
        { title: 'Assessment 1', weight: 20, hurdle: false, score: 0, completed: false },
        { title: 'Assessment 2', weight: 30, hurdle: false, score: 0, completed: false },
        { title: 'Assessment 3', weight: 50, hurdle: false, score: 0, completed: false },
      ];
  
      const targetScore = 80;
      const result = getRemainingTarget(assessments, targetScore);
  
      expect(result).toBe(targetScore);
    });
  
    it('should calculate the remaining target score correctly with completed assessments', () => {
      const assessments: Assessment[] = [
        { title: 'Assessment 1', weight: 20, hurdle: false, score: 80, completed: true },
        { title: 'Assessment 2', weight: 30, hurdle: false, score: 90, completed: true },
        { title: 'Assessment 3', weight: 50, hurdle: false, score: 75, completed: true },
      ];
  
      const targetScore = 80;
      const result = getRemainingTarget(assessments, targetScore);
  
      // The expected remaining target score is (80 - (20% * 80 + 30% * 90 + 50% * 75)) = 12.5
      expect(result).toBe(0);
    });
  
    it('should handle assessments with zero weight', () => {
      const assessments: Assessment[] = [
        { title: 'Assessment 1', weight: 0, hurdle: false, score: 80, completed: true },
        { title: 'Assessment 2', weight: 100, hurdle: false, score: 90, completed: true },
        { title: 'Assessment 3', weight: 0, hurdle: false, score: 75, completed: true },
      ];
  
      const targetScore = 80;
      const result = getRemainingTarget(assessments, targetScore);
  
      // Only Assessment 2 contributes to the remaining target score: (80 - (30% * 90)) = 47
      expect(result).toBe(0);
    });
  
    it('should handle assessments with incomplete status', () => {
      const assessments: Assessment[] = [
        { title: 'Assessment 1', weight: 20, hurdle: false, score: 80, completed: true },
        { title: 'Assessment 2', weight: 30, hurdle: false, score: 90, completed: false },
        { title: 'Assessment 3', weight: 50, hurdle: false, score: 75, completed: true },
      ];
  
      const targetScore = 80;
      const result = getRemainingTarget(assessments, targetScore);
  
      // The expected remaining target score is (80 - (20% * 80 + 50% * 75)) = 40
      expect(result).toBe(26.5);
    });
  
    it('should return 0 when the remaining target score is negative', () => {
      const assessments: Assessment[] = [
        { title: 'Assessment 1', weight: 20, hurdle: false, score: 80, completed: true },
        { title: 'Assessment 2', weight: 30, hurdle: false, score: 90, completed: true },
        { title: 'Assessment 3', weight: 50, hurdle: false, score: 100, completed: true },
      ];
  
      const targetScore = 80;
      const result = getRemainingTarget(assessments, targetScore);
  
      // The remaining target score is negative, so it should return 0
      expect(result).toBe(0);
    });
  });
  