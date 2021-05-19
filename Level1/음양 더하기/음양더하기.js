// function mySolution(absolutes, signs) {
//     const absoluteArr = []
//     for(let i=0; i <= absolutes.length-1; i++){
//         if(signs[i]){
//             absoluteArr.push(absolutes[i]);
//         }else{
//             absoluteArr.push(-absolutes[i]);
//         }
//     }
//     const reducer = (accumulator,currentValue) => accumulator + currentValue;
//     const answer = absoluteArr.reduce(reducer);
//     return answer;
// }

function solution(absolutes, signs) {
  const answer = absolutes.reduce((acc, val, i) => {
    return acc + val * (signs[i] ? 1 : -1);
  }, 0);
  return answer;
}

// 정답
// 처음 풀 때 생각 보다 답이 쉽게 나와서 왠지 정답이 아닐꺼라고 생각도 하고 내가 문제를 잘못이해했나 라는 생각으로 긴가민가하는 생각으로 풀었다. 
// 담에 풀때는 좀 더 자신감 있게 풀고 풀고나서 함수를 간단히 만들고 제출하자.
