### **문제 설명**

트럭 여러 대가 강을 가로지르는 일차선 다리를 정해진 순으로 건너려 합니다. 모든 트럭이 다리를 건너려면 최소 몇 초가 걸리는지 알아내야 합니다. 다리에는 트럭이 최대 bridge_length대 올라갈 수 있으며, 다리는 weight 이하까지의 무게를 견딜 수 있습니다. 단, 다리에 완전히 오르지 않은 트럭의 무게는 무시합니다.

예를 들어, 트럭 2대가 올라갈 수 있고 무게를 10kg까지 견디는 다리가 있습니다. 무게가 [7, 4, 5, 6]kg인 트럭이 순서대로 최단 시간 안에 다리를 건너려면 다음과 같이 건너야 합니다.

따라서, 모든 트럭이 다리를 지나려면 최소 8초가 걸립니다.

solution 함수의 매개변수로 다리에 올라갈 수 있는 트럭 수 bridge_length, 다리가 견딜 수 있는 무게 weight, 트럭 별 무게 truck_weights가 주어집니다. 이때 모든 트럭이 다리를 건너려면 최소 몇 초가 걸리는지 return 하도록 solution 함수를 완성하세요.

| 경과 시간 | 다리를 지난 트럭 | 다리를 건너는 트럭 | 대기 트럭 |
|-----------|------------------|--------------------|-----------|
| 0         | []               | []                 | [7,4,5,6] |
| 1~2       | []               | [7]                | [4,5,6]   |
| 3         | [7]              | [4]                | [5,6]     |
| 4         | [7]              | [4,5]              | [6]       |
| 5         | [7,4]            | [5]                | [6]       |
| 6~7       | [7,4,5]          | [6]                | []        |
| 8         | [7,4,5,6]        | []                 | []        |

### 제한 조건

- bridge_length는 1 이상 10,000 이하입니다.
- weight는 1 이상 10,000 이하입니다.
- truck_weights의 길이는 1 이상 10,000 이하입니다.
- 모든 트럭의 무게는 1 이상 weight 이하입니다.

### 나의풀이 
1. 도로를 지나가는 passRoad라는 배열을 만들고 반복문으로 passLoad에 아무것도 존재하지 않을 떄 혹은 다리의 무게가 초과되지 않을 때 passRoad에truck_weights에 맨 앞에 있는 것을 푸시해준다.
2. 트럭이 도로에 있는 시간이 다리의 길이와 같아졌을 때 passRoad에서 삭제해주고 passRoad에 다른 트럭이 존재하지 않을 시 cnt를 초기화를 하고 트럭이 존재할 시는 시간을 초기화 해주지 않는다.
3. 그리고 passRoad에 길이가 0일 반복문을 멈추고 시간을 리턴해준다.
- 틀린이유: 다음 차가 첫 순서 바로 다음에 들어오는건 구현했지만(2번에 cnt--) 차가 passRoad를 통과하고 바로 다음에 들어오는 경우를 구현하지 못함
```jsx
function solution(bridge_length, weight, truck_weights) {
    var second = 0;
    let passRoad = [];
    let cnt = 0;
    while(true){
        cnt++;
        second++;
        if(passRoad.length === 0 && truck_weights.length !== 0){
            const passTruck = truck_weights.shift();
            passRoad.push(passTruck);            
        }
        else if(passRoad.length !== 0 && weight >= Math.max(...passRoad) + truck_weights[0]){
            const passTruck = truck_weights.shift();
            passRoad.push(passTruck);
            
        }
        if(passRoad.length === 0){
            break;
        }
        if(cnt === bridge_length){
            passRoad.shift();
            if(passRoad.length === 0){
                cnt = 0;
            }
            else{
                cnt--;
            }
        }
    }
    return second
}
```

## 오답풀이
1. 내가 푼 풀이에서 틀린 부분인 다리에 존재하는 차가 통과하는 시간을 bridge_length + 현재의 시간(time)으로 정해주었다.
2. 그리고 대기하고 있는 차가 들어오지 못하고 있을 경우는 시간을 가장 앞에 있는 차가 나가는 시간으로 점프해주었다.
```jsx
function solution(bridge_length, weight, truck_weights) {
   let time = 0, qu=[[0,0]], weightOnBridge = 0;
   while(qu.length > 0 || truck_weights.length >0){
       if(qu[0][1] === time) weightOnBridge -= qu.shift()[0];
       if(weightOnBridge + truck_weights[0] <= weight){
           weightOnBridge += truck_weights[0];
           qu.push([truck_weights.shift(),time + bridge_length]);
       }
       else{
           if(qu[0]) time = qu[0][1] -1;
       };
       time++;
   }
    return time;
}
```

### 느낀점 
1. 차가 도로를 통과하는 시간을 1초씩 증가하는 것이 아닌 도로에 들어올 떄 나가는 시간을 배열 안에 같이 넣었어야 했다. 구현되지 않을 때 다른 방법 체크하기
2. 무조건 경과시간을 1초씩 증가시키는 것에 중점을 두지 않기.

### 다시 풀기 
```jsx
function solution(bridge_length, weight, truck_weights) {
    let time = 0;
    let bridge = [[0,0]];  
    while(bridge.length || truck_weights.length){
        if(bridge[0][1] === time){
            bridge.shift();
        } 
        const bridgeSum = bridge.reduce((pre,cur)=>[pre[0]+cur[0]],[0])[0];
        if(bridgeSum + truck_weights[0] <= weight){
            bridge.push([truck_weights.shift(),time + bridge_length])
        }
        else{
            if(bridge[0]) time = bridge[0][1] - 1;
        }
        time++;
    }
    return time;
}
```

### 틀린이유
1. 우선 reduce를 사용해서 배열의 [0]번째있는 수의 합을 구하려고 했으나 return pre[0] + cur[0]로 리턴을 해서 타입 오류가 발생했다. 
2. keyPoint는 bridge배열안에 이 트럭이 다리를 통과할 수 있는 시간과, 무게를 같이 푸시하는 것이다. => 이유는 트럭이 다리를 통과하는 시간을 같이 넣지 않으면 다리에 여러개의 트럭이 존재할 경우 일일히 나가는 시간을 계산할 수가 없음.
