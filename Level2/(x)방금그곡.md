### **문제 설명**

# **방금그곡**

라디오를 자주 듣는 네오는 라디오에서 방금 나왔던 음악이 무슨 음악인지 궁금해질 때가 많다. 그럴 때 네오는 다음 포털의 '방금그곡' 서비스를 이용하곤 한다. 방금그곡에서는 TV, 라디오 등에서 나온 음악에 관해 제목 등의 정보를 제공하는 서비스이다.

네오는 자신이 기억한 멜로디를 가지고 방금그곡을 이용해 음악을 찾는다. 그런데 라디오 방송에서는 한 음악을 반복해서 재생할 때도 있어서 네오가 기억하고 있는 멜로디는 음악 끝부분과 처음 부분이 이어서 재생된 멜로디일 수도 있다. 반대로, 한 음악을 중간에 끊을 경우 원본 음악에는 네오가 기억한 멜로디가 들어있다 해도 그 곡이 네오가 들은 곡이 아닐 수도 있다. 그렇기 때문에 네오는 기억한 멜로디를 재생 시간과 제공된 악보를 직접 보면서 비교하려고 한다. 다음과 같은 가정을 할 때 네오가 찾으려는 음악의 제목을 구하여라.

- 방금그곡 서비스에서는 음악 제목, 재생이 시작되고 끝난 시각, 악보를 제공한다.
- 네오가 기억한 멜로디와 악보에 사용되는 음은 C, C#, D, D#, E, F, F#, G, G#, A, A#, B 12개이다.
- 각 음은 1분에 1개씩 재생된다. 음악은 반드시 처음부터 재생되며 음악 길이보다 재생된 시간이 길 때는 음악이 끊김 없이 처음부터 반복해서 재생된다. 음악 길이보다 재생된 시간이 짧을 때는 처음부터 재생 시간만큼만 재생된다.
- 음악이 00:00를 넘겨서까지 재생되는 일은 없다.
- 조건이 일치하는 음악이 여러 개일 때에는 라디오에서 재생된 시간이 제일 긴 음악 제목을 반환한다. 재생된 시간도 같을 경우 먼저 입력된 음악 제목을 반환한다.
- 조건이 일치하는 음악이 없을 때에는 “`(None)`”을 반환한다.

### **입력 형식**

입력으로 네오가 기억한 멜로디를 담은 문자열 `m`과 방송된 곡의 정보를 담고 있는 배열 `musicinfos`가 주어진다.

- `m`은 음 `1`개 이상 `1439`개 이하로 구성되어 있다.
- `musicinfos`는 `100`개 이하의 곡 정보를 담고 있는 배열로, 각각의 곡 정보는 음악이 시작한 시각, 끝난 시각, 음악 제목, 악보 정보가 '`,`'로 구분된 문자열이다.
    - 음악의 시작 시각과 끝난 시각은 24시간 `HH:MM` 형식이다.
    - 음악 제목은 '`,`' 이외의 출력 가능한 문자로 표현된 길이 `1` 이상 `64` 이하의 문자열이다.
    - 악보 정보는 음 `1`개 이상 `1439`개 이하로 구성되어 있다.

### **출력 형식**

조건과 일치하는 음악 제목을 출력한다.
### 나의풀이
* 틀린이유 : 런타임 오류, 실패 
* 구현하지 못한 것: 코드 진행이 일치하는 것이 여러개 있을 경우 길이가 긴 것 출력하기, C#, C의 구별  
1. musicinfos의 배열을 보기 쉽게 하기 위해 split(",")을 하고 시간의 차를 구하기 위해 ":"를 가지고 있으면 제외해준다.
2. 주어진 시간에 따라 코드 진행을 추가 혹은 제거 해야 하므로 시간의 차를 계산해준다.
3. 코드를 추가 혹은 제거 하기 위해 몫(Math.floor(시간의 차 / 코드 진행.length)과 나머지(시간의 차 % 코드진행.length)를 구하고 코드를 변경해준다.
4. 변경한 코드가 m과 일치하면 true를 하고 true일 시 answer의 값에 음악의 이름을 추가해준다.

```jsx
function solution(m, musicinfos) {
    var answer = '';
    const musicSplit = musicinfos.map((item) =>{
        return item.split(",").map(item2 =>{
            if(item2.includes(":")){
                return item2.replace(":","");
            }
            return item2
        })
    });
    const musicArr = musicSplit.map((item,index)=>{
        const leng = item[1]- item[0];
        return item.map((item2,index2)=>{
            if(index2 === 1){
                return leng;
            }
            if(index2 === 3){
                const quotient = Math.floor(leng / item2.length);
                const remainder = leng % item2.length;
                for(let i = 1; i<= quotient;i++){
                    item2 += item2
                }
                for(let j = 0; j<= remainder;j++){
                    if(quotient === 0) item2 = item2.slice(0,remainder);
                    else item2 += item2[j];
                }
                return item2;
            }
            return item2;
        })
    });
    const trueMusic = musicArr.map((item,index)=>{
        if(item[3].includes(m)){
            return  item[1];
        }
        return false;
    });
    trueMusic.map((item,index)=>{
        if(item){
            answer += musicSplit[index][2];
        }
    });

    return  return answer === "" ? "(None)" : answer;
}
```

### 다른 사람 풀이
1. broadcast 배열에 노래의 제목과 시간 차이에 따른 코드진행을 넣는다.
2. 함수가 복잡해지지 않게 하기 위해 toMinute함수로 시간차이를 구하고, play함수로 시간에 따른 코드진행을 추가한다.
3. boradcast의 값을 비교하기 위해 reduce로 (answer.length === 0 || answer[1].length < x[1].length)면 x를 리턴한다.
4. answer.length === 0 이면 "(None)" 아닐 시 answer[0]을 리턴한다.
 
```jsx
function solution(m, musicinfos) {
    const _m = m.replace(/(\D)#/g,(s,p1)=> p1.toLowerCase());
    const broadcast = musicinfos.map((x)=>{
        const info = x.split(",");
        const song = info[3].replace(/(\D)#/g,(s,p1)=>p1.toLowerCase());
        return [info[2],play(toMinute(info[1].split(":")) - toMinute(info[0].split(":")),song)];
    });
    const answer = broadcast.reduce((answer,x)=>{
        if(x[1].includes(_m)){
            if(answer.length === 0 || answer[1].length < x[1].length) return x;
        }
        return answer;
    },[]);
    return answer.length === 0 ? "(None)" : answer[0];
};

function toMinute(t){
    return (t[0]*60) + (t[1]*1);
}
function play(time,song){
    const length = song.length;
    return song.repeat(time / length) + song.substring(0, time  % length);
}
```

### 느낀점
1. 내가 구현하지 못한 **코드 진행이 일치하는 것이 여러개 있을 경우 길이가 긴 것 출력하기**는 reduce를 이용해서 구현했고 C#,C의 구별은 정규식으로 #이 있는 경우 소문자로 변경해주었따.
2. toMinute, play함수를 solution함수 밖에 선언해서 구현하는 것이 더 가독성이 좋다.
3. String.repeat 매소드  
4. 식을 간편하게 할 때 꼭 사용해야 하는 정보들만 넣기




