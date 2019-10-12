changeSize = () =>
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

shuffle = (array) =>
{
    for(i = array.length - 1; i > 0; i--)
    {
        const j = Math.floor(Math.random() * i)
        const temp = array[i]
        array[i] = array[j]
        array[j] = temp
    }

    return array
}

colorRect = (leftX, topyY, width, height, color) =>
{
    canvasContext.fillStyle = color;
    canvasContext.fillRect(leftX, topyY, width, height);
}

keyPressed = (evt) =>
{
    switch(evt.keyCode)
    {
        case 37:
            if(size > 1 && !step)
            {
                size--
                console.log(size);
                changeSize();
            }
            break
        case 38:
            if(actionsPerSecond < 4000 && actionsPerSecond > 4)
            {
                actionsPerSecond += 4;
            }
            else if(actionsPerSecond < 4000 && actionsPerSecond <= 4)
            {
                actionsPerSecond *= 2;
            }
            console.log(actionsPerSecond);
            break
        case 39:
            if(step)
            {
                update();
            }
            else
            {
                size++
                console.log(size);
                changeSize();
            }
            break
        case 40:
            if(actionsPerSecond > 4)
            {
                actionsPerSecond -= 4;
            }
            else
            {
                actionsPerSecond /= 2;
            }
            console.log(actionsPerSecond);
            break
        case 32:
            shuffle(array);
            iteration = -1;
            restrict = 1;
            stop = false;
            break
        case 80:
            step = !step;
    }
}