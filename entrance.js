img="";
status="";
objects=[];
function preload(){
    img=loadImage("entrance2.jpg");
}

function setup(){
    canvas=createCanvas(500, 500);
    canvas.center();
    canvas.position(400, 100);

    objectDetector=ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML="Status: Detecting objects";
}

function draw(){
    image(img, 0, 0, 500, 500);

    if(status != ""){
        for(i=0; i<objects.length; i++){
            document.getElementById("status").innerHTML="Status: Objects Detected";
            fill("#ed0707");
            percent=floor(objects[i].confidence*100);
            text(objects[i].label+" "+percent+"%", objects[i].x, objects[i].y);

            noFill();
            stroke("#ed0707");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
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