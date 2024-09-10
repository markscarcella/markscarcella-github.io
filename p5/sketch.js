let nodes = {};
let springs = [];

function setup() {
  createCanvas(1000, 800);
  canvas.parent('p5-container');

  nodes["Physics"]      = new Node("Physics");
  nodes["Education"]    = new Node("Education");
  nodes["Making"]       = new Node("Making");
  nodes["Design"]       = new Node("Design");
  nodes["Woodworking"]  = new Node("Woodworking");
  nodes["Metalworking"] = new Node("Metalworking");
  nodes["Programming"]  = new Node("Programming");
  nodes["Electronics"]  = new Node("Electronics");
  nodes["Higgs Boson"]  = new Node("Higgs Boson");
  nodes["Get Clever"]  = new Node("Get Clever");
  nodes["Pinocchio"]  = new Node("Pinocchio");
  nodes["ThinkerShield"] = new Node("ThinkerShield");
  nodes["Observatory AR"] = new Node("Observatory AR");


  nodes["Physics"].connect(nodes["Education"]);
  nodes["Physics"].connect(nodes["Programming"]);
  nodes["Physics"].connect(nodes["Higgs Boson"]);
  nodes["Physics"].connect(nodes["Get Clever"]);
  
  nodes["Education"].connect(nodes["Making"]);
  nodes["Education"].connect(nodes["Programming"]);
  nodes["Education"].connect(nodes["Electronics"]);
  nodes["Education"].connect(nodes["Get Clever"]);
  nodes["Education"].connect(nodes["ThinkerShield"]);
  nodes["Education"].connect(nodes["Observatory AR"]);
  
  nodes["Electronics"].connect(nodes["ThinkerShield"]);
  
  nodes["Programming"].connect(nodes["ThinkerShield"]);
  nodes["Programming"].connect(nodes["Observatory AR"]);

  nodes["Making"].connect(nodes["Design"]);
  nodes["Making"].connect(nodes["Woodworking"]);
  nodes["Making"].connect(nodes["Metalworking"]);
  nodes["Making"].connect(nodes["Electronics"]);
  
  nodes["Design"].connect(nodes["Electronics"]);
  nodes["Design"].connect(nodes["Programming"]);

  nodes["Woodworking"].connect(nodes["Pinocchio"]);

}

function draw() {
  background(255);

  for (let spring of springs) {
    spring.update();
    spring.show();
  }

  for (let key in nodes) {
    nodes[key].update();
    nodes[key].show();
  }
}

function mouseClicked() {
  for (let key in nodes) {
    nodes[key].clearFocus();
  }
  for (let key in nodes) {
    if (dist(nodes[key].pos.x, nodes[key].pos.y, mouseX, mouseY) < nodes[key].r) {
      nodes[key].setFocus();
    }
  }
}
