function updateCanvas() {
    background('white');
    random_number = Math.floor((Math.random()*quick_draw_data_set)+1);
    console.log(quick_draw_data_set[random_number]);
    sketch = quick_draw_data_set[random_number];
    document.getElementById("sketch_name").innerHTML = "sketch to be drawn"+sketch;
}

function setup() {
canvas = createCanvas(280,280);
canvas.center();
background("white");
canvas.mouseReleased(classifyCanvas);
}

function preload() {
    classifier = ml5.imageClassifier('DoodleNet');
}

function draw() {
    strokeWeight(13);
    stroke(0);
    if(mouseIsPressed){
        line(pmouseX, pmouseY, mouseX, mouseY);
    }

    check_sketch();
    if(draw_sketch == sketch) {
        answer_holder = "set"
        score++;
        document.getElementById("score").innerHTML = "score"+score;
    }
}


function classifyCanvas() {
    classifier.classify(canvas, gotResult);
  }

  function gotResult(error, result) {
    if(error){
    console.error(error);
    }
    console.log(results);
    draw_sketch = results[0].label;
    document.getElementById('label').innerHTML = 'your_sketch' + draw_sketch;
    document.getElementById('confidence').innerHTML = 'confidence'+ Math.round(results[0].confidence *100) + '%';
  }


function check_sketch() {
timer_counter++;
document.getElementById("time").innerHTML = "timer"+timer_counter;
console.log(timer_counter)
if(timer_counter > 400) {
    timer_counter = 0;
    timer_check = "completed";
}
if(timer_check == "completed"|| answer_holder == "set") {
    timer_check = "";
    answer_holder = "";
    updateCanvas();
}
}