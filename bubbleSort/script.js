let canvas;
let canvasContext;
let colors = "white";
let framesPerSecond = 1000;
let size = 10;
let sizeChange = 10;
let array = [];
let iteration = 0;
let restrict = 1;
let min = 0;
let sorted = true;
let stop = false;

window.onload = function()
{
    canvas = document.getElementById('windowsClone');
    canvasContext = canvas.getContext('2d');

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    this.document.addEventListener("keydown", keyPressed);
    for(i = 0; i < size; i++)
    {
        array[i] = (i + 1) / (size / canvas.height) * 9 / 10;
    }

    for(i = array.length - 1; i > 0; i--)
    {
        const j = Math.floor(Math.random() * i)
        const temp = array[i]
        array[i] = array[j]
        array[j] = temp
    }
    
    draw()

    setInterval(function(){
        update();
        draw();
    }, 1000 / framesPerSecond);
}

function keyPressed(evt)
{
    switch(evt.keyCode)
    {
        case 37:
            colors = "blue";
            if(size > 1)
            {
                size--
                console.log(size);
                changeSize();
            }
            break
        case 38:
            colors = "red";
            framesPerSecond++
            console.log(framesPerSecond);
            break
        case 39:
            colors = "pink";
            size++
            console.log(size);
            changeSize();
            break
        case 40:
            colors = "yellow";
            break
    }
}

function changeSize()
{
    if(size != sizeChange)
    {
        iteration = -1;
        restrict = 1;
        stop = false;
        sizeChange = size;
        array = [];
        for(i = 0; i < size; i++)
        {
            array[i] = (i + 1) / (size / canvas.height) * 9 / 10;
        }

        for(i = array.length - 1; i > 0; i--)
        {
            const j = Math.floor(Math.random() * i)
            const temp = array[i]
            array[i] = array[j]
            array[j] = temp
        }
        draw()
    }
}

function update()
{
    if(!stop)
    {
        
        if(array[iteration] > array[iteration + 1])
        {
            let temp = array[iteration + 1];
            array[iteration + 1] = array[iteration];
            array[iteration] = temp;
            sorted = false;
        }
        iteration++;
        if(iteration == size - restrict)
        {
            if(sorted)
            {
                stop = true;
            }
            sorted = true;
            iteration = min;
            restrict++;
        }
    }
}

function draw()
{
    colorRect(0, 0, canvas.width, canvas.height, "lightblue");
    for(i = 0; i < size; i++)
    {
        colorRect((i * ((canvas.width * (9 / 10)) / size)) + (canvas.width * (1 / 20)), canvas.height * 19 / 20, (canvas.width * (9 / 10)) / size, -array[i], "black");
    }
    colorRect((iteration * ((canvas.width * (9 / 10)) / size)) + (canvas.width * (1 / 20)), canvas.height * 19 / 20, (canvas.width * (9 / 10)) / size, -array[iteration], "red");
}

function colorRect(leftX, topyY, width, height, color)
{
    canvasContext.fillStyle = color;
    canvasContext.fillRect(leftX, topyY, width, height);
}