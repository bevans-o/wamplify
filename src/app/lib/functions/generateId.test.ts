import generateID from './generateId'

test('returns unique output', () => {
    const testLength = 32
    expect(generateID(testLength)).not.toEqual(testLength);
  });
