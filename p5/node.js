class Node {
  constructor(title) {
    this.pos = createVector(random(width), random(height));
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.baseR = 10;
    this.r = this.baseR;
    this.focus = false;
    this.title = title;
    this.connections = [];
    this.m = 1;
    this.colour = color(0, 0, 200);
  }

  applyForce(force) {
    // Apply force: F = ma => a = F/m
    let f = p5.Vector.div(force, this.m);
    this.acc.add(f);
  }

  applyRepulsion(other) {
    let distance = max(p5.Vector.dist(this.pos, other.pos), this.r + other.r);
    let repulsionForce = p5.Vector.sub(this.pos, other.pos);
    let mag = 1000 / (distance * distance);
    repulsionForce.setMag(mag);
    this.applyForce(repulsionForce);
    other.applyForce(repulsionForce.mult(-1));
  }

  edgeRepulsion() {
    let bounceFactor = 0.9; // Factor for velocity reduction after bouncing

    // Left edge
    if (this.pos.x - this.r < 0) {
      this.pos.x = this.r; // Clamp position inside the boundary
      this.vel.x *= -bounceFactor; // Reverse velocity and apply bounce damping
    }

    // Right edge
    if (this.pos.x + this.r > width) {
      this.pos.x = width - this.r; // Clamp position inside the boundary
      this.vel.x *= -bounceFactor; // Reverse velocity and apply bounce damping
    }

    // Top edge
    if (this.pos.y - this.r < 0) {
      this.pos.y = this.r; // Clamp position inside the boundary
      this.vel.y *= -bounceFactor; // Reverse velocity and apply bounce damping
    }

    // Bottom edge
    if (this.pos.y + this.r > height) {
      this.pos.y = height - this.r; // Clamp position inside the boundary
      this.vel.y *= -bounceFactor; // Reverse velocity and apply bounce damping
    }
  }

  checkCollision(other) {
    let distance = p5.Vector.dist(this.pos, other.pos);
    let minDist = 1.2 * (this.r + other.r);
    if (distance < minDist) {
      let overlap = minDist - distance;
      let collisionNormal = p5.Vector.sub(this.pos, other.pos);
      collisionNormal.normalize();
      let correction = collisionNormal.mult(overlap / 2);
      this.pos.add(correction);
      other.pos.sub(correction);
      let repulsionForce = collisionNormal.mult(overlap * 0.01);
      this.applyForce(repulsionForce);
      other.applyForce(repulsionForce.mult(-1));
    }
  }

  connect(other) {
    springs.push(new Spring(this, other));

    this.connections.push(other.title);
    other.connections.push(this.title);

    this.m += 1;
    other.m += 1;

    this.baseR = this.m * 10;
    other.baseR = other.m * 10;

    this.r = this.baseR;
    other.r = other.baseR;
  }

  update() {
    if (this.focus) {
      // Snap towards the center if focused
      this.pos = p5.Vector.lerp(
        this.pos,
        createVector(width / 2, height / 2),
        0.1
      );
      this.r = lerp(this.r, 150, 0.1);
    } else {
      // Update velocity and position
      this.r = lerp(this.r, this.baseR, 0.1);
      this.vel.add(this.acc);
      this.pos.add(this.vel);
      this.acc.mult(0); // Reset acceleration after each frame
      this.vel.mult(0.9); // Damping
      for (let key in nodes) {
        this.checkCollision(nodes[key]);
        this.applyRepulsion(nodes[key]);
        this.edgeRepulsion(nodes[key]);
      }
    }
  }

  setFocus() {
    for (let key in nodes) {
      nodes[key].colour = color(0, 0, 200, 50);
    }
    for (let key of this.connections) {
      nodes[key].colour = color(0, 0, 200, 150);
    }
    this.focus = true;
    this.colour = color(0, 0, 200, 255);
  }

  clearFocus() {
    this.colour = color(0, 0, 200, 250);
    this.focus = false;
  }

  show() {
    fill(this.colour);
    stroke(0);
    strokeWeight(0);

    ellipse(this.pos.x, this.pos.y, this.r * 2);

    // Set the text size
    let fontSize = 16; // Starting font size
    textSize(fontSize);

    // Measure the title's text width
    let textW = textWidth(this.title);

    // If text is too wide, scale it down to fit within the ball's diameter
    while (textW > this.r * 1.8 && fontSize > 6) {
      fontSize -= 1; // Reduce font size
      textSize(fontSize); // Set the new font size
      textW = textWidth(this.title); // Recalculate text width
    }

    // Display the title in the center of the ball
    fill(255); // Text color (black)
    noStroke();
    textAlign(CENTER, CENTER);
    textFont('Courier New');
    text(this.title, this.pos.x, this.pos.y); // Center text inside the ball
  }
}
