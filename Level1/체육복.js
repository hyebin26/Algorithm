function solution(n, lost, reserve) {
  const realReserve = reserve.filter((r) => !lost.includes(r));
  const realLost = lost.filter((r) => !reserve.includes(r));

  const ableNum = realLost.filter((a) => {
    return realReserve.find((b, i) => {
      const has = b === a - 1 || b === a + 1;
      if (has) {
        delete realReserve[i];
      }
      return has;
    });
  }).length;
  return n - (realLost.length - ableNum);
}
