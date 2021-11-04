### **문제 설명**

레스토랑을 운영하던 `스카피`는 코로나19로 인한 불경기를 극복하고자 메뉴를 새로 구성하려고 고민하고 있습니다.기존에는 단품으로만 제공하던 메뉴를 조합해서 코스요리 형태로 재구성해서 새로운 메뉴를 제공하기로 결정했습니다. 어떤 단품메뉴들을 조합해서 코스요리 메뉴로 구성하면 좋을 지 고민하던 "스카피"는 이전에 각 손님들이 주문할 때 가장 많이 함께 주문한 단품메뉴들을 코스요리 메뉴로 구성하기로 했습니다.단, 코스요리 메뉴는 최소 2가지 이상의 단품메뉴로 구성하려고 합니다. 또한, 최소 2명 이상의 손님으로부터 주문된 단품메뉴 조합에 대해서만 코스요리 메뉴 후보에 포함하기로 했습니다.

예를 들어, 손님 6명이 주문한 단품메뉴들의 조합이 다음과 같다면,(각 손님은 단품메뉴를 2개 이상 주문해야 하며, 각 단품메뉴는 A ~ Z의 알파벳 대문자로 표기합니다.)

가장 많이 함께 주문된 단품메뉴 조합에 따라 "스카피"가 만들게 될 코스요리 메뉴 구성 후보는 다음과 같습니다.

---

### **[문제]**

각 손님들이 주문한 단품메뉴들이 문자열 형식으로 담긴 배열 orders, "스카피"가 `추가하고 싶어하는` 코스요리를 구성하는 단품메뉴들의 갯수가 담긴 배열 course가 매개변수로 주어질 때, "스카피"가 새로 추가하게 될 코스요리의 메뉴 구성을 문자열 형태로 배열에 담아 return 하도록 solution 함수를 완성해 주세요.

### **[제한사항]**

- orders 배열의 크기는 2 이상 20 이하입니다.
- orders 배열의 각 원소는 크기가 2 이상 10 이하인 문자열입니다.
    - 각 문자열은 알파벳 대문자로만 이루어져 있습니다.
    - 각 문자열에는 같은 알파벳이 중복해서 들어있지 않습니다.
- course 배열의 크기는 1 이상 10 이하입니다.
    - course 배열의 각 원소는 2 이상 10 이하인 자연수가 `오름차순`으로 정렬되어 있습니다.
    - course 배열에는 같은 값이 중복해서 들어있지 않습니다.
- 정답은 각 코스요리 메뉴의 구성을 문자열 형식으로 배열에 담아 사전 순으로 `오름차순` 정렬해서 return 해주세요.
    - 배열의 각 원소에 저장된 문자열 또한 알파벳 `오름차순`으로 정렬되어야 합니다.
    - 만약 가장 많이 함께 주문된 메뉴 구성이 여러 개라면, 모두 배열에 담아 return 하면 됩니다.
    - orders와 course 매개변수는 return 하는 배열의 길이가 1 이상이 되도록 주어집니다.
    
### 나의풀이
* 일일히 하나씩 경우의 수를 따지고 싶었으나 구현하지 못했다.
* ABCFG면 [AB],[AC],[AF],[AG] 이 순서로 들어가는 것을 구현하려고 했으나 재귀함수를 어떻게 사용해야 될지 몰라서 구현하지 못햇따.

### 풀이
* 우선 Map을 사용한 이유는 객체보다 사용할 수 있는 메소드가 더 많으며, 직관적이다.
* 키포인트는 조합을 재귀함수로 구현하는 것이다.
1. menu의 key를 계속해서 변경해야 하므로 object가 아닌 Map을 사용해주었다.
2. 재귀함수를 만들 때 필요한 것을 먼저 정해줘야 한다.
- (orders의 문자열, 순서에 맞게 value를 추가할 수 있는 index ,course의 숫자,이전의 value)
3. 재귀 함수가 끝나면 배열로 변경하고 filter로 한 개만 존재하는 것을 삭제한다.
4. course의 map으로 각 제한 숫자마다 max의 값을 설정하고 max의 값과 같은 것을 result에 푸시하고 sort한다.
```jsx
function solution(orders, course) {
    let menu = new Map();
    function combination(order,idx,len,prev){ 
        const menu_key = prev.sort().join("");
        if(len === prev.length){
           if(menu.has(menu_key)){
               menu.set(menu_key,menu.get(menu_key)+1)
           }else {
               menu.set(menu_key,1)
           }
            return ;
        }
        for(let i = idx; i< order.length;i++){
            combination(order,i+1,len,[...prev,order[i]]);
        }
    }
    orders.map(order =>{
        course.map(num => combination(order,0,num,[]))
    })
    menu = [...menu.entries()].filter(item => item[1] > 1);
    let max = 0;
    let result = [];
    course.map(num =>{
        max = 0;
        menu.map(item =>{
            if(num === item[0].length){
                if(max < item[1])max = item[1];
            }
        })
        menu.map(item =>{
            if(item[0].length === num && item[1] === max) result.push(item[0])
        })
    });
    return result.sort();
}
```

### 느낀점
1. 재귀함수를 구현할 때 손으로 순서를 적으면서 해야겠다.
2. 이번것도 수학적 사고가 필요한 문제인데 문자열마다 수학에서의 조합을 활용했어야 했다.
