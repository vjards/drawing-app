// VARIABLES
const canvas = document.getElementById("canvas");
canvas.width= window.innerWidth - 60;
canvas.height = 650;

let start_background_color="white";
let context =canvas.getContext("2d");
context.fillStyle=start_background_color;
context.fillRect(0, 0, canvas.width, canvas.height);


let draw_color = "black";
let draw_width ="2";
let is_drawing ="false";

let restore_array=[];
let index = -1;

//CHANGING THE PAINT COLOR ON THE PALLETTE
function change_color (element){
    draw_color = element.style.background;
};


//DRAWING PICTURES ON MOBILE DEVICES
canvas.addEventListener("touchstart", start, false);
canvas.addEventListener("touchmove", draw, false);
canvas.addEventListener("touchend", stop, false);

//DRAWING PICTURES ON A COMPUTER OR LAPTOP
canvas.addEventListener("mousedown", start, false);
canvas.addEventListener("mousemove", draw, false);
canvas.addEventListener("mouseup", stop, false);
canvas.addEventListener("mouseout", stop, false);

// USER STARTS TO DRAW
function start(event){
    is_drawing = true;
    context.beginPath();
    //event coordinates when the user prepares to draw
    context.moveTo(event.clientX-canvas.offsetLeft, 
                   event.clientY-canvas.offsetTop);
    event.preventDefault();
}

//USER IS ACTIVELY DRAWING
function draw(event){
    //event coordinates where the mouse moves while the user is drawing
    if (is_drawing){
        context.lineTo(event.clientX-canvas.offsetLeft, 
                      event.clientY-canvas.offsetTop);
        context.strokeStyle = draw_color;
        context.lineWidth = draw_width;
        context.lineCap="round";
        context.lineJoin="round";
        context.stroke();
    }
    event.preventDefault();
}

//USER STOPS DRAWING
function stop (event){
    if (is_drawing){
        context.stroke();
        context.closePath();
        is_drawing = false;
    }
    event.preventDefault();
    if (event.type !="mouseout"){
        restore_array.push(context.getImageData(0,0, canvas.width, canvas.height))
        index += 1;
    }
   
    console.log(restore_array);
}

//CLEARING/ERASING THE CANVAS
function clear_canvas(){
    context.fillStyle=start_background_color;
    context.clearRect(0,0, canvas.width, canvas.height);
    context.fillRect(0,0, canvas.width, canvas.height);

    restore_array=[];
    index -=1;
};

//UNDO LAST DRAWING MODIFICATION
function undo_last(){
    if(index <= 0){
        clear_canvas()
    }else{
        index -=1
        restore_array.pop();
        context.putImageData(restore_array[index], 0,0);
    }
};


//REDO MODIFICATION (Review conditionals, operators, and array methods)
//function redo(){
   // if(index < restore_array.length-1){
     // index += 1;
     // restore_array.push(restore_array[index], 0, 0);
   //}  
//};

function draw_square(){
    if(canvas.getContext){
        context.strokeRect(600,175,300,300);
        context.strokeStyle = draw_color;
        context.lineWidth = draw_width;
    }
};

