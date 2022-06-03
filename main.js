img = "";
status1 = false;
objects = [];

function preload() {
    img = loadImage("dog_cat.jpg");
}

function setup() {
    canvas = createCanvas(380, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    video.size(380, 380);
}

function start() {
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById('status').innerHTML = "Status : Detecting objects";
}

function modelLoaded() {
    console.log("Cocossd is ready!");
    status1 = true;
    objectDetector.detect(video, gotResults);
}

function gotResults(error, results) {
    if (error)
        console.log(error);
    else
        console.log(results);
    objects = results;
}

function draw() {
    image(video, 0, 0, 380, 380);

    if (status1 != "") {
        r = random(255);
        g = random(255);
        b = random(255);
        document.getElementById('status').innerHTML = "Status : Detected objects";
        document.getElementById('number_of_objects').innerHTML = "Number of objects : " + objects.length;
        for (let i = 0; i < objects.length; i++) {
            fill(r, g, b);
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke(r, g, b);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }

    /* fill("#FF0000");
    text("dog", 45, 75);
    noFill();
    stroke("#FF0000");
    rect(30, 60, 450, 350);

    fill("#FF0000");
    text("cat", 320, 120);
    noFill();
    stroke("#FF0000");
    rect(300, 90, 270, 320);
    */
}