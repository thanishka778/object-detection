img="";
status="";
objects=[];
function preload(){
    img=loadImage("showcase.jpg");
}

function setup(){
    canvas=createCanvas(700, 500);
    canvas.center();

    objectDetector=ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML="Status: Detecting objects";
}

function draw(){
    image(img, -50, 0, 900, 500);

    if(status != ""){
        for(i=0; i<objects.length; i++){
            document.getElementById("status").innerHTML="Status: Objects Detected";
            fill("#ed0707");
            percent=floor(objects[i].confidence*100);
            text(objects[i].label+" "+percent+"%", objects[i].x-20, objects[i].y-300);

            noFill();
            stroke("#ed0707");
            rect(objects[i].x-10, objects[i].y-300, objects[i].width-100, objects[i].height);
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