### 문제 설명
조이스틱으로 알파벳 이름을 완성하세요. 맨 처음엔 A로만 이루어져 있습니다.
ex) 완성해야 하는 이름이 세 글자면 AAA, 네 글자면 AAAA

조이스틱을 각 방향으로 움직이면 아래와 같습니다.
```jsx
▲ - 다음 알파벳
▼ - 이전 알파벳 (A에서 아래쪽으로 이동하면 Z로)
◀ - 커서를 왼쪽으로 이동 (첫 번째 위치에서 왼쪽으로 이동하면 마지막 문자에 커서)
▶ - 커서를 오른쪽으로 이동
```
예를 들어 아래의 방법으로 "JAZ"를 만들 수 있습니다.

- 첫 번째 위치에서 조이스틱을 위로 9번 조작하여 J를 완성합니다.
- 조이스틱을 왼쪽으로 1번 조작하여 커서를 마지막 문자 위치로 이동시킵니다.
- 마지막 위치에서 조이스틱을 아래로 1번 조작하여 Z를 완성합니다.
따라서 11번 이동시켜 "JAZ"를 만들 수 있고, 이때가 최소 이동입니다.
만들고자 하는 이름 name이 매개변수로 주어질 때, 이름에 대해 조이스틱 조작 횟수의 최솟값을 return 하도록 solution 함수를 만드세요.

### 제한 사항
- name은 알파벳 대문자로만 이루어져 있습니다.
- name의 길이는 1 이상 20 이하입니다.

### 나의풀이
```jsx
function solution(name) {
    var answer = 0;
    const middleAl = ("A".charCodeAt() + "Z".charCodeAt()) / 2;
    const lastAl = "Z".charCodeAt() +1;
    const firstAl ="A".charCodeAt();
    const maxName = name.length -1;
    let move = [0,1];    
    for (let i= 0; i<= maxName ;i++){
        const al = name[i];
        if(al === "A") {
            if(move[0] === 0) move[0] = i+1;
            else move[1] += 1;
            continue;
        }
        else {
            if(i !== 0){
                if(move[0] !== 0 && maxName - i + move[0] < move[1]){
                    answer += maxName - i + move[0];
                    move = [0,1];
                } else{
                    answer += move[1];
                    move = [0,1];
                }
            }
        }
        if(al.charCodeAt() < middleAl){
            answer += al.charCodeAt() - firstAl;
        } else{
            answer += lastAl - al.charCodeAt();
        }
    }
    return answer;
};
```
### 느낀점
- 계산을 할 때 너무 복잡함을 줄이기 위해 정확한 숫자를 넣는 것을 연습, 제대로 된 값을 넣는 것이 중요
