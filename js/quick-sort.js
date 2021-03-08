var w=20;
var values=[];
var state=[];

async function swep(pindex,end){
    await sleep(50);
    let k=values[pindex];
    values[pindex]=values[end];
    values[end]=k;
}

async function quicksort(start,end) {
    if(start>=end){
        return;
    }
    let pivot= await partition(start,end);
    await Promise.all([quicksort(start,pivot-1)
    ,quicksort(pivot+1,end)]);
    // await quicksort(start,pivot-1);
    // await quicksort(pivot+1,end);
    return;
}
async function partition(start,end){
    let pindex=start;
    state[end]=-1;
    let pvalue=values[end];
    for(let i=start;i<end;i++){
        state[i]=1;
        if(values[i]<pvalue){
            await swep(pindex,i);
            pindex++;
        }
        
    }
    for(let i =start;i<=end;i++){
        state[i]=0;
    }
    await swep(pindex,end);
    return pindex;
}

function setup(){
    createCanvas(windowWidth, windowHeight);
    values=new Array(floor(width/w));
    n=values.length;
    state=new Array(n);
    for(var i=0;i<values.length;i++){
        values[i]=random(20,height);
        state[i]=0;
    }
    quicksort(0,n-1);
}
function draw(){
    background(255, 153, 194);
    for(let j =0;j<values.length;j++){
    // noStroke();
    if(state[j]==0){
        fill(255, 255, 0);
    }
    else if(state[j]==-1){
        fill(255,0,0);
    }
    else{
        fill(0,255,0);
    }
    if(values[j]==null){
        console.log(j);
    }
    rect(w*j,height-values[j],w,values[j],5);
    }
}
function sleep(ms) {
    return new Promise((resolve) => {setTimeout(resolve, ms);});
}