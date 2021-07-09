## 참고
- <a href="https://ryusm.tistory.com/48">https://ryusm.tistory.com/48</a>
- <a href="https://www.youtube.com/watch?v=66ZKz-FktXo&t=161s">https://www.youtube.com/watch?v=66ZKz-FktXo&t=161s</a>
- <a href="https://www.youtube.com/watch?v=66ZKz-FktXo&t=161s">https://www.youtube.com/watch?v=66ZKz-FktXo&t=161s</a>

프로그래머스 알고리즘 문제를 풀다가 DFS,BFS관련 코드를 작성하기 어려워 이론을 이해하려고 작성하게 되었습니다.

## 설명
- BFS : Breathe First Search 너비우선탐색으로 탐색을 할 때 넓이를 우선으로 탐색하는 알고리즘입니다. ex) 최단거리, 친구 추천
- DFS : Deepth First Search 깊이우선탐색으로 탐색을 할 때 깊이를 우선으로 탐색하는 알고리즘입니다. ex) 미로게임에서 경로존재판별

![image](https://www.fun-coding.org/00_Images/BFSDFS.png)
- BFS 방식: A - B - C - D - G - H - I - E - F - J
- DFS 방식: A - B - D - E - F - C - G - H - I - J

## BFS 
- 구현: Queue => 선입선출로 안의 노드를 처리합니다.
- 위의 이미지 처리 순서 
1. A가 큐로 들어갑니다. A는 방문처리를 하고 해당 노드에 연결된 노드 중 방문하지 않는 노드를 방문하고 큐에 들어오게 됩니다.
2. 차례대로 B,C가 큐에 들어가고 B가 처리되고 B와 연결된 D가 큐에 들어옵니다. 이미지 참고
<img src="https://user-images.githubusercontent.com/67263146/125028788-994ae900-e0c3-11eb-8125-0fcda777fcc7.png"  width="500" height="180">
3. 이제 앞에 있는 C가 A,B가 있는 방문처리를 한 큐로 들어가게 되고 연결된 노드 중 방문하지 않은 G,H,I가 큐에 들어가게 됩니다.

4. 위의 방식대로 앞에 있는 노드부터 순서대로 처리됩니다.


```jsx
const graph = { 
  A: ["B", "C"],
  B: ["A", "D"],
  C: ["A", "G", "H", "I"],
  D: ["B", "E", "F"],
  E: ["D"],
  F: ["D"],
  G: ["C"],
  H: ["C"],
  I: ["C", "J"],
  J: ["I"]
};

const bfs = (graph, startNode) => {
  let visited = [];
  let needVisit = [];

  needVisit.push(startNode);

  while (needVisit.length !== 0) {
    const node = needVisit.shift();
    if (!visited.includes(node)) {
      visited.push(node);
      needVisit = [...needVisit, ...graph[node]];
    }
  }
  return visited;
};

console.log(bfs(graph, "A"));
```
## DFS
- 구현: Stack => 후입선출로 가장 마지막에 삽입된 자료를 먼저 처리됩니다 
- 위의 이미지 처리 순서
1. A를 스택에 넣고 처리하고 인접한 노드 중 방문하지 않은 노드 B가 스택에 들어갑니다.
2. 그리고 B를 처리하고 인접한 노드중 방문하지 않은 노드 D가 처리되고 그 다음 E, F가 처리됩니다.
3. 그 후 인접한 노드를 다 처리하고 C 관련 노드를 다 처리합니다.
```jsx
const graph = {
  A: ["B", "C"],
  B: ["A", "D"],
  C: ["A", "G", "H", "I"],
  D: ["B", "E", "F"],
  E: ["D"],
  F: ["D"],
  G: ["C"],
  H: ["C"],
  I: ["C", "J"],
  J: ["I"]
};
const dfs = (graph, startNode) => {
  let needVisitStack = [];
  let visitedQueue = [];

  needVisitStack.push(startNode);

  while (needVisitStack.length !== 0) {
    const node = needVisitStack.pop();
    if (!visitedQueue.includes(node)) {
      visitedQueue.push(node);
      needVisitStack = [...needVisitStack, ...graph[node]];
    }
  }
  return visitedQueue;
};

console.log(dfs(graph,"A"));
```

## 노드 
- Node : 네트워크에서 특정 지점을 가리키는 말입니다.
- DOM에서도 비슷하고 DOM에서 Node객체는 DOM에서의 최상위 객체입니다. 즉, 문서는 곧 노드의 집합이고 연결해주는 링크는 가지, 그리고 노드는 잎사귀가 되는 것입니다.
