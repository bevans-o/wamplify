import getAssessmentScore from "./getAssessmentScore";

test("returns 0 score", () => {
  expect(getAssessmentScore("0")).toEqual(0);
});

test("returns 0 score with percentage", () => {
  expect(getAssessmentScore("0%")).toEqual(0);
});

test("returns 0 score with fraction", () => {
  expect(getAssessmentScore("0/0")).toEqual(0);
});

test("returns 0 if negative input", () => {
  expect(getAssessmentScore("-1/3")).toEqual(0);
});

test("returns 100 score", () => {
  expect(getAssessmentScore("100")).toEqual(100);
});

test("returns 100 score with percentage", () => {
  expect(getAssessmentScore("100%")).toEqual(100);
});

test("returns 100 score with fraction", () => {
  expect(getAssessmentScore("100/100")).toEqual(100);
});

test("returns 100 score with improper fraction", () => {
  expect(getAssessmentScore("120/100")).toEqual(100);
});
