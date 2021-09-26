### 문제
알고스팟 운영진이 모두 미로에 갇혔다. 미로는 N*M 크기이며, 총 1*1크기의 방으로 이루어져 있다. 미로는 빈 방 또는 벽으로 이루어져 있고, 빈 방은 자유롭게 다닐 수 있지만, 벽은 부수지 않으면 이동할 수 없다.

알고스팟 운영진은 여러명이지만, 항상 모두 같은 방에 있어야 한다. 즉, 여러 명이 다른 방에 있을 수는 없다. 어떤 방에서 이동할 수 있는 방은 상하좌우로 인접한 빈 방이다. 즉, 현재 운영진이 (x, y)에 있을 때, 이동할 수 있는 방은 (x+1, y), (x, y+1), (x-1, y), (x, y-1) 이다. 단, 미로의 밖으로 이동 할 수는 없다.

벽은 평소에는 이동할 수 없지만, 알고스팟의 무기 AOJ를 이용해 벽을 부수어 버릴 수 있다. 벽을 부수면, 빈 방과 동일한 방으로 변한다.

만약 이 문제가 알고스팟에 있다면, 운영진들은 궁극의 무기 sudo를 이용해 벽을 한 번에 다 없애버릴 수 있지만, 안타깝게도 이 문제는 Baekjoon Online Judge에 수록되어 있기 때문에, sudo를 사용할 수 없다.

현재 (1, 1)에 있는 알고스팟 운영진이 (N, M)으로 이동하려면 벽을 최소 몇 개 부수어야 하는지 구하는 프로그램을 작성하시오.

### 입력
첫째 줄에 미로의 크기를 나타내는 가로 크기 M, 세로 크기 N (1 ≤ N, M ≤ 100)이 주어진다. 다음 N개의 줄에는 미로의 상태를 나타내는 숫자 0과 1이 주어진다. 0은 빈 방을 의미하고, 1은 벽을 의미한다.

(1, 1)과 (N, M)은 항상 뚫려있다.

### 출력
첫째 줄에 알고스팟 운영진이 (N, M)으로 이동하기 위해 벽을 최소 몇 개 부수어야 하는지 출력한다.
예제 입력1
```jsx
3 3
011
111
110
```
예제 출력1
```jsx
3
```
### 예제 입력 2 
```jsx
4 2
0001
1000
```
예제 출력 2 
```jsx
0
```

### 풀이
* 최소값을 구하는 것이므로 DFS보다 BFS가 적합하므로 BFS를 적용했다.
1. dx,dy로 움직일 수 있는 거리를 설정한다.
2. col,row로 미로의 크기를 넘어갈 경우를 제한하기 위해 변수를 선언해준다.
3. 이미 지나온 곳을 체크하기 위한 checkRoom 변수를 선언한다.
4. bfs를 구현하기 위한 queue라는 변수에 현재의 위치, 벽을 부순 횟수를 같이 넣어준다.
5. while문에 bfs를 구현한다.
```jsx
const fs = require("fs");
let input = fs
  .readFileSync("./input.txt")
  .toString()
  .trim()
  .split(/\s*,\s*|\s+/);

const n = [input[0], input[1]];
const room = input.slice(2, input.length + 1).map((v) => v.split(""));
const solution = (n, room) => {
  const dx = [1, 0, -1, 0];
  const dy = [0, 1, 0, -1];
  const [col, row] = n;
  const checkRoom = room.map((item) => item.map((item2) => (item2 = 0)));
  const queue = [[0, 0, 0]];
  while (queue.length) {
    const [cx, cy, cnt] = queue.shift();
    if (cx === row - 1 && cy === col - 1) {
      console.log(cnt);
      break;
    }
    for (let i = 0; i <= dx.length - 1; i++) {
      const mx = cx + dx[i];
      const my = cy + dy[i];
      if (mx >= 0 && my >= 0 && mx <= row - 1 && my <= col - 1) {
        if (checkRoom[mx][my]) continue;
        checkRoom[mx][my] = 1;
        if (room[mx][my] === "1") {
          room[mx][my] = 0;
          queue.push([mx, my, cnt + 1]);
        } else {
          queue.unshift([mx, my, cnt]);
        }
      }
    }
  }
};

solution(n, room);

```
