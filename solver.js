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
