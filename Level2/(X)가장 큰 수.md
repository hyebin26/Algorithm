### **문제 설명**

0 또는 양의 정수가 주어졌을 때, 정수를 이어 붙여 만들 수 있는 가장 큰 수를 알아내 주세요.

예를 들어, 주어진 정수가 [6, 10, 2]라면 [6102, 6210, 1062, 1026, 2610, 2106]를 만들 수 있고, 이중 가장 큰 수는 6210입니다.

0 또는 양의 정수가 담긴 배열 numbers가 매개변수로 주어질 때, 순서를 재배치하여 만들 수 있는 가장 큰 수를 문자열로 바꾸어 return 하도록 solution 함수를 작성해주세요.

### 제한 사항

- numbers의 길이는 1 이상 100,000 이하입니다.
- numbers의 원소는 0 이상 1,000 이하입니다.
- 정답이 너무 클 수 있으니 문자열로 바꾸어 return 합니다.

### 입출력 예
| numbers           | return    |
|-------------------|-----------|
| [6, 10, 2]        | "6210"    |
| [3, 30, 34, 5, 9] | "9534330" |

### 나의 풀이
1. numbers안에 있는 수를 비교하기 위해 문자열, 배열로 만들기
2. sort를 이용해 정렬해주는데 첫 글자 먼저 비교하고 첫 글자가 같을 경우는 첫 열만이 아닌 전체열로 비교해주었다.
* 풀지 못한 이유 => [3,0], [3,4] , [3] 같은 경우 2번처럼 sort를 하면 34 30 3으로 나온다. 하지만 가장 큰 수는 34330이다. 이 방식을 구현하지 못함.
```jsx
function solution(numbers) {
    var answer = '';
    const arr = numbers.map((item)=> item.toString().split("")).sort((a,b)=>{
        if(a[0] < b[0]) return 1;
        else if(a[0] > b[0])return -1;
        else{
            if(a.join() < b.join())return 1;
            else if(a.join() > b.join())return -1;
            else return 0;
        }
    }).map(item2=> {
        item2.map(item3=> answer += item3);
    });
    return answer;
}
```

### 풀이
1. numbers를 문자열로 바꾸고 sort한다.
2. sort는 (b+a)-(a+b) 덧셈값으로 sort해준다. ex) ("3"+ "30") - ("30" + "3")
```jsx
function solution(numbers) {
    let answer = numbers.map((item)=>item.toString()).sort((a,b)=> b+a - (a+b)).join('');
    return answer[0] === '0' ? '0' : answer;
}
```

### 느낀점
1. sort를 할 떄 a,b가 아닌 a+b도 이용할 수 있다.
