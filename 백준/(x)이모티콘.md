### 문제
영선이는 매우 기쁘기 때문에, 효빈이에게 스마일 이모티콘을 S개 보내려고 한다.

영선이는 이미 화면에 이모티콘 1개를 입력했다. 이제, 다음과 같은 3가지 연산만 사용해서 이모티콘을 S개 만들어 보려고 한다.

화면에 있는 이모티콘을 모두 복사해서 클립보드에 저장한다.
클립보드에 있는 모든 이모티콘을 화면에 붙여넣기 한다.
화면에 있는 이모티콘 중 하나를 삭제한다.
모든 연산은 1초가 걸린다. 또, 클립보드에 이모티콘을 복사하면 이전에 클립보드에 있던 내용은 덮어쓰기가 된다. 클립보드가 비어있는 상태에는 붙여넣기를 할 수 없으며, 일부만 클립보드에 복사할 수는 없다. 또한, 클립보드에 있는 이모티콘 중 일부를 삭제할 수 없다. 화면에 이모티콘을 붙여넣기 하면, 클립보드에 있는 이모티콘의 개수가 화면에 추가된다.

영선이가 S개의 이모티콘을 화면에 만드는데 걸리는 시간의 최솟값을 구하는 프로그램을 작성하시오.

### 입력
첫째 줄에 S (2 ≤ S ≤ 1000) 가 주어진다.

### 출력
첫째 줄에 이모티콘을 S개 만들기 위해 필요한 시간의 최솟값을 출력한다.

예제 입력 1
```jsx
2
```
예제 출력 1
```jsx
2
```
예제 입력 2
```jsx
4
```
예제 출력 2
```jsx
4
```

### 나의풀이
* 틀린이유: 시간초과가 나옴 => 이미 왔던 곳을 계속 들림, check라는 배열로 방문한 곳을 체크
1. 시간의 최소값을 구하는 것으로 DFS보다 BFS가 적합하다.
2. 방문한 곳을 체크하기 위해 check배열을 만든다.
3. while문에서 현재 이모티콘, 클립보드에 있는 이모티콘, 시간을 queue배열 첫 번째 열에서 가져온다.
4. 경우 1,2,3을 다 해야 하므로 for문에 경우 1,2,3을 구현하고 방문하지 않은 곳은 방문하고 방문하면 check해준다.
5. 현재 이모티콘 + 클립보드에 있는 이모티콘의 합이 출력값과 같은 경우 queue에 가장 앞으로 가져오고 시간을 출력한다.
```jsx
const fs = require("fs");
let input = Number(fs.readFileSync("/dev/stdin").toString());

const solution = (n) => {
  const MAX_SIZE = 1000;
  const check = Array.from({ length: MAX_SIZE + 1 }, () =>
    Array(MAX_SIZE + 1).fill(0)
  );
  const queue = [[1, 0, 0]];
  check[1][0] = 1;
  while (queue.length) {
    const [show, clipboard, cnt] = queue.shift();
    if (show === n) {
      console.log(cnt);
      break;
    }
    if (show > MAX_SIZE) continue;
    for (let i = 0; i <= 2; i++) {
      if (i === 0) {
        if (!check[show][show]) {
          check[show][show] = 1;
          queue.push([show, show, cnt + 1]);
        }
      }
      if (i === 1) {
        if (clipboard && show + clipboard <= MAX_SIZE) {
          if (!check[show + clipboard][clipboard]) {
            if (show + clipboard === n) {
              queue.unshift([show + clipboard, 0, cnt + 1]);
            } else {
              check[show + clipboard][clipboard] = 1;
              queue.push([show + clipboard, clipboard, cnt + 1]);
            }
          }
        }
      }
      if (i === 2) {
        if (show && !check[show - 1][clipboard] && show >= 2) {
          check[show - 1][clipboard] = 1;
          queue.push([show - 1, clipboard, cnt + 1]);
        }
      }
    }
  }
};

solution(input);

```
