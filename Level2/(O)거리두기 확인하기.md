## 문제 
참고:https://programmers.co.kr/learn/courses/30/lessons/81302

### 풀이
- 배열의 크기가 작고 주어지므로 DFS를 사용하지 않아도 됨 
- keyPoint: P와 P의 거리를 구할 때 대각선의 거리를 구하지 못했다. => P를 기준이 아닌 P,O을 기준으로 하면 대각선을 구하지 않아도 됨
1. places.map을 통해 안에 있는 배열이 거리두기를 지키지 않으면 0을 출력하면 되므로 item.some을 해준다.
2. 거리두기를 체크하기 위해서 item2.split("").some()으로 나눈다.
3. item3 === "X" 즉, 현재의 요소가 파티션이라면 주위의 요소에 상관없이 거리두기를 지킨 것이므로 fasle를 해준다.
4. userCount를 통해 상,하,좌,우에 P가 있는지 확인한다.
5. 현재의 요소가 P고 userCount > 0 즉,P가 상,하,좌,우에 존재하면 true
6. 현재의 요소가 O고 userCount >= 2 즉, P가 2맨해튼안에 존재한다면 true
7. true가 존재하면 0으로 , 존재하지 않으면 1로 출력한다.

```jsx
function solution(places) {
    let answer = places.map((item,index)=>{
        return item.some((item2,index2)=>{
            return item2.split("").some((item3,index3,arr)=>{
                if(item3 === "X") return false;
                const userCount = [
                    arr[index3 - 1] || "",
                    arr[index3 + 1] || "",
                    (item[index2 + 1]|| "").charAt(index3),
                    (item[index2 - 1] || "").charAt(index3),
                ].filter(v => v === "P").length;
                if((item3 === "P" && userCount > 0) || 
                  (item3 === "O" && userCount >= 2)){
                    return true;
                }
                return false;
            },'');
       }) ? 0 : 1;
    })
    return answer;
};
```

### 느낀점
1. 다음에도 이러한 방식의 비슷한 문제를 풀면 풀 수 있겠다는 확신이 들지 않는다.
2. (item[index2 + 1]|| "").charAt(index3) => index2가 0보다 작거나 index를 초과할 수 있으므로 || 을 이용해 에러를 방지하는 것이 좋겠다.
