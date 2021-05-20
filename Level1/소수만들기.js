// function MySolution(nums) {
//     const sum = [];
//     for(let i =0; i <= nums.length - 1;i++){
//         for(let k = i + 1; k <= nums.length - 2; k++){            
//             for(let j = k + 1; j <= nums.length - 1; j++){
//                 if(nums[i] + nums[k] + nums[j] === 1){}
//                 else if(nums[i] + nums[k] + nums[j] === 7||
//                   nums[i] + nums[k] + nums[j] === 2 ||
//                   nums[i] + nums[k] + nums[j] === 3||
//                   nums[i]+ nums[k] + nums[j] === 5){
//                     sum.push(nums[i] + nums[k] + nums[j])
//                 }
//                  else if(
//                       (nums[i]+ nums[k] + nums[j]) % 2 !== 0 &&
//                       (nums[i]+ nums[k] + nums[j]) % 3 !== 0 &&
//                       (nums[i] + nums[k] + nums[j]) % 5 !== 0 && 
//                       (nums[i] + nums[k] + nums[j]) % 7 !== 0
//                     ){
//                       sum.push(nums[i] + nums[k] + nums[j] )
//                   } 
//                }
//             }
//         }
//     const asnwer = sum.length;
//     return asnwer;
// }

function solution(nums){
    let answer = 0;
    for(let i = 0; i< nums.length; i++ ){
        for(let j = i + 1; j <nums.length; j++){
            for(let k = j + 1; k<nums.length; k++){
                const sum = nums[i] + nums[j] + nums[k];
                if(isSoSoo(sum)) answer++;
            }
        }
    }
    function isSoSoo(number){
        if(number ===1) return false;
        if(number ===2) return true;
        if(number <0) return false;
        for(let i =2; i < number; i++){
            if(number % i === 0)return false;
        }
        return true;
    }
    return answer;
}

// 오답: 57.7점
// 1. 틀린 이유 : 예를 들어 121 같은 수는 2,3,5,7로 나뉘어 지지 않으나 11로는 나누어지므로 소수가 아니다. 
//           그러므로 2,3,5,7만 나누는 것이 아니라 121보다 작은 수 모두를 나누어서 몫이 0으로 떨어지는지 확인해야한다.
// 2. 하나의 함수에 하나의 역할만 주기: 위에 for문처럼 for문에 반복 뿐만 아니라 복잡한 다른 if,다른 함수를 넣으면 
//    가독성이 많이 떨어짐 => for문에는 for문만 넣고 다른 함수를 호출해서 사용하기
