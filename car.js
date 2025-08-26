// Creating the car class that is referenced in main.js
class Car {
  // Four values that are passing into the object when created
  // This allows the car to know where it is and how big it is
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;

    // Controls from the controls.js file
    this.controls = new Controls();
  }

  update() {
    if (this.controls.forward) {
      // Remember that the controls on a computer are inverse
      this.y -= 2;
    }
    if (this.controls.reverse) {
      this.y += 2;
    }
    if (this.controls.right) {
      this.x -= 2;
    }
    if (this.controls.left) {
      this.x += 2;
    }
  }

  // Method that gets the context passed through
  draw(ctx) {
    ctx.beginPath();
    ctx.rect(
      // The x of the car will be the center of the car inside
      this.x - this.width / 2,
      this.y - this.height / 2,
      this.width,
      this.height
    );
    ctx.fill();
  }
}
