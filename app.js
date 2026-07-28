const BOARD_SIZE = 5;

let board = [];
let ownedPieces = new Set();

const boardDiv = document.getElementById("board");
const pieceList = document.getElementById("pieceList");

init();

function init(){

    createBoard();

    createPieceList();

    document
        .getElementById("clearBoard")
        .onclick = clearBoard;

    document
        .getElementById("searchBtn")
        .onclick = startSearch;

}

/////////////////////////////////////////////////////
// 盤面生成
/////////////////////////////////////////////////////

function createBoard(){

    boardDiv.innerHTML="";

    board=[];

    for(let y=0;y<BOARD_SIZE;y++){

        board[y]=[];

        for(let x=0;x<BOARD_SIZE;x++){

            board[y][x]=0;

            const cell=document.createElement("div");

            cell.className="cell";

            cell.dataset.x=x;

            cell.dataset.y=y;

            cell.onclick=()=>toggleCell(x,y,cell);

            boardDiv.appendChild(cell);

        }

    }

}

/////////////////////////////////////////////////////
// 使用不可切替
/////////////////////////////////////////////////////

function toggleCell(x,y,cell){

    board[y][x]=board[y][x]?0:1;

    cell.classList.toggle("block");

}

/////////////////////////////////////////////////////
// 盤面クリア
/////////////////////////////////////////////////////

function clearBoard(){

    createBoard();

}

/////////////////////////////////////////////////////
// 宝物一覧
/////////////////////////////////////////////////////

function createPieceList(){

    pieceList.innerHTML="";

    pieces.forEach(piece=>{

        const card=document.createElement("div");

        card.className="pieceCard";

        card.dataset.id=piece.id;

        const check=document.createElement("div");

        check.className="checkMark";

        check.innerHTML="☐";

        const icon=document.createElement("div");

        icon.className="pieceColor";

        icon.style.background=piece.color;

        const name=document.createElement("div");

        name.className="pieceName";

        name.innerText=piece.name;

        card.appendChild(check);

        card.appendChild(icon);

        card.appendChild(name);

        card.onclick=()=>{

            if(ownedPieces.has(piece.id)){

                ownedPieces.delete(piece.id);

                check.innerHTML="☐";

                card.classList.remove("owned");

            }else{

                ownedPieces.add(piece.id);

                check.innerHTML="☑";

                card.classList.add("owned");

            }

        };

        pieceList.appendChild(card);

    });

}

/////////////////////////////////////////////////////
// 探索開始
/////////////////////////////////////////////////////

function startSearch(){

    if(ownedPieces.size==0){

        alert("所持宝物を選択してください。");

        return;

    }

    console.log(board);

    console.log([...ownedPieces]);

    alert("solver.jsで探索開始");

}
