/**
 * 차트에 사용할 ITEM 종합
 * @returns 전체 ITEMS ex) 60 * 4 240개
 */
let getTotalData = ()=>{
    let rowData = [];
    for(let i=0;i<ITEMS.length;i++) {
        rowData.push(...ITEMS[i]);
    }
    return rowData;
}

window.onload = ()=>{
    let container = document.querySelector("#container");
    //그리드모듈 생성
    let gridModule = new Grid({container: container, header: HEADER, data: DATA});    
    gridModule.initGrid();
   //라인차트 추가
    drawLineChart({rowData:getTotalData()});
}

