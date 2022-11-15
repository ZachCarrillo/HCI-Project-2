class ClockBox{
    constructor(w, h, posX, posY, text_fill, text) {
        this.w = w
        this.h = h
        this.posX = posX
        this.posY = posY
        this.text_fill = text_fill
        this.text = text
        this.is_over = false
        this.drag = false
        this.offsetX = 0
        this.offsetY = 0
    }

    display(){
        this.update()
        noFill();
        rect(this.posX, this.posY, this.w, this.h)
        fill(this.text_fill)
        textAlign(CENTER, CENTER)
        textSize(32)
        text(this.text, this.posX + this.w/2, this.posY + this.h/2)
        console.log(this.text)
    }

    check_mouseover(){
        return mouseX >= this.posX && mouseX <= this.posX + this.w && mouseY >= this.posY && mouseY <= this.posY + this.h;
    }
  
  update() {
        if (this.drag) {
            this.posX = mouseX + this.offsetX;
            this.posY = mouseY + this.offsetY;
        }
    }

    _pressed() {
        console.log("hihihihihi")
        if (mouseX > this.posX && mouseX < this.posX + this.w && mouseY > this.posY && mouseY < this.posY + this.h) {
            console.log("SET TO TRUYE")
            this.drag = true;
            this.offsetX = this.posX - mouseX;
            this.offsetY = this.posY - mouseY;
        }
    }

    released(){
        this.drag = false;
    }

}

class Box{
    constructor(w, h, posX, posY, text_fill, title, text) {
        this.w = w
        this.h = h
        this.posX = posX
        this.posY = posY
        this.text_fill = text_fill
        this.title = title
        this.text = text
        this.is_over = false
        this.drag = false
        this.offsetX = 0
        this.offsetY = 0
    }

    display(){
        this.update()
        noFill();
        rect(this.posX, this.posY, this.w, this.h)
        fill(this.text_fill)
        textAlign(LEFT, TOP)
        textSize(20)
        text(this.title, this.posX + this.w/10, this.posY + this.h/6, this.w - this.w/10, this.h)
        textSize(12)
        text(this.text, this.posX + (this.w/10), this.posY + this.h/3, this.w - this.w/10, this.h-this.h/4)
    }

    check_mouseover(){
        return mouseX >= this.posX && mouseX <= this.posX + this.w && mouseY >= this.posY && mouseY <= this.posY + this.h;
    }
  
  update() {
        if (this.drag) {
            this.posX = mouseX + this.offsetX;
            this.posY = mouseY + this.offsetY;
        }
    }

    _pressed() {
        if (mouseX > this.posX && mouseX < this.posX + this.w && mouseY > this.posY && mouseY < this.posY + this.h) {
            this.drag = true;
            this.offsetX = this.posX - mouseX;
            this.offsetY = this.posY - mouseY;
        }
    }

    released(){
        this.drag = false;
    }

}

async function get_weather(){
    const response = await fetch('https://api.weather.gov/points/33.5779,-101.8552');
    const json = await response.json()
    console.log(json)
}
get_weather()

async function get_hourly_forecast(){
    const response = await fetch('https://api.weather.gov/gridpoints/LUB/48,32/forecast/hourly');
    const json = await response.json()
    console.log(json)
}
get_hourly_forecast()

async function get_forecast(){
    const response = await fetch('https://api.weather.gov/gridpoints/LUB/48,32/forecast');
    const json = await response.json()
    console.log(json)
}
get_forecast()

//DISPLAY API
let curr_temp
let curr_short_forecast

async function get_temp(){
    const response = await fetch('https://api.weather.gov/gridpoints/LUB/48,32/forecast/hourly');
    const json = await response.json()
    console.log(json)
    curr_temp = json.properties.periods[0].temperature
    curr_short_forecast = json.properties.periods[0].shortForecast
}
class WeatherBox{
    constructor(w, h, posX, posY, text_fill) {
        this.w = w
        this.h = h
        this.posX = posX
        this.posY = posY
        this.text_fill = text_fill
        this.is_over = false
        this.drag = false
        this.offsetX = 0
        this.offsetY = 0
    }

    display(){
        this.update()
        get_temp();
        noFill();
        rect(this.posX, this.posY, this.w, this.h)
        fill(this.text_fill)
        textSize(32)
        textAlign(LEFT, CENTER)
        text(curr_temp, this.posX+25, this.posY + 37.5)
        textSize(24)
        textAlign(LEFT, CENTER)
        text(curr_short_forecast, this.posX+25, this.posY + 67.5)
    }

    check_mouseover(){
        return mouseX >= this.posX && mouseX <= this.posX + this.w && mouseY >= this.posY && mouseY <= this.posY + this.h;
    }
  update() {
        if (this.drag) {
            this.posX = mouseX + this.offsetX;
            this.posY = mouseY + this.offsetY;
        }
    }

    _pressed() {
        if (mouseX > this.posX && mouseX < this.posX + this.w && mouseY > this.posY && mouseY < this.posY + this.h) {
            this.drag = true;
            this.offsetX = this.posX - mouseX;
            this.offsetY = this.posY - mouseY;
        }
    }

    released(){
        this.drag = false;
    }

}

let news
let events
let bg
let img

function preload() {
    news = loadJSON('News.json');
    events = loadJSON('Events.json')
    weight = loadJSON('Weight.json')
    bg = loadImage('background.jpg');
  }

function setup() {
    createCanvas(1000, 1000);
    get_temp()
    tempBox = new WeatherBox(200, 100, 25, 12.5, 0)
    clockBox = new ClockBox(100, 50, 450, 12.5, 0, "")
    newsTitle = "News Stories for Today";
    newsText = "";
    eventsTitle = "Events Scheduled for Today";
    eventsText = "";
    for(let i = 0; i < 3; i++) {
        newsText += news.source[i] +": " + news.name[i] + "\n" + "Updated: "+ news.time[i] + "\n" + "\n\n";
        eventsText += events.time[i] + " - " + events.name[i] + "\n\n";
    }
    console.log(newsTitle);
    console.log(newsText)

    newsBox = new Box(200, 400, 775, 12.5, 0, newsTitle, newsText);
    eventsBox = new Box(200, 300, 775, 432.5, 0, eventsTitle, eventsText);
    let time = "";
    weightText = "";
    weightTitle = "Current Weight";
    if(weight.weight[0] > weight.weight[1]) {
       weightText = "You Currently Weigh "+ weight.weight[1] + " This is " + (weight.weight[0] - weight.weight[1]) + " pounds less than last week's weight of " + weight.weight[0];
       }
    else if(weight.weight[0] < weight.weight[1]) {
      weightText = "You Currently Weigh "+ weight.weight[1] + " This is "+ (weight.weight[1] - weight.weight[0]) + " pounds more than last week's weight of " + weight.weight[0];
    }
  else {
    weightText = "You Currently Weigh "+ weight.weight[1] + " This is the same weight recorded as last week";
  }
    weightBox = new Box(200, 150, 25, 700, 0, weightTitle, weightText);
}

function draw(){
    clear();
    image(bg, 0, 0);
    tempBox.display();
    time = hour() + ":" + minute();
    clockBox.text = time;
    clockBox.display();
    newsBox.display();
    eventsBox.display();
    weightBox.display();
}

function mousePressed() {
    tempBox._pressed();
    clockBox._pressed();
    newsBox._pressed();
    eventsBox._pressed();
    weightBox._pressed();
}

function mouseReleased() {
    tempBox.released();
    clockBox.released();
    newsBox.released();
    eventsBox.released();
    weightBox.released();

}
