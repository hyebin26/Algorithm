### 문제 
<a href="https://programmers.co.kr/learn/courses/30/lessons/68645?language=javascript">https://programmers.co.kr/learn/courses/30/lessons/68645?language=javascript</a>
### 풀이
```jsx
function solution(n) {
    const answer = new Array(n).fill().map((_,i) => new Array(i+1));
    let cnt = 0;
    let x = -1;
    let y = 0;
    while(n > 0){
        for(let i = 0; i < n;i++)answer[++x][y] = ++cnt;
        for(let i =0; i<n -1;i++)answer[x][++y] = ++cnt;
        for(let i =0; i<n-2;i++)answer[--x][--y] = ++cnt;
        n -= 3;
    }
    return answer.flatMap(e => e);
}
```
