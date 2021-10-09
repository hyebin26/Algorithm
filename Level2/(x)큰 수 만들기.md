### 문제 설명
어떤 숫자에서 k개의 수를 제거했을 때 얻을 수 있는 가장 큰 숫자를 구하려 합니다.

예를 들어, 숫자 1924에서 수 두 개를 제거하면 [19, 12, 14, 92, 94, 24] 를 만들 수 있습니다. 이 중 가장 큰 숫자는 94 입니다.

문자열 형식으로 숫자 number와 제거할 수의 개수 k가 solution 함수의 매개변수로 주어집니다. number에서 k 개의 수를 제거했을 때 만들 수 있는 수 중 가장 큰 숫자를 문자열 형태로 return 하도록 solution 함수를 완성하세요.

### 제한 조건
- number는 1자리 이상, 1,000,000자리 이하인 숫자입니다.
- k는 1 이상 number의 자릿수 미만인 자연수입니다.

### 풀이
- key point는 어떤 숫자에서 k개의 숫자를 제거했을 떄 얻을 수 있는 가장 큰 숫자를 구하는 것이다.
1. 풀이는 스택을 이용했으며, 스택안의 수와 다음 수를 비교했을 때 스택안의 수가 더 작으면 pop을 하고 k--(숫자 제거)을 해준다.
2. k가 0보다 작을 경우는 바로 stack에 푸시하고 스트링 형식으로 바꾸고 출력해준다.
```jsx
function solution(number, k) {
    var answer = '';
    const stack = [];
    for(let  i =0; i< number.length;i++){
        const el = number[i];
        while(k > 0 && stack[stack.length-1] < el){
            stack.pop();
            k--;
        }
        stack.push(el);
    }
    stack.splice(stack.length - k,k);
    answer = stack.join("");
    return answer;
}
```
