### 문제 설명
다음 규칙을 지키는 문자열을 올바른 괄호 문자열이라고 정의합니다.

- (), [], {} 는 모두 올바른 괄호 문자열입니다.
- 만약 A가 올바른 괄호 문자열이라면, (A), [A], {A} 도 올바른 괄호 문자열입니다. 예를 들어, [] 가 올바른 괄호 문자열이므로, ([]) 도 올바른 괄호 문자열입니다.
- 만약 A, B가 올바른 괄호 문자열이라면, AB 도 올바른 괄호 문자열입니다. 예를 들어, {} 와 ([]) 가 올바른 괄호 문자열이므로, {}([]) 도 올바른 괄호 문자열입니다.
대괄호, 중괄호, 그리고 소괄호로 이루어진 문자열 s가 매개변수로 주어집니다. 이 s를 왼쪽으로 x (0 ≤ x < (s의 길이)) 칸만큼 회전시켰을 때 s가 올바른 괄호 문자열이 되게 하는 x의 개수를 return 하도록 solution 함수를 완성해주세요.

### 제한사항
- s의 길이는 1 이상 1,000 이하입니다.

### 풀이
1. 매개변수 s를 비교하기 이동시키기 쉽게 배열로 변경한다.
2. 변경한 문자열이 알맞은 괄호 문자열인지 확인하기 위한 pair 객체를 선언한다.
3. x번 이동한 배열에 반복문으로 stack에 푸시하고 짝이 맞으면 pop한다.
4. stack 배열이 존재하면 fasle를 리턴하고, 존재하지 않으면 true를 리턴한다.
5. 리턴 값이 true면 answer++한다.
6. 마지막으로 answer을 리턴한다.
```jsx
function solution(s) {
    var answer = 0;
    const arr = s.split("");
    const pair = {"}":"{", "]":"[", ")":"("};
    const isValid = arr => {
        const stack = [];
        for(let i = 0; i < arr.length;i++){
            const c = arr[i];
            if(pair[c] === undefined) stack.push(c);
            else{
               if(stack[stack.length-1] !== pair[c]) return false
                stack.pop();
            }
        }
        if(stack.length) return false;
        return true;
    }
    for(let i =0; i< s.length;i++){
        if(isValid(arr)) answer++;
        arr.push(arr.shift());
    }
    return answer;
}
```

### 나의풀이(틀린이유)
- x번 회전시키는 것은 구현할 수 있었으나 올바른 식인지 판별하는 함수를 구현하지 못했다.
- 객체를 이용해서 짝이 맞을 시 pop하는 방식으로 구현
