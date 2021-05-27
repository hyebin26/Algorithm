## K번째 수
### 나의풀이 
- 정답 
1. commands라는 2차원 배열에 map을 사용하여 첫 번째 요소 - 1, 두 번째 요소를 slice를 한다.
2. sort()를 사용하여 정렬하고 정렬한 배열에 세 번째 요소 -1을 answer에 push한다.
```jsx
function solution(array, commands) {
    let answer = [];
    commands.map((item,index)=>{
        let arr = array.slice(item[0]-1 , item[1]);  
        arr.sort((a,b) => a - b); // 이왕이면 위에 배열을 선언한 곳에 같이 두는 것이 더 간결해보임
        answer.push(arr[item[2]-1]);
    })
    return answer;
}
```
### 다른사람풀이
```jsx
function solution(array, commands) {
    let answer = [];
    commands.map((item,index)=>{
        const [q,w,e] = item;
        let arr = array.slice(q-1 , w).sort((a,b) => a - b);
        answer.push(arr[e-1]);
    })
    return answer;
}
```
## 아쉬운점 
- 한 라인에서 해결이 되면 간결하도록 한라인에서 해결하도록 하기.
- const [q,w,e] = item; => q는 item[0] w는 item[1] e는 item[2] 이렇게 사용하면 직관적으로 사용할 수 있음
