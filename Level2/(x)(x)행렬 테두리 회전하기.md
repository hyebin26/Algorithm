### **문제설명**
참고: <a href="https://programmers.co.kr/learn/courses/30/lessons/77485">https://programmers.co.kr/learn/courses/30/lessons/77485</a>

### 나의풀이
```jsx
function makeBoard(row,col){
    let board = [];
    for(let i=0; i<= col-1;i++){
        const check = [];
        for(let j=1; j<= row;j++){
            check.push((row*i)+j);
            if(j === row) board.push(check);
        }
    }
    return board;
}

function solution(rows, columns, queries) {
    var answer = [];
    let board = makeBoard(rows,columns);
    queries.map(query =>{
        for(let i=query[1]; i<= query[3];i++){
            console.log(i);
        }
        console.log("good")
    })
    return answer;
}
```

### 느낀점
1. 적어가면서 하는 것이 아니면 도형을 푸는 것이 어려울 것 같다. 다시 풀어봐야겠따.
