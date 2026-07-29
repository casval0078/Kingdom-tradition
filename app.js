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

window.onload = () => {

    createBoard();

    initConditionButtons();

    bindButtons();

};

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

        }

    }

}

function toggleCell(x,y,cell){

    board[y][x] =
        board[y][x] ? 0 : 1;

    cell.classList.toggle("block");

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
