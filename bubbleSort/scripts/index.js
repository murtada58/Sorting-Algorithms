let canvas;
let canvasContext;
let colors = "white";
let size = 10;
let sizeChange = 10;
let array = [];
let iteration = 0;
let restrict = 1;
let sorted = true;
let stop = false;
let step = false;
let timer = 0;
let actionsPerSecond = 40;

window.onload = () =>
{
    canvas = document.getElementById('sort');
    canvasContext = canvas.getContext('2d');

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    
    this.document.addEventListener("keydown", keyPressed);

    for(i = 0; i < size; i++)
    {
        array[i] = (((i + 1) * canvas.height) / size) * (9 / 10);
    }

    shuffle(array);
    
    draw()

    setInterval(() =>
    {
        timer++
        if(timer >= 1000 / actionsPerSecond && !step)
        {
            timer = 0;
            update();
        }
        draw();
    }, 1);
}

update = () =>
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
            iteration = 0;
            restrict++;
        }
    }
}

draw = () =>
{
    colorRect(0, 0, canvas.width, canvas.height, "lightblue");
    canvasContext.fillStyle = "black";
    canvasContext.font = "bold 16px Arial";
    canvasContext.fillText("Actions Per Second: " + (actionsPerSecond / 4) + " | Array Size: " + size, 16, 32);
    for(i = 0; i < size; i++)
    {
        colorRect((i * ((canvas.width * (9 / 10)) / size)) + (canvas.width * (1 / 20)), canvas.height * 19 / 20, (canvas.width * (9 / 10)) / size, -array[i], "black");
    }
    colorRect((iteration * ((canvas.width * (9 / 10)) / size)) + (canvas.width * (1 / 20)), canvas.height * 19 / 20, (canvas.width * (9 / 10)) / size, -array[iteration], "red");
}