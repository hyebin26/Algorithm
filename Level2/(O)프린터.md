### **문제 설명**

일반적인 프린터는 인쇄 요청이 들어온 순서대로 인쇄합니다. 그렇기 때문에 중요한 문서가 나중에 인쇄될 수 있습니다. 이런 문제를 보완하기 위해 중요도가 높은 문서를 먼저 인쇄하는 프린터를 개발했습니다. 이 새롭게 개발한 프린터는 아래와 같은 방식으로 인쇄 작업을 수행합니다.

`1. 인쇄 대기목록의 가장 앞에 있는 문서(J)를 대기목록에서 꺼냅니다.
2. 나머지 인쇄 대기목록에서 J보다 중요도가 높은 문서가 한 개라도 존재하면 J를 대기목록의 가장 마지막에 넣습니다.
3. 그렇지 않으면 J를 인쇄합니다.`

예를 들어, 4개의 문서(A, B, C, D)가 순서대로 인쇄 대기목록에 있고 중요도가 2 1 3 2 라면 C D A B 순으로 인쇄하게 됩니다.

내가 인쇄를 요청한 문서가 몇 번째로 인쇄되는지 알고 싶습니다. 위의 예에서 C는 1번째로, A는 3번째로 인쇄됩니다.

현재 대기목록에 있는 문서의 중요도가 순서대로 담긴 배열 priorities와 내가 인쇄를 요청한 문서가 현재 대기목록의 어떤 위치에 있는지를 알려주는 location이 매개변수로 주어질 때, 내가 인쇄를 요청한 문서가 몇 번째로 인쇄되는지 return 하도록 solution 함수를 작성해주세요.

### 제한사항

- 현재 대기목록에는 1개 이상 100개 이하의 문서가 있습니다.
- 인쇄 작업의 중요도는 1~9로 표현하며 숫자가 클수록 중요하다는 뜻입니다.
- location은 0 이상 (현재 대기목록에 있는 작업 수 - 1) 이하의 값을 가지며 대기목록의 가장 앞에 있으면 0, 두 번째에 있으면 1로 표현합니다.

### 해설을 보고 본 풀이 
1. 배열에서 첫 번째 행을 계속해서 봐야하므로 for문이 아닌 while문으로 반복문을 한다.
2. shift로 가장 앞에 있는 수를 뽑고 배열에서 뽑은 수보다 큰 수가 있으면 push하고 없으면 cnt++를 한다.
3. 배열이 변경되면 location의 수도 하나씩 앞으로 오기 떄문에 target의 수를 1씩 빼준다.
4. 하지만 자신의 순서에도 출력을 하지 못하는 경우(target === -1)뒷 순서부터 돌아야 하므로 target의 길이를 다시 설정해준다.
5. 2번 순서로 돌아가서 cnt++을 하고 location의 위치가 된 경우(target === 0) cnt를 출력해준다.
```jsx
function solution(priorities, location) {
    let count = 0;
    let target = location;
   
    while(priorities.length > 0){
        let compareNum = priorities.shift();
        if(priorities.some(num => num > compareNum)){
            priorities.push(compareNum) 
        }
        else{
            count++;
            if(target === 0){
                return count;
            }
        }
        target--;
        if(target === -1) target = priorities.length -1;
    }
    return count;
}
```

### 다시 푼 풀이
```jsx
function solution(priorities, location) {
    let result = 0;    
    let check = [];
    priorities.forEach((item,index) =>{
        check.push([item,index])
    })
    while(check.length){
      const front = check.shift();
      if(check.find(ele => ele[0] > front[0])){
          check.push(front);
      }else{
          result++;
          if(front[1] === location){
              break;
          }
      }
    }
    return result;
};
```
참고: <a href="https://devuna.tistory.com/22">https://devuna.tistory.com/22</a>

### 다시 풀고 느낀점
1. 어떤방식으로 틀린지는 모르겠으나 쉽게 푼 것 같다. 최대한 문제 설명이랑 비슷하게 풀려고 한 것 같다.
