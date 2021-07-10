img="";
status="";
objects=[];
function preload(){
    img=loadImage("kitchen.jpg");
}

function setup(){
    canvas=createCanvas(600, 400);
    canvas.center();

    objectDetector=ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML="Status: Detecting objects";
}

function draw(){
    image(img, 0, 0, 300, 400);

    if(status != ""){
        for(i=0; i<objects.length; i++){
            document.getElementById("status").innerHTML="Status: Objects Detected";
            fill("#ed0707");
            percent=floor(objects[i].confidence*100);
            text(objects[i].label+" "+percent+"%", objects[i].x, objects[i].y);

            noFill();
            stroke("#ed0707");
            rect(objects[i].x-20, objects[i].y, objects[i].width, objects[i].height);
        } 


    }

}

function modelLoaded(){
    console.log("CocoSSD is initialized");
    status=true;
    objectDetector.detect(img, gotResult);
}

function gotResult(error, results){
    if(error){
        console.log(error);
    }
    if(results){
        console.log(results);
        objects=results;
    }
}