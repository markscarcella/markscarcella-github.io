class Spring {
  constructor(endA, endB) {
    this.endA = endA;
    this.endB = endB;
    this.l0 = 100;
    this.k = 0.01;
  }
  
  applyForce() {
    // F = -k * x
    let F = p5.Vector.sub(this.endA.pos, this.endB.pos);
    let l = F.mag();
    let x = l - this.l0;
    F.normalize(); 
    F.mult(-this.k * x);     
    this.endA.applyForce(F);
    this.endB.applyForce(F.mult(-1));
  }
  

  update() {
    this.applyForce();
  }
  
  show() {
    stroke(0);
    strokeWeight(4);
    let direction = p5.Vector.sub(this.endB.pos, this.endA.pos);
    let distance = direction.mag();
    direction.normalize();
    let startPoint = p5.Vector.add(this.endA.pos, direction.copy().mult(this.endA.r));
    let endPoint = p5.Vector.sub(this.endB.pos, direction.copy().mult(this.endB.r));
    stroke(100, 100, 100, 100); 
    line(startPoint.x, startPoint.y, endPoint.x, endPoint.y);
  }

}