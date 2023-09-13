import { isValidScoreOutOf, isValidScorePercentage, isValidScore } from './inputValidation'; // Replace 'yourModule' with the actual module path

describe('isValidScoreOutOf', () => {
  it('should return true for a valid score out of format', () => {
    const validScores = ['80/100', '50/50', '0/10'];

    validScores.forEach((score) => {
      const result = isValidScoreOutOf(score);
      expect(result).toBe(true);
    });
  });

  it('should return false for an invalid score out of format', () => {
    const invalidScores = ['80', '80/', '/100', 'abc/def', '50/0'];

    invalidScores.forEach((score) => {
      const result = isValidScoreOutOf(score);
      expect(result).toBe(false);
    });
  });

  it('should return false for a score out of format where numerator is greater than denominator', () => {
    const invalidScores = ['100/80', '60/50', '10/0'];

    invalidScores.forEach((score) => {
      const result = isValidScoreOutOf(score);
      expect(result).toBe(false);
    });
  });

});

describe('isValidScorePercentage', () => {
  it('should return true for valid percentage scores', () => {
    const validScores = ['0%', '50%', '100%', '42%'];

    validScores.forEach((score) => {
      const result = isValidScorePercentage(score);
      expect(result).toBe(true);
    });
  });

  it('should return false for invalid percentage scores', () => {
    const invalidScores = ['%', '50', '100', '-10%', '110%', 'abc%', '50%abc'];

    invalidScores.forEach((score) => {
      const result = isValidScorePercentage(score);
      expect(result).toBe(false);
    });
  });

  it('should return false for percentage scores with extra characters', () => {
    const invalidScores = ['50%abc', '42%abc%', '100%100%', '0%0%'];

    invalidScores.forEach((score) => {
      const result = isValidScorePercentage(score);
      expect(result).toBe(false);
    });
  });

  it('should return false for percentage scores that are out of range', () => {
    const invalidScores = ['-5%', '105%', '101%', '-1%', '1010%'];

    invalidScores.forEach((score) => {
      const result = isValidScorePercentage(score);
      expect(result).toBe(false);
    });
  });
});

describe('isValidScore', () => {
  it('should return true for valid scores', () => {
    const validScores = ['0', '50', '100', '42'];

    validScores.forEach((score) => {
      const result = isValidScore(score);
      expect(result).toBe(true);
    });
  });

  it('should return false for invalid scores', () => {
    const invalidScores = ['-1', '101', 'abc', ''];

    invalidScores.forEach((score) => {
      const result = isValidScore(score);
      expect(result).toBe(false);
    });
  });
});

