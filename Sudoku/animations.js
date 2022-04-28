// https://stackoverflow.com/questions/19258169/fadein-fadeout-in-html5-canvas


let time = 0.0;
let timeId = 0;

function setUp()
{
    timerId = setInterval("fadeIn()", 2);
    console.log(timerId);
}

// function fadeIn()
// {
//     ctx.globalAlpha = time

//     let photo = new Image()
//     photo .onload = function(){ 
//         ctx.drawImage(photo, 0, 0);
//     }

//     photo .src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0jJ1w7pwpOlF-V0iB-6KyeLqiRbvVxDMz_w&usqp=CAU"

//     time = time + 0.1

//     while (time > 1.0)
//     {
//         clearInterval(timeId)
//         time = time + 0.5
//         ctx.globalAlpha = time
//     }
// }
