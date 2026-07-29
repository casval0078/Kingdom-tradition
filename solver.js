let solutions = [];

////////////////////////////////////////////////////
// 探索開始
////////////////////////////////////////////////////

function solve(){

    solutions = [];

    const selectedPieces = pieces.filter(p =>
        ownedPieces.has(p.id)
    );

    const workBoard = board.map(r=>[...r]);

    backtrack(workBoard, selectedPieces, []);

    return solutions;

}

////////////////////////////////////////////////////
// 再帰
////////////////////////////////////////////////////

function backtrack(workBoard, remainPieces, placed){

    const empty = findFirstEmpty(workBoard);

    if(empty == null){

        solutions.push(
            JSON.parse(JSON.stringify(placed))
        );

        return;
    }

    const {x,y} = empty;

    for(let i=0;i<remainPieces.length;i++){

        const piece = remainPieces[i];

        if(canPlace(workBoard,piece,x,y)){

            placePiece(workBoard,piece,x,y,1);

            placed.push({

                id:piece.id,

                color:piece.color,

                name:piece.name,

                x,

                y,

                cells:piece.cells

            });

            const next = remainPieces.filter((_,idx)=>idx!==i);

            backtrack(workBoard,next,placed);

            placed.pop();

            placePiece(workBoard,piece,x,y,0);

        }

    }

}

function findFirstEmpty(board){

    for(let y=0;y<5;y++){

        for(let x=0;x<5;x++){

            if(board[y][x]==0){

                return {x,y};

            }

        }

    }

    return null;

}

function canPlace(board,piece,startX,startY){

    const base = piece.cells[0];

    const offsetX = startX-base[0];

    const offsetY = startY-base[1];

    for(const cell of piece.cells){

        const x = offsetX+cell[0];

        const y = offsetY+cell[1];

        if(x<0 || x>=5) return false;

        if(y<0 || y>=5) return false;

        if(board[y][x]!=0) return false;

    }

    return true;

}

function placePiece(board,piece,startX,startY,value){

    const base = piece.cells[0];

    const offsetX = startX-base[0];

    const offsetY = startY-base[1];

    for(const cell of piece.cells){

        const x = offsetX+cell[0];

        const y = offsetY+cell[1];

        board[y][x]=value;

    }

}

let currentPage = 1;

const PAGE_SIZE = 10;

function renderSolutions(list){

    currentPage = 1;

    window.solutionList = list;

    document.getElementById("resultCount").innerText =
        list.length + "件";

    drawPage();

}

function drawPage(){

    const area =
        document.getElementById("resultArea");

    area.innerHTML="";

    const start =
        (currentPage-1)*PAGE_SIZE;

    const end =
        Math.min(
            start+PAGE_SIZE,
            solutionList.length
        );

    for(let i=start;i<end;i++){

        area.appendChild(
            createPatternCard(
                solutionList[i],
                i+1
            )
        );

    }

    drawPagination();

}

function createPatternCard(solution,no){

    const card=document.createElement("div");

    card.className="patternCard";

    const title=document.createElement("div");

    title.className="patternTitle";

    title.innerText="No."+no;

    card.appendChild(title);

    const boardDiv=document.createElement("div");

    boardDiv.className="patternBoard";

    const grid=[];

    for(let y=0;y<5;y++){

        grid[y]=[];

        for(let x=0;x<5;x++){

            grid[y][x]=null;

        }

    }

    solution.forEach(piece=>{

        const base=piece.cells[0];

        const ox=piece.x-base[0];

        const oy=piece.y-base[1];

        piece.cells.forEach(cell=>{

            const x=ox+cell[0];

            const y=oy+cell[1];

            grid[y][x]=piece.color;

        });

    });

    for(let y=0;y<5;y++){

        for(let x=0;x<5;x++){

            const c=document.createElement("div");

            c.className="patternCell";

            if(board[y][x]==1){

                c.style.background="#444";

            }
            else if(grid[y][x]){

                c.style.background=grid[y][x];

            }

            boardDiv.appendChild(c);

        }

    }

    card.appendChild(boardDiv);

    return card;

}

function drawPagination(){

    let div=document.getElementById("pagination");

    if(!div){

        div=document.createElement("div");

        div.id="pagination";

        div.className="pagination";

        document.body.appendChild(div);

    }

    div.innerHTML="";

    const pageCount=
        Math.ceil(
            solutionList.length/PAGE_SIZE
        );

    const prev=document.createElement("button");

    prev.className="pageBtn";

    prev.innerText="◀";

    prev.disabled=currentPage===1;

    prev.onclick=()=>{

        currentPage--;

        drawPage();

    };

    div.appendChild(prev);

    for(let i=1;i<=pageCount;i++){

        const b=document.createElement("button");

        b.className="pageBtn";

        if(i===currentPage)
            b.classList.add("active");

        b.innerText=i;

        b.onclick=()=>{

            currentPage=i;

            drawPage();

        };

        div.appendChild(b);

    }

    const next=document.createElement("button");

    next.className="pageBtn";

    next.innerText="▶";

    next.disabled=currentPage===pageCount;

    next.onclick=()=>{

        currentPage++;

        drawPage();

    };

    div.appendChild(next);

}
