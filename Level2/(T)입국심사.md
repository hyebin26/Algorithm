### 문제 설명
n명이 입국심사를 위해 줄을 서서 기다리고 있습니다. 각 입국심사대에 있는 심사관마다 심사하는데 걸리는 시간은 다릅니다.

처음에 모든 심사대는 비어있습니다. 한 심사대에서는 동시에 한 명만 심사를 할 수 있습니다. 가장 앞에 서 있는 사람은 비어 있는 심사대로 가서 심사를 받을 수 있습니다. 하지만 더 빨리 끝나는 심사대가 있으면 기다렸다가 그곳으로 가서 심사를 받을 수도 있습니다.

모든 사람이 심사를 받는데 걸리는 시간을 최소로 하고 싶습니다.

입국심사를 기다리는 사람 수 n, 각 심사관이 한 명을 심사하는데 걸리는 시간이 담긴 배열 times가 매개변수로 주어질 때, 모든 사람이 심사를 받는데 걸리는 시간의 최솟값을 return 하도록 solution 함수를 작성해주세요.

### 제한사항
입국심사를 기다리는 사람은 1명 이상 1,000,000,000명 이하입니다.
각 심사관이 한 명을 심사하는데 걸리는 시간은 1분 이상 1,000,000,000분 이하입니다.
심사관은 1명 이상 100,000명 이하입니다.

### 나의풀이
* 시간초과 => 제한사항을 보면 입국심사를 기다리는 사람과 심사시간이 상당히 길 수 있으므로 이진탐색을 이용했어야 했다.
1. sortTime에 times배열을 복사한다.
2. 시간을 계산할 변수 time에 시간을 단축시키기 위해 처음으로 0부터 시작하는 것이 아닌 최소 검사를 받을 수 있는 시간으로 선언해준다.
3. 반복문에서 현재의 시간에 검사를 받을 수 있다면(time / times[i] 를 만족한다면) sortTime[i]의 값을 변경해주고 검사받은 사람을 카운트(cnt++)한다.
4. 속도를 줄이기 위해 시간을 일일히 1초씩 더하는 것이 아니라 바로 다음 사람이 심사받을 수 있는 시간으로 이동해주고 for 반복문을 종료시켜준다.
5. 검사 받은 사람이 n가 같아지면 break 하고 출력한다. 
```jsx
function solution(n, times) {
    let cnt = 1;
    let sortTime = [...times]
    let time = Math.min(...sortTime);
    while(true){
        for(let i = 0; i<= sortTime.length -1;i++){
            if(Number.isInteger(time / times[i])){
                sortTime[i] = sortTime[i] + times[i];
                cnt++; 
                time = Math.min(...sortTime);
                continue;
            } 
         }
        if(cnt === n)break;
    }
    return time;
}
```

### 풀이
```jsx
function solution(n, times) {
    times.sort((a,b)=>a-b);
    let left  = 0;
    let right = times[times.length-1] *n;
    let mid = Math.floor((left + right) / 2);
    while(left <= right){
        const count = times.reduce((result, cur)=> result + Math.floor(mid/cur),0);
        if(count >= n)right = mid - 1;
        else if(count < n) left = mid + 1;
        mid = Math.floor((left + right) / 2);
    }
    return left;
}
```
