//============================
// 定数
//============================

const BOARD_SIZE = 5;

//============================
// 状態
//============================

let board = [];

let allSolutions = [];

let filteredSolutions = [];

let currentPage = 1;

const PAGE_SIZE = 10;

//============================
// 起動
//============================

window.onload=()=>{

    createBoard();

    loadBoardFromURL();

    initConditionButtons();

    bindButtons();

}

function bindButtons(){

    document
        .getElementById("clearBoard")
        .onclick = clearBoard;

    document
        .getElementById("searchBtn")
        .onclick = startSearch;

    document
        .getElementById("sortType")
        .onchange = filterSolutions;

}

function createBoard(){

    const boardDiv =
        document.getElementById("board");

    boardDiv.innerHTML="";

    board=[];

    for(let y=0;y<BOARD_SIZE;y++){

        board[y]=[];

        for(let x=0;x<BOARD_SIZE;x++){

            board[y][x]=0;

            const cell =
                document.createElement("div");

            cell.className="cell";

            cell.dataset.x=x;

            cell.dataset.y=y;

            cell.onclick=()=>{

                toggleCell(x,y,cell);

            };

            boardDiv.appendChild(cell);

            updateURL();

        }

    }

}

function toggleCell(x,y,cell){

    board[y][x] =
        board[y][x] ? 0 : 1;

    cell.classList.toggle("block");

    updateURL();

}

function clearBoard(){

    createBoard();

    allSolutions=[];

    filteredSolutions=[];

    currentPage=1;

    updateResultCount();

    document
        .getElementById("resultArea")
        .innerHTML="";

    document
        .getElementById("pagination")
        .innerHTML="";

}

function initConditionButtons(){

    initCounter("A");

    initCounter("B");

    initCounter("C");

}

function initCounter(rank){

    const span =
        document.getElementById(
            "need"+rank
        );

    let value=0;

    document
        .getElementById(
            "plus"+rank
        )
        .onclick=()=>{

            value++;

            span.innerText=value;

            filterSolutions();

        };

    document
        .getElementById(
            "minus"+rank
        )
        .onclick=()=>{

            if(value==0)return;

            value--;

            span.innerText=value;

            filterSolutions();

        };

}

function startSearch(){

    const usable =
        countUsableCells();

    if(usable%4!==0){

        alert(
            "使用可能マスが4の倍数ではありません"
        );

        return;

    }

    allSolutions = solve(board);

    filterSolutions();

}

function countUsableCells(){

    let count=0;

    for(let y=0;y<5;y++){

        for(let x=0;x<5;x++){

            if(board[y][x]==0){

                count++;

            }

        }

    }

    return count;

}

function updateResultCount(){

    document
        .getElementById("resultCount")
        .innerText =
        filteredSolutions.length
        +"件";

}

//============================
// 条件取得
//============================

function getConditions(){

    return{

        A:Number(
            document.getElementById("needA").innerText
        ),

        B:Number(
            document.getElementById("needB").innerText
        ),

        C:Number(
            document.getElementById("needC").innerText
        )

    };

}

//============================
// 絞り込み
//============================

function filterSolutions(){

    const cond=getConditions();

    filteredSolutions=
        allSolutions.filter(sol=>{

            return(

                sol.countA>=cond.A &&

                sol.countB>=cond.B &&

                sol.countC>=cond.C

            );

        });

    sortSolutions();

    currentPage=1;

    updateResultCount();

    renderSolutions();

}

//============================
// 並び替え
//============================

function sortSolutions(){

    const type=
        document.getElementById("sortType").value;

    switch(type){

        case"A":

            filteredSolutions.sort((a,b)=>{

                if(b.countA!=a.countA)
                    return b.countA-a.countA;

                if(b.countB!=a.countB)
                    return b.countB-a.countB;

                return b.countC-a.countC;

            });

            break;

        case"B":

            filteredSolutions.sort((a,b)=>{

                if(b.countB!=a.countB)
                    return b.countB-a.countB;

                if(b.countA!=a.countA)
                    return b.countA-a.countA;

                return b.countC-a.countC;

            });

            break;

        case"C":

            filteredSolutions.sort((a,b)=>{

                if(b.countC!=a.countC)
                    return b.countC-a.countC;

                if(b.countA!=a.countA)
                    return b.countA-a.countA;

                return b.countB-a.countB;

            });

            break;

        default:

            filteredSolutions.sort((a,b)=>a.index-b.index);

    }

}

//============================
// 結果表示
//============================

function renderSolutions(){

    const area=
        document.getElementById("resultArea");

    area.innerHTML="";

    if(filteredSolutions.length==0){

        area.innerHTML="<h2>条件に一致する配置はありません</h2>";

        document
            .getElementById("pagination")
            .innerHTML="";

        return;

    }

    const start=
        (currentPage-1)*PAGE_SIZE;

    const end=
        Math.min(
            start+PAGE_SIZE,
            filteredSolutions.length
        );

    for(let i=start;i<end;i++){

        area.appendChild(

            createResultCard(

                filteredSolutions[i],

                i+1

            )

        );

    }

    drawPagination();

}

//============================
// URL保存
//============================

function updateURL(){

    let text="";

    for(let y=0;y<BOARD_SIZE;y++){

        for(let x=0;x<BOARD_SIZE;x++){

            text+=board[y][x];

        }

    }

    const url=
        new URL(window.location);

    url.searchParams.set(
        "board",
        text
    );

    history.replaceState(
        null,
        "",
        url
    );

}

//============================
// URL復元
//============================

function loadBoardFromURL(){

    const params=
        new URLSearchParams(
            location.search
        );

    const text=
        params.get("board");

    if(!text)return;

    if(text.length!=25)return;

    createBoard();

    const cells=
        document.querySelectorAll(".cell");

    let i=0;

    for(let y=0;y<BOARD_SIZE;y++){

        for(let x=0;x<BOARD_SIZE;x++){

            if(text[i]=="1"){

                board[y][x]=1;

                cells[i].classList.add(
                    "block"
                );

            }

            i++;

        }

    }

}
