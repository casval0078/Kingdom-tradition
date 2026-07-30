//======================================================
// solver.js
//======================================================

const BOARD_SIZE = 5;

let solutions = [];

/*
Placement

{
    shape,
    x,
    y,
    cells:[
        {x,y},
        ...
    ],
    rank,
    id
}
*/

let placements = [];

//======================================================
// solve
//======================================================

function solve(board){

    placements=[];

    placementMap=[];

    solutions=[];

    buildPlacements(board);

    buildPlacementMap();

    const work=[];

    for(let y=0;y<BOARD_SIZE;y++){

        work[y]=[];

        for(let x=0;x<BOARD_SIZE;x++){

            work[y][x]=board[y][x];

        }

    }

    backtrack(

        work,

        [],

        0

    );

    solutions.forEach((s,i)=>{

        s.index=i+1;

    });

    return solutions;

}

//======================================================
// Placement生成
//======================================================

function buildPlacements(board){

    placements=[];

    SHAPES.forEach(shape=>{

        for(let sy=-3;sy<BOARD_SIZE;sy++){

            for(let sx=-3;sx<BOARD_SIZE;sx++){

                const cells=[];

                let ok=true;

                for(const c of shape.cells){

                    const x=sx+c[0];
                    const y=sy+c[1];

                    if(
                        x<0||
                        y<0||
                        x>=BOARD_SIZE||
                        y>=BOARD_SIZE
                    ){
                        ok=false;
                        break;
                    }

                    if(board[y][x]){

                        ok=false;
                        break;

                    }

                    cells.push({
                        x,
                        y
                    });

                }

                if(!ok)continue;

                placements.push({

                    shape:shape.id,

                    rank:shape.rank,

                    x:sx,

                    y:sy,

                    cells

                });

            }

        }

    });

}

//======================================================
// 左上の空きを探す
//======================================================

function firstEmpty(board){

    for(let y=0;y<BOARD_SIZE;y++){

        for(let x=0;x<BOARD_SIZE;x++){

            if(board[y][x]==0){

                return{

                    x,
                    y

                };

            }

        }

    }

    return null;

}

//======================================================
// Placement取得
//======================================================

function placementsAt(x,y){

    const list=[];

    for(const p of placements){

        for(const c of p.cells){

            if(

                c.x==x &&

                c.y==y

            ){

                list.push(p);

                break;

            }

        }

    }

    return list;

}

//======================================================
// 置けるか
//======================================================

function canPlace(board,p){

    for(const c of p.cells){

        if(board[c.y][c.x]){

            return false;

        }

    }

    return true;

}

//======================================================
// 配置
//======================================================

function place(board,p){

    for(const c of p.cells){

        board[c.y][c.x]=2;

    }

}

//======================================================
// 戻す
//======================================================

function remove(board,p){

    for(const c of p.cells){

        board[c.y][c.x]=0;

    }

}

//======================================================
// バックトラック
//======================================================

function backtrack(board,used){

    const pos=firstEmpty(board);

    // 全て埋まった
    if(pos==null){

        solutions.push(

            buildSolution(used)

        );

        return;

    }

    // このマスを含む候補だけ取得
    const list=placementsAt(

        pos.x,

        pos.y

    );

    for(const p of list){

        if(!canPlace(board,p)){

            continue;

        }

        place(board,p);

        used.push(p);

        backtrack(

            board,

            used

        );

        used.pop();

        remove(board,p);

    }

}

//======================================================
// Solution生成
//======================================================

function buildSolution(used){

    let countA=0;
    let countB=0;
    let countC=0;

    const usedShapes=[];

    const pieces=[];

    for(const p of used){

        if(p.rank=="A")countA++;

        if(p.rank=="B")countB++;

        if(p.rank=="C")countC++;

        usedShapes.push(

            p.shape

        );

        pieces.push({

            shape:p.shape,

            x:p.x,

            y:p.y,

            cells:p.cells.map(c=>({

                x:c.x,

                y:c.y

            }))

        });

    }

    return{

        index:0,

        countA,

        countB,

        countC,

        usedShapes,

        pieces

    };

}

//======================================================
// PlacementMap生成
//======================================================

let placementMap=[];

function buildPlacementMap(){

    placementMap=[];

    for(let y=0;y<BOARD_SIZE;y++){

        placementMap[y]=[];

        for(let x=0;x<BOARD_SIZE;x++){

            placementMap[y][x]=[];

        }

    }

    for(const p of placements){

        for(const c of p.cells){

            placementMap[c.y][c.x].push(

                p

            );

        }

    }

}
