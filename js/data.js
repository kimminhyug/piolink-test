const HEADER = ["상태", "제조사", "종료시간", "사용량", "VLAN", "시작시간", "연결포트", "OS", "NetBios", "단말유형"];

const DATA = [
    [
        {name:"상태", value:"on", key:1},
        {name:"제조사", value:"ABC-Chocolate Company", key:1},
        {name:"종료시간", value:"-", key:1},
        {name:"사용량", value:"12.26 GB", key:1},
        {name:"VLAN", value:"200", key:1},
        {name:"시작시간", value:"2022-01-16 10:23", key:1},
        {name:"연결포트", value:"연구소 Main(GX24P)/ge17", key:1},
        {name:"OS", value:"-", key:1},
        {name:"NetBIOS", value:"DESKTOP-ABCD123", key:1},
        {name:"단말유형", value:"", key:1},
    ],
    [
        {name:"상태", value:"on", key:2},
        {name:"제조사", value:"EFM Networks", key:2},
        {name:"종료시간", value:"-", key:2},
        {name:"사용량", value:"18.26 GB", key:2},
        {name:"VLAN", value:"230", key:2},
        {name:"시작시간", value:"2022-01-13 10:05", key:2},
        {name:"연결포트", value:"본사 Main(GX24P)/ge17", key:2},
        {name:"OS", value:"-", key:2},
        {name:"NetBIOS", value:"DESKTOP-NICE132", key:2},
        {name:"단말유형", value:"", key:2},
    ],
    [
        {name:"상태", value:"off", key:3},
        {name:"제조사", value:"EFM Networks", key:3},
        {name:"종료시간", value:"-", key:3},
        {name:"사용량", value:"1.26 GB", key:3},
        {name:"VLAN", value:"52", key:3},
        {name:"시작시간", value:"2022-01-14 10:05", key:3},
        {name:"연결포트", value:"GX24P/ge17", key:3},
        {name:"OS", value:"-", key:3},
        {name:"NetBIOS", value:"DESKTOP-MES213D", key:3},
        {name:"단말유형", value:"", key:3},
    ],
    [
        {name:"상태", value:"off", key:4},
        {name:"제조사", value:"Mint-Chocolate Company", key:4},
        {name:"종료시간", value:"-", key:4},
        {name:"사용량", value:"1.96 GB", key:4},
        {name:"VLAN", value:"84", key:4},
        {name:"시작시간", value:"2022-01-14 10:05", key:4},
        {name:"연결포트", value:"보안사업본부-4/ge9", key:4},
        {name:"OS", value:"-", key:4},
        {name:"NetBIOS", value:"", key:4},
        {name:"단말유형", value:"", key:4},
    ],
    [
        {name:"ㄱ", value:"5", key:4},
        {name:"제조사", value:"Mint-Chocolate Company", key:4},
        {name:"종료시간", value:"-", key:4},
        {name:"사용량", value:"1.96 GB", key:4},
        {name:"VLAN", value:"84", key:4},
        {name:"시작시간", value:"2022-01-14 10:05", key:4},
        {name:"연결포트", value:"보안사업본부-4/ge9", key:4},
        {name:"OS", value:"-", key:4},
        {name:"NetBIOS", value:"", key:4},
        {name:"단말유형", value:"", key:4},
    ],
    [
        {name:"ㅇ", value:"6", key:4},
        {name:"제조사", value:"Mint-Chocolate Company", key:4},
        {name:"종료시간", value:"-", key:4},
        {name:"사용량", value:"1.96 GB", key:4},
        {name:"VLAN", value:"84", key:4},
        {name:"시작시간", value:"2022-01-14 10:05", key:4},
        {name:"연결포트", value:"보안사업본부-4/ge9", key:4},
        {name:"OS", value:"-", key:4},
        {name:"NetBIOS", value:"", key:4},
        {name:"단말유형", value:"", key:4},
    ],
    [
        {name:"ㄴ", value:"7", key:4},
        {name:"제조사", value:"Mint-Chocolate Company", key:4},
        {name:"종료시간", value:"-", key:4},
        {name:"사용량", value:"1.96 GB", key:4},
        {name:"VLAN", value:"84", key:4},
        {name:"시작시간", value:"2022-01-14 10:05", key:4},
        {name:"연결포트", value:"보안사업본부-4/ge9", key:4},
        {name:"OS", value:"-", key:4},
        {name:"NetBIOS", value:"", key:4},
        {name:"단말유형", value:"", key:4},
    ],
];

/**
 * 과제용 샘플 데이터 생산 함수
 * @param {Number} key : item 매핑용
 * @returns 
 */
let getRandomData = (key) => {
    const interval = 5;
    let limit = 120;
    let time = 0;
    //현재시간 기준
    let startTime = new Date();
    let dataArr = [];

    //데이터 범위
    const max = 107400000;
    const min = 102400;

    while(time < limit) {
        time = time + interval;
        let calcTime = new Date(startTime.setMinutes(startTime.getMinutes()+5));
        //랜덤 데이터 생성
        let randomData = Math.random()*(max-min) + min;
        //소수점 정리
        randomData = 1 * randomData.toFixed(1);
        
        dataArr.push({key:key, time: calcTime, value:randomData});
        dataArr.push({key:key, time: calcTime, value:randomData+1000000});
        //데이터 60개 맞추기용
        if(time>60) {
            dataArr.push({key:key, time: calcTime, value:randomData+2000000});    
        }
    }

    return dataArr;   
}

//차트에 사용되어짐
const ITEMS = [
    getRandomData(1),
    getRandomData(2),
    getRandomData(3),
    getRandomData(4),
    getRandomData(5),
    getRandomData(6),
    getRandomData(7),
    getRandomData(8),
    getRandomData(9),
];

/**
 * 데이터단위 변환
 * https://stackoverflow.com/questions/15900485/correct-way-to-convert-size-in-bytes-to-kb-mb-gb-in-javascript
 * @param {Number} byte : 데이터 ex) 10243
 * @param {Number} decimals : 소수점 자릿수 defualt - 2 ex) 2
 * @returns {String} '1.2 KB'
 */
function formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}
