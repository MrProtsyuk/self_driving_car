// Creating the road on which the car will drive
const canvas = document.getElementById("myCanvas");
canvas.height = window.innerHeight;
canvas.width = 200;

// Canvas Context for the car, this will contain all of the method that we need to draw what we need to draw
const ctx = canvas.getContext("2d");
const car = new Car(100, 100, 30, 50);
car.draw(ctx);
