// Creating the road on which the car will drive
const carCanvas = document.getElementById("carCanvas");
carCanvas.width = 200;

const networkCanvas = document.getElementById("networkCanvas");
networkCanvas.width = 300;

// Canvas Context for the car, this will contain all of the method that we need to draw what we need to draw
const carCtx = carCanvas.getContext("2d");
const networkCtx = networkCanvas.getContext("2d");
const road = new Road(carCanvas.width / 2, carCanvas.width * 0.9);
const car = new Car(road.getLaneCenter(1), 100, 30, 50, "AI", 3);
const traffic = [new Car(road.getLaneCenter(1), -100, 30, 50, "DUMMY")];

animate();

function animate(time) {
  for (let i = 0; i < traffic.length; i++) {
    traffic[i].update(road.borders, []);
  }
  car.update(road.borders, traffic);
  // By moving this line of code to this function, we are able to over come the issue of the road not going from top to bottow, and the car leaving a trail
  // This is because both are updated on the animate funciton, therefore being refreshed
  carCanvas.height = window.innerHeight;
  networkCanvas.height = window.innerHeight;

  carCtx.save();
  carCtx.translate(0, -car.y + carCanvas.height * 0.8);
  road.draw(carCtx);
  for (let i = 0; i < traffic.length; i++) {
    traffic[i].draw(carCtx, "black");
  }
  car.draw(carCtx, "blue");
  carCtx.restore();
  // Calls the animation again and again, giving the illusion of movement
  networkCtx.lineDashOffset = -time / 50;
  Visualizer.drawNetwork(networkCtx, car.brain);
  requestAnimationFrame(animate);
}
