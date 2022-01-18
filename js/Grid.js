class Grid {
    constructor({container, data, header}) {
        this.grid = null;
        this.pageNumber = 1;
        this.maxCount = 4;
        this.container = container;
        this.data = data;
        this.header = header;
    }
    
    /**
     * 그리드 생성 및 초기 설정
     * @returns {htmlTableObject} grid element 반환
     */
    initGrid() {
        //그리드 생성
        let grid = document.createElement("table");
        this.container.appendChild(grid);
        this.grid = grid;

        //헤더 생성 함수 호출
        this.addHeader();
        
        //페이징 처리
        let startNum = this.pageNumber * this.maxCount - this.maxCount;
        let maxNum = this.pageNumber * this.maxCount;

        for(let i=startNum;i<maxNum;i++) {
            //데이터 없을시 종료
            if(!this.data[i]) break;
            grid.appendChild(
                this.addRow(
                    this.addCells(DATA[i])
                )
            );
        }
        
        return grid;   
    }

    /**
     * 그리드 헤더 설정
     * @param {Array} 그리드 헤더 ex) ['헤더1', '헤더2']
     */
    addHeader(headers=this.header) {
        let headerRow = document.createElement("tr");
        this.grid.appendChild(headerRow);
        
        for(let i=0;i<headers.length;i++) {
            const header = headers[i];
            let headerCell = document.createElement("th");
            headerCell.innerText = header;
            headerRow.appendChild(headerCell);
        }
    }
    
    /**
     * cell 추가
     * @param {cell} ex) {value: "데이터입니다.", name: "마우스를 올렸을때 보여지는 값", key: "데이터 매피용 키"}
     * @returns {htmlTdObject} cell 반환
     */
    addCell(data) {
        let td = document.createElement("td");
        td.innerText = data.value||"no data";
        td.title = data.name||"";
        td.rowId = cell.key;
        return td;
    }
    
    /**
     * cells 추가
     * @param {[cell]} ex) [{value: "데이터입니다.", name: "마우스를 올렸을때 보여지는 값", key: "데이터 매피용 키"}]
     * @returns {[htmlTdObject]} cellList 반환
     */
    addCells(cells) {
        let cellArr = [];
        for(let i=0;i<cells.length;i++) {
            const cell = cells[i]
            let td = document.createElement("td");
            td.innerText = cell.value||"no data";
            td.title = cell.name||"";
            td.rowId = cell.key;
            cellArr = [...cellArr, td];
        }
        return cellArr;
    }

    /**
     * 행 추가
     * @param {[cell]} cellList 행에 cellList를 추가
     * @returns {htmlTrObject} 행 반환
     */
    addRow(cells) {
        let row = document.createElement("tr");
        //행번호 삽입
        row.rowId = cells[0].rowId;
        for(let i=0;i<cells.length;i++) {
            const cell = cells[i];
            row.appendChild(cell);
        }

        row.onmouseenter = (e)=>{
            e.target.style.backgroundColor = "skyblue";
            drawLineChart({rowData:ITEMS[e.target.rowId-1]});
        }
        
        row.onmouseleave = (e)=>{
            e.target.style.backgroundColor = "white";
        }
        
        return row;
    }
    
}