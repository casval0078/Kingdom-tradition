const SHAPES={

L1:[
[0,0],
[0,1],
[0,2],
[1,2]
],

L2:[
[0,0],
[1,0],
[1,1],
[1,2]
],

L3:[
[0,0],
[0,1],
[1,1],
[2,1]
],

L4:[
[0,0],
[1,0],
[2,0],
[2,1]
],

Z1:[
[0,0],
[0,1],
[1,1],
[1,2]
],

Z2:[
[0,1],
[1,0],
[1,1],
[2,0]
],

Z3:[
[0,1],
[0,2],
[1,0],
[1,1]
],

Z4:[
[0,0],
[1,0],
[1,1],
[2,1]
],

T1:[
[0,0],
[1,0],
[2,0],
[1,1]
],

T2:[
[0,0],
[1,0],
[1,1],
[2,0]
],

T3:[
[0,1],
[1,0],
[1,1],
[1,2]
],

T4:[
[0,1],
[1,0],
[1,1],
[2,1]
]

};

const pieces = [

    // ===== L =====

    { id:"redL1", name:"赤L①", color:"#ff5a5a", cells:SHAPES.L1 },
    { id:"redL2", name:"赤L②", color:"#ff5a5a", cells:SHAPES.L2 },
    { id:"redL3", name:"赤L③", color:"#ff5a5a", cells:SHAPES.L3 },
    { id:"redL4", name:"赤L④", color:"#ff5a5a", cells:SHAPES.L4 },

    { id:"blueL1", name:"青L①", color:"#4aa3ff", cells:SHAPES.L1 },
    { id:"blueL2", name:"青L②", color:"#4aa3ff", cells:SHAPES.L2 },
    { id:"blueL3", name:"青L③", color:"#4aa3ff", cells:SHAPES.L3 },
    { id:"blueL4", name:"青L④", color:"#4aa3ff", cells:SHAPES.L4 },

    { id:"yellowL1", name:"黄L①", color:"#ffd84a", cells:SHAPES.L1 },
    { id:"yellowL2", name:"黄L②", color:"#ffd84a", cells:SHAPES.L2 },
    { id:"yellowL3", name:"黄L③", color:"#ffd84a", cells:SHAPES.L3 },
    { id:"yellowL4", name:"黄L④", color:"#ffd84a", cells:SHAPES.L4 },

    { id:"purpleL1", name:"紫L①", color:"#b15cff", cells:SHAPES.L1 },
    { id:"purpleL2", name:"紫L②", color:"#b15cff", cells:SHAPES.L2 },
    { id:"purpleL3", name:"紫L③", color:"#b15cff", cells:SHAPES.L3 },
    { id:"purpleL4", name:"紫L④", color:"#b15cff", cells:SHAPES.L4 },

    // ===== Z =====

    { id:"redZ1", name:"赤Z①", color:"#ff5a5a", cells:SHAPES.Z1 },
    { id:"redZ2", name:"赤Z②", color:"#ff5a5a", cells:SHAPES.Z2 },
    { id:"redZ3", name:"赤Z③", color:"#ff5a5a", cells:SHAPES.Z3 },
    { id:"redZ4", name:"赤Z④", color:"#ff5a5a", cells:SHAPES.Z4 },

    { id:"blueZ1", name:"青Z①", color:"#4aa3ff", cells:SHAPES.Z1 },
    { id:"blueZ2", name:"青Z②", color:"#4aa3ff", cells:SHAPES.Z2 },
    { id:"blueZ3", name:"青Z③", color:"#4aa3ff", cells:SHAPES.Z3 },
    { id:"blueZ4", name:"青Z④", color:"#4aa3ff", cells:SHAPES.Z4 },

    { id:"yellowZ1", name:"黄Z①", color:"#ffd84a", cells:SHAPES.Z1 },
    { id:"yellowZ2", name:"黄Z②", color:"#ffd84a", cells:SHAPES.Z2 },
    { id:"yellowZ3", name:"黄Z③", color:"#ffd84a", cells:SHAPES.Z3 },
    { id:"yellowZ4", name:"黄Z④", color:"#ffd84a", cells:SHAPES.Z4 },

    { id:"purpleZ1", name:"紫Z①", color:"#b15cff", cells:SHAPES.Z1 },
    { id:"purpleZ2", name:"紫Z②", color:"#b15cff", cells:SHAPES.Z2 },
    { id:"purpleZ3", name:"紫Z③", color:"#b15cff", cells:SHAPES.Z3 },
    { id:"purpleZ4", name:"紫Z④", color:"#b15cff", cells:SHAPES.Z4 },

    // ===== T =====

    { id:"redT1", name:"赤T①", color:"#ff5a5a", cells:SHAPES.T1 },
    { id:"redT2", name:"赤T②", color:"#ff5a5a", cells:SHAPES.T2 },
    { id:"redT3", name:"赤T③", color:"#ff5a5a", cells:SHAPES.T3 },
    { id:"redT4", name:"赤T④", color:"#ff5a5a", cells:SHAPES.T4 },

    { id:"blueT1", name:"青T①", color:"#4aa3ff", cells:SHAPES.T1 },
    { id:"blueT2", name:"青T②", color:"#4aa3ff", cells:SHAPES.T2 },
    { id:"blueT3", name:"青T③", color:"#4aa3ff", cells:SHAPES.T3 },
    { id:"blueT4", name:"青T④", color:"#4aa3ff", cells:SHAPES.T4 },

    { id:"yellowT1", name:"黄T①", color:"#ffd84a", cells:SHAPES.T1 },
    { id:"yellowT2", name:"黄T②", color:"#ffd84a", cells:SHAPES.T2 },
    { id:"yellowT3", name:"黄T③", color:"#ffd84a", cells:SHAPES.T3 },
    { id:"yellowT4", name:"黄T④", color:"#ffd84a", cells:SHAPES.T4 },

    { id:"purpleT1", name:"紫T①", color:"#b15cff", cells:SHAPES.T1 },
    { id:"purpleT2", name:"紫T②", color:"#b15cff", cells:SHAPES.T2 },
    { id:"purpleT3", name:"紫T③", color:"#b15cff", cells:SHAPES.T3 },
    { id:"purpleT4", name:"紫T④", color:"#b15cff", cells:SHAPES.T4 }

];
