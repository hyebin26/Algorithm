선행 스킬이란 어떤 스킬을 배우기 전에 먼저 배워야 하는 스킬을 뜻합니다.

예를 들어 선행 스킬 순서가 `스파크 → 라이트닝 볼트 → 썬더`일때, 썬더를 배우려면 먼저 라이트닝 볼트를 배워야 하고, 라이트닝 볼트를 배우려면 먼저 스파크를 배워야 합니다.

위 순서에 없는 다른 스킬(힐링 등)은 순서에 상관없이 배울 수 있습니다. 따라서 `스파크 → 힐링 → 라이트닝 볼트 → 썬더`와 같은 스킬트리는 가능하지만, `썬더 → 스파크`나 `라이트닝 볼트 → 스파크 → 힐링 → 썬더`와 같은 스킬트리는 불가능합니다.

선행 스킬 순서 skill과 유저들이 만든 스킬트리[1](https://programmers.co.kr/learn/courses/30/lessons/49993#fn1)를 담은 배열 skill_trees가 매개변수로 주어질 때, 가능한 스킬트리 개수를 return 하는 solution 함수를 작성해주세요.

### 제한 조건

- 스킬은 알파벳 대문자로 표기하며, 모든 문자열은 알파벳 대문자로만 이루어져 있습니다.
- 스킬 순서와 스킬트리는 문자열로 표기합니다.
    - 예를 들어, `C → B → D` 라면 "CBD"로 표기합니다
- 선행 스킬 순서 skill의 길이는 1 이상 26 이하이며, 스킬은 중복해 주어지지 않습니다.
- skill_trees는 길이 1 이상 20 이하인 배열입니다.
- skill_trees의 원소는 스킬을 나타내는 문자열입니다.
    - skill_trees의 원소는 길이가 2 이상 26 이하인 문자열이며, 스킬이 중복해 주어지지 않습니다.

### 나의풀이 
1. 알맞은 스킬트리를 구하기 위해 우선 skill_trees를 map을 한다.
2. check라는 배열을 만들고 item들이 skill배열안에 존재하면 푸시한다.
3. 그리고 item의 마지막 열에서 for문으로 check배열을 돌면서 순서가 맞다면 answer++을 해준다.
- 순서 맞추는 것을 해결하지 못함
```jsx
function solution(skill, skill_trees) {
    let answer = 0;
    skill_trees.map((item) =>{
        const check = [];
        let checkTrue = false;
        let find = false;
        item.split("").map((item2,index2) =>{
            if(skill.includes(item2))check.push(item2);
            if(index2 === item.length-1){
                for(let i=0;i<=check.length-1;i++){
                    if(check.length === 0 || check.length === 1){
                        answer++;
                        break;
                    }
                    if(!find) {
                        find = skill.indexOf(check[i]);
                    }
                    else if(find >=skill.indexOf(check[i]))break;        
                    else if(i === check.length-1){
                        console.log(check);
                        answer++;}
                }
            }
        })
    })
    return answer;
}
```
### 틀린이유 
1. 문제를 잘못이해해서 틀렸다.
```jsx
function solution(skill, skill_trees) {
    let answer = 0;
    let filteredTrees = skill_trees.map(tree  =>{
        return tree.split("").filter(ele => skill.includes(ele))
    });
    for(let i = 0; i< filteredTrees.length;i++){
        let isTrue = true;
        for(let j =0; j < filteredTrees[i].length;j++){
            if(skill[j] !== filteredTrees[i][j]){
              isTrue = false;
              break;
            }
        }
        if(isTrue) answer++;
    }
    return answer;
}
```

### 느낀점
1. 나눠서 간단하게 푸는 연습하기
- 첫 번째 풀이는 하나의 식에서 다 풀어가려고 했지만 풀이를 보니 다른 식으로 나눠서 푸는 것이 더 가독성이 좋고 덜 복잡하다. 
```jsx
skill_tress.map((item)=>{
  item.split("").map((item2,index2) =>{
            if(skill.includes(item2))check.push(item2);
            ...
            ...
            if(isTrue)answer++;
})

let filteredTrees = skill_trees.map(tree =>{
  return tree.split("").filter(ele => skill.includes(ele));
}
```
2. 문제 확실하게 이해하기
