import generateID from "./generateId";

test("returns unique output", () => {
  expect(generateID()).not.toEqual(generateID());
});
