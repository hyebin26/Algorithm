### **문제 설명**

N개의 마을로 이루어진 나라가 있습니다. 이 나라의 각 마을에는 1부터 N까지의 번호가 각각 하나씩 부여되어 있습니다. 각 마을은 양방향으로 통행할 수 있는 도로로 연결되어 있는데, 서로 다른 마을 간에 이동할 때는 이 도로를 지나야 합니다. 도로를 지날 때 걸리는 시간은 도로별로 다릅니다. 현재 1번 마을에 있는 음식점에서 각 마을로 음식 배달을 하려고 합니다. 각 마을로부터 음식 주문을 받으려고 하는데, N개의 마을 중에서 K 시간 이하로 배달이 가능한 마을에서만 주문을 받으려고 합니다. 다음은 N = 5, K = 3인 경우의 예시입니다.

![https://grepp-programmers.s3.ap-northeast-2.amazonaws.com/files/production/d7779d88-084c-4ffa-ae9f-2a42f97d3bbf/%E1%84%87%E1%85%A2%E1%84%83%E1%85%A1%E1%86%AF_1_uxun8t.png](https://grepp-programmers.s3.ap-northeast-2.amazonaws.com/files/production/d7779d88-084c-4ffa-ae9f-2a42f97d3bbf/%E1%84%87%E1%85%A2%E1%84%83%E1%85%A1%E1%86%AF_1_uxun8t.png)

위 그림에서 1번 마을에 있는 음식점은 [1, 2, 4, 5] 번 마을까지는 3 이하의 시간에 배달할 수 있습니다. 그러나 3번 마을까지는 3시간 이내로 배달할 수 있는 경로가 없으므로 3번 마을에서는 주문을 받지 않습니다. 따라서 1번 마을에 있는 음식점이 배달 주문을 받을 수 있는 마을은 4개가 됩니다.마을의 개수 N, 각 마을을 연결하는 도로의 정보 road, 음식 배달이 가능한 시간 K가 매개변수로 주어질 때, 음식 주문을 받을 수 있는 마을의 개수를 return 하도록 solution 함수를 완성해주세요.

### 제한사항

- 마을의 개수 N은 1 이상 50 이하의 자연수입니다.
- road의 길이(도로 정보의 개수)는 1 이상 2,000 이하입니다.
- road의 각 원소는 마을을 연결하고 있는 각 도로의 정보를 나타냅니다.
- road는 길이가 3인 배열이며, 순서대로 (a, b, c)를 나타냅니다.
    - a, b(1 ≤ a, b ≤ N, a != b)는 도로가 연결하는 두 마을의 번호이며, c(1 ≤ c ≤ 10,000, c는 자연수)는 도로를 지나는데 걸리는 시간입니다.
    - 두 마을 a, b를 연결하는 도로는 여러 개가 있을 수 있습니다.
    - 한 도로의 정보가 여러 번 중복해서 주어지지 않습니다.
- K는 음식 배달이 가능한 시간을 나타내며, 1 이상 500,000 이하입니다.
- 임의의 두 마을간에 항상 이동 가능한 경로가 존재합니다.
- 1번 마을에 있는 음식점이 K 이하의 시간에 배달이 가능한 마을의 개수를 return 하면 됩니다.

### 나의풀이 
- BFS로 풀이를 하려고 했으나 구현하지 못했다.
```jsx
function solution(N, road, K) {
    var answer = 0;
    let obj = {};
    let check = false;
    road.forEach((ele)=>{
        if(obj[ele[0]]) obj[ele[0]].push([ele[1],ele[2]])
        else obj[ele[0]] = [[ele[1],ele[2]]]
        if(obj[ele[1]]) obj[ele[1]].push([ele[0],ele[2]])
        else obj[ele[1]] = [[ele[0],ele[2]]]
    });
    for(let i = 1;i<= N;i++){
      if(i === 1) answer++;
      else check = bfs(obj,1,i,K);
      if(check) answer++;
    }
    function bfs(_obj,_start,_i,_k){
        const queue = [];
        let cnt = 0;
        queue.push(_obj[_start]);
        const visitCheck = [];
        while(queue.length){
            const [road,roadCnt] = queue.shift()[0];
            cnt += roadCnt;
            if(visitCheck.includes(road)) continue;
            else queue.push(_obj[road]);
            if(road === _i && cnt <= _k) {
                return true;
                break;
            }
            if(cnt > _k) continue; 
        }
    }
    return answer;
}
```

### 풀이 
1. 다익스트라 알고리즘 풀이이다.
2. 우선 dist 배열을 선언하고 각 요소가 걸리는 시간을 계산하지 않았으므로 Infinity를 선언해준다.
3. 노드에 도달했을 때 dist에 저장된 걸리는 시간이 현재 노드에 걸리는 시간보다 길다면 변경해준다.
- ex) dist[2] = Infinity이고 현재 2라는 노드에 걸린 시간이 2일 경우 => dist[2] = 2로 변경해준다.
4. dist.fillter로 K보다 같거나 작은 요소의 길이를 리턴한다.
```jsx
function solution(N, road, K) {
    const dist = Array(N+1).fill(Infinity)
    const adj = Array.from({length:N+1},()=>[]);
    road.forEach(([a,b,c])=>{
        adj[a].push({to:b,time:c});
        adj[b].push({to:a,time:c});
    }); 
    const pq = [{to:1,time:0}];
    dist[1] = 0;
    while(pq.length){
        let {to,time} = pq.pop();
        adj[to].forEach(next =>{
            if(dist[next.to] > dist[to] + next.time){
                dist[next.to] = dist[to] + next.time;
                pq.push(next);
            }
        })
    }
    return dist.filter((item)=> item <= K).length;
}
```

### 느낀점 
1. BFS로 구현해보려고 했지만 visit부분도 그렇고 전체적으로 체계가 안잡혀있어서 코드로 구현하지 못했다.
2. 이해할 때 까지 코드를 계속작성해봤는데 이 방법이 제일 좋은 방법인 것 같다. 
