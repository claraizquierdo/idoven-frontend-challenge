import { concatData, downsample, downsampleWithMean } from '../../utils/utils';

describe('concatData', () => {
  test('should concatenate multiple Int16Array into a single Int16Array', () => {
    const array1 = new Int16Array([1, 2, 3]);
    const array2 = new Int16Array([4, 5, 6]);
    const array3 = new Int16Array([7, 8, 9]);

    const result = concatData([array1, array2, array3]);

    const expectedResult = new Int16Array([1, 2, 3, 4, 5, 6, 7, 8, 9]);

    expect(result).toEqual(expectedResult);
  });

  test('should return an empty Int16Array when input is an empty array', () => {
    const result = concatData([]);

    const expectedResult = new Int16Array();

    expect(result).toEqual(expectedResult);
  });

  test('should concatenate a single Int16Array into a single Int16Array', () => {
    const array = new Int16Array([1, 2, 3]);

    const result = concatData([array]);

    const expectedResult = new Int16Array([1, 2, 3]);

    expect(result).toEqual(expectedResult);
  });
});

describe('downsample', () => {
  test('should downsample samples correctly', () => {
    const inputSamples = new Int16Array([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    const totalSamples = 5;

    const result = downsample(inputSamples, totalSamples);

    const expectedResult = new Int16Array([1, 3, 5, 7, 9]);

    expect(result).toEqual(expectedResult);
  });

  test('should return the same array if totalSamples is greater than or equal to the length of samples', () => {
    const inputSamples = new Int16Array([1, 2, 3, 4, 5]);
    const totalSamples = 5;

    const result = downsample(inputSamples, totalSamples);

    expect(result).toEqual(inputSamples);
  });

  test('should handle downsampling of an empty array', () => {
    const inputSamples = new Int16Array([]);
    const totalSamples = 5;

    const result = downsample(inputSamples, totalSamples);

    expect(result).toEqual(inputSamples);
  });

  test('should handle downsampling with totalSamples larger than inputSamples length', () => {
    const inputSamples = new Int16Array([1, 2, 3]);
    const totalSamples = 5;

    const result = downsample(inputSamples, totalSamples);

    expect(result).toEqual(inputSamples);
  });
});

describe('downsample with mean', () => {
  test('should downsample samples with mean correctly', () => {
    const inputSamples = new Int16Array([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    const totalSamples = 5;

    const result = downsampleWithMean(inputSamples, totalSamples);

    const expectedResult = new Int16Array([1, 1, 3, 5, 7]);

    expect(result).toEqual(expectedResult);
  });

  test('should return the same array if totalSamples is greater than or equal to the length of samples', () => {
    const inputSamples = new Int16Array([1, 2, 3, 4, 5]);
    const totalSamples = 5;

    const result = downsample(inputSamples, totalSamples);

    expect(result).toEqual(inputSamples);
  });

  test('should handle downsampling of an empty array', () => {
    const inputSamples = new Int16Array([]);
    const totalSamples = 5;

    const result = downsample(inputSamples, totalSamples);

    expect(result).toEqual(inputSamples);
  });

  test('should handle downsampling with totalSamples larger than inputSamples length', () => {
    const inputSamples = new Int16Array([1, 2, 3]);
    const totalSamples = 5;

    const result = downsample(inputSamples, totalSamples);

    expect(result).toEqual(inputSamples);
  });
});