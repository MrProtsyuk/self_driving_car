// Creating the road on which the car will drive
const canvas = document.getElementById("myCanvas");
canvas.height = window.innerHeight;
canvas.width = 200;

// Canvas Context for the car, this will contain all of the method that we need to draw what we need to draw
const ctx = canvas.getContext("2d");
const car = new Car(100, 100, 30, 50);

animate();

function animate() {
  car.update();
  // By moving this line of code to this function, we are able to over come the issue of the road not going from top to bottow, and the car leaving a trail
  // This is because both are updated on the animate funciton, therefore being refreshed
  canvas.height = window.innerHeight;
  car.draw(ctx);
  // Calls the animation again and again, giving the illusion of movement
  requestAnimationFrame(animate);
}
