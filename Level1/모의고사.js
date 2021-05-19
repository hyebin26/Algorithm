function solution(answers) {
    var answer = [];
    const a1 = [1,2,3,4,5];
    const a2 = [2,1,2,3,2,4,2,5];
    const a3 = [3,3,1,1,2,2,4,4,5,5];
    
    const a1c = answers.filter((a,i) => a === a1[i % a1.length]).length;
    const a2c = answers.filter((a,i) => a === a2[i % a2.length]).length;
    const a3c = answers.filter((a,i) => a === a3[i % a3.length]).length;
    const max = Math.max(a1c, a2c, a3c);
    
    if(a1c === max){
        answer.push(1)
    };
    if(a2c === max){
        answer.push(2)
    }
    if(a3c === max){
        answer.push(3)
    };
    
    return answer;
}

// 해결못함 
// 이유: 문제에 접근을 완벽하게 잘못함 
// a1,a2,a3의 규칙을 찾는 것에 집중함.
