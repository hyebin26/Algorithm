### 문제 설명
무인도에 갇힌 사람들을 구명보트를 이용하여 구출하려고 합니다. 구명보트는 작아서 한 번에 최대 2명씩 밖에 탈 수 없고, 무게 제한도 있습니다.

예를 들어, 사람들의 몸무게가 [70kg, 50kg, 80kg, 50kg]이고 구명보트의 무게 제한이 100kg이라면 2번째 사람과 4번째 사람은 같이 탈 수 있지만 1번째 사람과 3번째 사람의 무게의 합은 150kg이므로 구명보트의 무게 제한을 초과하여 같이 탈 수 없습니다.

구명보트를 최대한 적게 사용하여 모든 사람을 구출하려고 합니다.

사람들의 몸무게를 담은 배열 people과 구명보트의 무게 제한 limit가 매개변수로 주어질 때, 모든 사람을 구출하기 위해 필요한 구명보트 개수의 최솟값을 return 하도록 solution 함수를 작성해주세요.

### 제한사항
- 무인도에 갇힌 사람은 1명 이상 50,000명 이하입니다.
- 각 사람의 몸무게는 40kg 이상 240kg 이하입니다.
- 구명보트의 무게 제한은 40kg 이상 240kg 이하입니다.
- 구명보트의 무게 제한은 항상 사람들의 몸무게 중 최댓값보다 크게 주어지므로 사람들을 구출할 수 없는 경우는 없습니다.

### 나의풀이
1. 빈 배열을 선언할 때 output과 input이 동시에 일어날 필요가 없으므로 queue가 아닌 stack(구명보트)을 이용해서 풀었다.
2. stack, people 배열의 수가 변해도 동적으로 두 배열을 동적으로 비교해야 하므로 while문과 for문을 이용했다.
3. while문은 people의 수가 없을 때 까지 반복한다.
4. for문은 people 배열안에 있는 수를 stack에 넣어야 하므로 people.length-1로 제한한다.
5. 구명보트에 사람이 존재하지 않을 시( !stack[0] ) stack.push넣고 people을 splice해준다. 
6. 구명보트에 사람이 있고 people[i]가 limit보다 작을 시 더하고 stack을 초기화하고 answer++해준다.
7. 그리고 i가 people.length-1까지 반복했으나 6번을 만족하지 못하면 stack을 초기화하고 answer++해준다.
```jsx
function solution(people, limit) {
    var answer = 0;
    let stack = [];
    while(people.length !== 0){
        for(let i = 0;i<= people.length-1;i++){
            if(!stack[0]){
                stack.push(people[i]);
                people.splice(i,1);
                if(people.length === 0) answer++;
                break;
            }
            if(stack[0] + people[i] <= limit){
                stack.push(people[i]);
                people.splice(i,1);
                answer++;
                break;
            }
            if(i === people.length -1){
                answer++;
                stack = [];
                break;
            }
        }
    }
    return answer;
}
```
### 다른 사람 풀이
- ket point는 가장 많이 탈 수 있는 방법(최소값)은 무게가 가장 많은 사람과 가장 적은 사람이 같이 타는 것이다.
```jsx
function solution(people, limit) {
    var answer = 0;
    people.sort((a,b)=> b-a);
    let j = people.length -1;
    for(let i = 0; i<=j;i++,answer++){
        if(people[i] + people[j] <= limit) j--;
    }
    return answer;
}
```

### 느낀점
- 틀린이유 : 우선 limit을 사용하는 것이 아니라 예제와 똑같이 100으로만 제한을 해서 시간이 오래 걸렸고 최소값을 구현하지 못했다. 
```jsx
people = [100,500,500,900,950], limit = 1000 
return 3
```
- 최소값이 아닌 people의 index 순으로 진행하면 리턴은 3이 아닌 4가 된다. 
- 무작정 계산을 하는 것보다 최소값 = 가장 무거운 사람 + 가장 가벼운 사람 이라는 것을 생각하고 풀었어야 했다. 우선 key point에 대해서 먼저 생각해보고 코드로 구현하는 것이 중요할 것 같다.
