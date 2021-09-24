### 문제
수빈이는 동생과 숨바꼭질을 하고 있다. 수빈이는 현재 점 N(0 ≤ N ≤ 100,000)에 있고, 동생은 점 K(0 ≤ K ≤ 100,000)에 있다. 수빈이는 걷거나 순간이동을 할 수 있다. 만약, 수빈이의 위치가 X일 때 걷는다면 1초 후에 X-1 또는 X+1로 이동하게 된다. 순간이동을 하는 경우에는 1초 후에 2*X의 위치로 이동하게 된다.

수빈이와 동생의 위치가 주어졌을 때, 수빈이가 동생을 찾을 수 있는 가장 빠른 시간이 몇 초 후인지 구하는 프로그램을 작성하시오.

### 입력
첫 번째 줄에 수빈이가 있는 위치 N과 동생이 있는 위치 K가 주어진다. N과 K는 정수이다.

### 출력
수빈이가 동생을 찾는 가장 빠른 시간을 출력한다.

예제 입력 1 
```jsx
5 17
```

예제 출력 1 
```jsx
4
```
### 풀이 
- 틀린이유: 처음 풀이에 앞으로 걷기, 뒤로 걷기, 순간이동의 3가지를 비교하고 K의 값과 가장 가까울 경우 현재 위치를 변경하고 초를 더하는 방식으로 풀었으나 가장 빠르게 도착하는 방법을 구현하지 못함.
![2](https://user-images.githubusercontent.com/67263146/134632196-898efef3-0c0b-47af-b676-023f3816a075.png)
- 예를 들어 8,18을 출력받을 때 8 * 2 = 16 => 16 + 1 = 17 => 17 + 1 = 18 이러한 방식보다 8 + 1 = 9 => 9 * 2 = 18 이 경우가 더 빠르다.
- 즉, 위의 그림처럼 3가지(앞으로걷기, 뒤로 걷기, 순간이동)의 방식 전부를 일일히 확인해야 한다. => BFS
- 그리고 가장 빠른 경우를 구하는 것이므로 방문한 적이 있는 경우(이미 더 빠른 시간에 그 숫자를 방문한 경우)는 continue를 통해 생략한다.

```jsx
const fs = require("fs");
let input = fs.readFileSync("./input.txt").toString().split(" ").map(Number);

const sol = (input) => {
  const [START, END] = input;
  const visited = Array(100001).fill(false);

  const queue = [[START, 0]];
  while (queue.length) {
    const [pos, t] = queue.shift();
    if (visited[pos]) {
      continue;
    }

    visited[pos] = true;
    if (pos === END) {
      console.log(t);
      break;
    }

    if (pos * 2 <= 100000) {
      queue.push([pos * 2, t + 1]);
    }
    if (pos + 1 <= 100000) {
      queue.push([pos + 1, t + 1]);
    }
    if (pos - 1 >= 0) {
      queue.push([pos - 1, t + 1]);
    }
  }
};

sol(input);
```

### 느낀점
- BFS 관련 문제가 이해가 되지 않아서 많은 문제를 접해보기 위해 백준에서 풀어보려고 했으나 nodejs로 문제를 풀었고 BFS가 이해가 아직 잘 되지 않아서 여러 문제를 접해서 익숙해져야 겠다.

참고 : <a href="https://chanhuiseok.github.io/posts/baek-14/">https://chanhuiseok.github.io/posts/baek-14/</a>

<a href="https://gywlsp.github.io/boj/1697/">https://gywlsp.github.io/boj/1697/</a>
