let drawLineChart = ({rowData})=>{
    //chart Container
    let chart = dc.compositeChart('#chartContainer');
    //chart Style
    const width = 1220;
    const height = 380;
    const margins ={ top: 50, left: 100, right: 100, bottom: 100 };

    //데이터 매핑
    let ndx = crossfilter(rowData);
    let xDimension = ndx.dimension((d)=>{return d3.timeMinute(new Date(d.time))});
    
    //reduce 이용, 평균값을 계산히기 위해 준비하는 함수
    function reduceAdd(p, v) {
        ++p.count;
        p.total += v.value;
        return p;
    }
      
    function reduceRemove(p, v) {
        --p.count;
        p.total -= v.value;
        return p;
    }
      
    function reduceInitial() {
        return {count: 0, total: 0};
    }

    //평균 그룹핑
    let xAverageGroup = xDimension.group().reduce(reduceAdd, reduceRemove, reduceInitial);
    //합산 그룹핑
    let xGroup = xDimension.group().reduceSum((d)=>{
        return d.value;
    });

    //차트 옵션 적용
    chart
        .width(width)
        .height(height)
        .x(d3.scaleTime())
        .shareTitle(false)
        .compose([
            //일반 데이터 차트
            dc.lineChart(chart).group(xGroup).colors(['RGB(136, 205, 235)']).title((d)=>{
                const time = d.key.getHours() + ':' + d.key.getMinutes();
                //mouseover ToolTip 데이터 형식 변환
                return time + ' || ' + formatBytes(d.value,2)
            }),
            //평균 데이터 차트
            dc.lineChart(chart).group(xAverageGroup).valueAccessor((p)=>{ return p.value.count > 0 ? p.value.total / p.value.count : 0; }).title((d)=>{
                const time = d.key.getHours() + ':' + d.key.getMinutes();
                //mouseover ToolTip 데이터 형식 변환
                return time + ' || ' + formatBytes(d.value.count > 0 ? d.value.total / d.value.count : 0,2)
            }),
        ])
        .brushOn(false)
        .transitionDuration(500)
        .elasticY(true)
        .elasticX(true)
        .margins(margins)
        .dimension(xDimension);
  
    //yAxis 데이터형식을 데이터 단위 형식으로 변환
    chart.yAxis().tickFormat((d)=>{
        return formatBytes(d,2)
    })
    
    //5분 간격으로 xAxis 조절 / 데이터 형식은 시:분
    chart.xAxis().ticks(d3.timeMinute.every(5)).tickFormat(d3.timeFormat("%H:%M"));
   

    chart.render();
    
}