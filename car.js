// Creating the car class that is referenced in main.js
class Car {
  // Four values that are passing into the object when created
  // This allows the car to know where it is and how big it is
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;

    // We need to create speed and acceleration
    this.speed = 0;
    this.acceleration = 0.2;
    // As well as friction
    // This max speed creates an overflow when we start to go left or right, making us actually go above the speed
    this.maxSpeed = 3;
    this.friction = 0.05;

    // Using angles to alter turning speed
    this.angle = 0;

    this.sensor = new Sensor(this);

    // Controls from the controls.js file
    this.controls = new Controls();
  }

  update(roadBorders) {
    this.#move();
    this.sensor.update(roadBorders);
  }

  #move() {
    if (this.controls.forward) {
      // Remember that the controls on a computer are inverse
      this.speed += this.acceleration;
    }
    if (this.controls.reverse) {
      this.speed -= this.acceleration;
    }
    // Capping the speed at the max
    if (this.speed > this.maxSpeed) {
      this.speed = this.maxSpeed;
    }
    // Negative sign only represents that the car is going backwards
    if (this.speed < -this.maxSpeed / 2) {
      this.speed = -this.maxSpeed / 2;
    }
    if (this.speed > 0) {
      this.speed -= this.friction;
    }
    if (this.speed < 0) {
      this.speed += this.friction;
    }
    // Because of the if statement above, the car is constantly slippling between negative and postive value, therefore it is slowly moving up
    // This if statement, checks if the value is less than the friction, if so, the car just stops moving its position
    if (Math.abs(this.speed) < this.friction) {
      this.speed = 0;
    }
    if (this.speed != 0) {
      const flip = this.speed > 0 ? 1 : -1;
      // This 0.03 value works because of the unit circle, but this unit circle is rotated 90 degrees
      // So it is a little funky
      if (this.controls.left) {
        this.angle += 0.03 * flip;
      }
      if (this.controls.right) {
        this.angle -= 0.03 * flip;
      }
    }
    // Using trigonometry, we can make the car turn while driving, not just rotate in place
    this.x -= Math.sin(this.angle) * this.speed;
    this.y -= Math.cos(this.angle) * this.speed;
  }

  // Method that gets the context passed through
  draw(ctx) {
    // The following calls are made to rotate the car so that it can turn
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(-this.angle);
    // Begins the drawing of the car context
    ctx.beginPath();
    ctx.rect(
      // The x of the car will be the center of the car inside
      -this.width / 2,
      -this.height / 2,
      this.width,
      this.height
    );
    ctx.fill();

    // This will stop from the car from doing infinite rotation
    ctx.restore();

    this.sensor.draw(ctx);
  }
}
