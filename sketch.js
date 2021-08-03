var dog, happyDog
var database
var foodObj
var foodS, foodStock, feed, addFood
var fedTime, lastFed

function preload(){
  Dog= loadImage("DogImg.png");
  happyDog = loadImage("dogImg1.png")
}
function setup() {
createCanvas(500,500);
database = firebase.database()

foodObj = new Food();

 foodStock=database.ref('Food') ;
 foodStock.n("value", readStock);

  dog = createSprite(250, 350, 10, 60);
  dog.addImage(dogImg);
  dog.scale = 0.2;

  feed = createButton('Feed The Dog');
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood= createButton("Add Button");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);
}


function draw() {  
background(46, 139, 87)

foodObj.display();

fedTime = database.ref('FeedTime');
fedTime.on("value", function(data){
lastFed=data.val();
})
fill(255,255,254);
textSize(15);
if(lastFed >=12){
  text("Last Fed:"+ lastFed%12 + "PM", 350, 30);
}else if (lastFed==0){
  text("Last Feed: 12 AM", 350,30)
}else{
  text("Last Feed:"+ lastFed +"AM", 350,30);
}
var series = [8, 2, 3, 14, 7, 9]
var min = series[0]
var i = 0
//text(min,400,400)
for (var i = 0; i < 6; i++) {
  //const element = array[index];
  if (min<series[i+1]){
    min = series[i]
  }
  else {
    min = series[i+1]
  }
  //min = series[i]
 text(min,400,400*(i+1)) 
}
//text(min,400,400)
  drawSprites();
  text(foodStock)
  textSixe(15)
  
}

function readStock(data){
  foodS = data.val();
}
function writeStock (x){
  if(x<=0){
    x=0
  }else{
    x=x = 1;
  }
database.ref ("/").update({
  Food: x
}

)

}
function feedDog(){
  dog.addImage(happyDog);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/'),update({
    Food: foodObj.getFoodStock(),
      FeedTime : hour ()
  })
}
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food: foodS
  })
}



