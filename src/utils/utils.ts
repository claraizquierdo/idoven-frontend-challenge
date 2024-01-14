
export const concatData = (setOfArrays: Array<Int16Array>): Int16Array => {
  const len = setOfArrays.reduce((acc, v) => acc + v.length, 0);
  const data = new Int16Array(len);

  let i = 0;
  setOfArrays.forEach(v => {
    data.set(v, i);
    i += v.length;
  });
  return data;
}

export const downsample = (samples: Int16Array, totalSamples: number): Int16Array => {
  let copyOfSamples = samples.slice();
  if (samples.length <= totalSamples) {
    return copyOfSamples;
  }

  const result = new Int16Array(totalSamples);
  const reductionRate = Math.floor(copyOfSamples.length / totalSamples);

  for (let i = 0; i < totalSamples; i++) {
    const offset = i * reductionRate
    if (offset > copyOfSamples.length) {
      break;
    }
    result[i] = copyOfSamples[offset];
  }
  return result;
}