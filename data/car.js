class Car{
  brand;
  model;
  speed;
  trunk;
  constructor(brand, model){
    this.brand = brand;
    this.model = model;
    this.speed = 0;
    this.trunk = false;
  }

  displayInfo() {
  console.log(`Brand: ${this.brand}  Model: ${this.model} Speed: ${this.speed} km/h is the trunk opened? ${this.trunk}`)    
  }
  /**
   * 
   */
  go() {
    if(this.trunk === false){
       if(this.speed<=195){
    this.speed += 5;
  }
  else{console.log('speed cannot exceed 200')}
    }
    else{
      console.log('Cannot move when the trunk is open')
    }
   
  }
  /**
   * 
   */
  break() {
    if(this.speed>=5){
    this.speed-= 5
  }
    else{console.log('car is already at rest')}

  }
  /**
   * 
   */
  isTrunkOpen() {
    if(this.trunk===false){
      console.log('Trunk is closed')
  }
  else{
    console.log('trunk is open')
  }
}
openTrunk(){
  this.trunk = true;
}
closeTrunk(){
  this.trunk = false;
}
}
const car1 =new Car('Toyota', 'Corolla')
const car2 =new Car('Tesla', 'Model 3')
console.log(car1);
console.log(car2)
car1.displayInfo();
car1.go();
car1.go();
car1.break();
car1.break();
car1.break();

car1.displayInfo();
car1.displayInfo();
car2.openTrunk();
car2.go();




class RaceCar extends Car{
  #trunk = false
  acceleration;
  #topSpeed
  constructor(brand, model,acceleration){
    super(brand,model)
    this.acceleration = acceleration
    this.topSpeed = 300;
  }
  go(){
    this.speed+=this.acceleration;
  }
}
const raceCar1 = new RaceCar('Ferrari', 'F1', 10)
raceCar1.displayInfo()
raceCar1.go()
raceCar1.displayInfo()
raceCar1.go()
raceCar1.go()
raceCar1.go()
raceCar1.go()
raceCar1.displayInfo()
