### **문제 설명** 
참고: <a href="https://programmers.co.kr/learn/courses/30/lessons/17684">https://programmers.co.kr/learn/courses/30/lessons/17684</a> 
### 나의풀이 
1. ALPA라는 배열에 A~Z까지의 알파벳을 push한다.
2. 반복문으로 문자열을 하나씩 넣고 알파벳이 ALPA배열에 존재하지 않으면 사전에 추가 하고 색인번호를 출력한다.
- 재귀함수를 이용해서 구현하려 했으나 리턴값을 정하는 것이랑 문자열 넣는 것을 구현하지 못했다.
```jsx
function solution(msg) {
    // 포함하지 않으면 사전에 추가 후 색인 번호 출력
    var answer = [];
    const ALPA = [];
    const uniA = "A".charCodeAt();
    const uniZ = "Z".charCodeAt();
    let msgStr  = "";
    let msgNum = 0;
    for(let i = uniA;i<=uniZ;i++){
        ALPA.push(String.fromCharCode(i));
    };
    for(let i =0;i <= msg.length-1;i++){
        msgStr = "";
        msgNum = 0;
        answer.push(i);
    }
    function check(num){
         msgStr += msg[num]; 
         msgNum = ALPA.indexOf(msgStr);
         if(ALPA.indexOf(msgStr) > -1){
             check(num+1);
             return msgNum + 1;
         }else{
             ALPA.push(msgStr);
             return msgNum+1;
         }
    }
    return answer;
};
```
### 다른 사람풀이
* 내가 구현하지 못한 점은 재귀함수를 이용할 떄 리턴값을 설정해주는 것, msg문자열의 길이를 변경하는 것을 생각해내지 못했다.
1. while문안에 for문으로 temp 라는 문자열에 msg.slice(0,i+1)을 해주어서 M배열에 중복된 값이 있는지 체크한다.
2. 중복된 값이 없을 경우 예를 들어 현재 temp = "KA"일 경우 slice로 문자열을 자르고 "K"만 M.indexOf로 answer에 푸시해준다.
3. M에 temp를 푸시해주고 msg의 길이를 변경해준다.  
```jsx
function solution(msg) {
    let M ="ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
    let answer = [];
    while(msg.length > 0){
        let temp = "";
        let num = 0;
        for(let i = 0; i<=msg.length-1;i++){
            temp = msg.slice(0,i+1);
            if(M.indexOf(temp) === -1){
                answer.push(M.indexOf(temp.slice(0,temp.length-1))+1);
                num = i;
                break;
            }
            if(i === msg.length-1){
                answer.push(M.indexOf(temp)+1);
                num = i+1;
            }
        }
        M.push(temp);
        msg = msg.slice(num);
    }
    return answer;
};
```

### 느낀점
1. 재귀함수가 너무 어렵고 머리속으로 구현이 너무 복잡하다.
2. 문자열을 자를 때 str += ""로하는 것이 아니라 slice로 하는 것이 더 간편했따.
