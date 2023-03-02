//Simple 3reel slot machine game.


var canvas1 = document.getElementById("canvas1");
var canvas2 = document.getElementById("canvas2");
var canvas3 = document.getElementById("canvas3");

var symbol_1 = "images/symbol_1.png";
var symbol_2 = "images/symbol_2.png";
var symbol_3 = "images/symbol_3.png";
var symbol_4 = "images/symbol_4.png";

const wincon1 = document.getElementById("win1");
const wincon2 = document.getElementById("win2");
const wincon3 = document.getElementById("win3");

const pressButton = document.getElementById('play-button');
pressButton.addEventListener('click', playGame);

//Push the button to randomize the symbols, 3 in a row is considered a win!
//playGame calls upon drawImageOnCanvas(), then disables the button for 0,5 seconds until you can play again.
function playGame() {
	drawImagesOnCanvas(canvas1,canvas2,canvas3);
	pressButton.disabled = true;
	pressButton.classList.add("clicked");

	setTimeout(() => {
		pressButton.disabled = false;
		pressButton.classList.remove("clicked");
	  }, 500);
}

//Main function. Takes canvas1-3 as parameters, draws 3 random symbols on each canvas.
function drawImagesOnCanvas(canvas1, canvas2, canvas3) {

	//All avalible images for the reels.
	var images = [
		symbol_1,
		symbol_2,
		symbol_3,
		symbol_4
	  ];
	  
	//Will clear all the reels before playing so you can keep playing the game forever.
	Promise.all([clearCanvas(canvas1), clearCanvas(canvas2), clearCanvas(canvas3)])
	.then(function(){
	   
		//Create 3 arrays with 3 random symbols from "images".
		var reel1 = selectRandomImages(images);
	  	var reel2 = selectRandomImages(images);
	  	var reel3 = selectRandomImages(images);

		var ctx1 = canvas1.getContext("2d");
		var ctx2 = canvas2.getContext("2d");
		var ctx3 = canvas3.getContext("2d");

		//Create Image objects and assign each object a randomized symbol. 
		var img1 = new Image();
		img1.src = reel1[0];
	
		var img2 = new Image();
		img2.src = reel1[1];

		var img3 = new Image();
		img3.src = reel1[2];

		var img4 = new Image();
		img4.src = reel2[0];
	
		var img5 = new Image();
		img5.src = reel2[1];

		var img6 = new Image();
		img6.src = reel2[2];

		var img7 = new Image();
		img7.src = reel3[0];
	
		var img8 = new Image();
		img8.src = reel3[1];

		var img9 = new Image();
		img9.src = reel3[2];
  
	// Wait for all images to load before drawing them on the canvas
	Promise.all([loadImage(img1), loadImage(img2), loadImage(img3), loadImage(img4),loadImage(img5),loadImage(img6),loadImage(img7),loadImage(img8),loadImage(img9)])
	.then(function() {

		//Draw the loaded images on each canvas. 
	  	ctx1.drawImage(img1, 0, 0, canvas1.width, canvas1.height / 3);
	  
	  	ctx1.drawImage(img2, 0, canvas1.height / 3, canvas1.width, canvas1.height / 3);

	  	ctx1.drawImage(img3, 0, (canvas1.height / 3) * 2, canvas1.width, canvas1.height / 3);

		ctx2.drawImage(img4, 0, 0, canvas2.width, canvas2.height / 3);

		ctx2.drawImage(img5, 0, canvas2.height / 3, canvas2.width, canvas2.height / 3);
	  
		ctx2.drawImage(img6, 0, (canvas2.height / 3) * 2, canvas2.width, canvas2.height / 3);

		ctx3.drawImage(img7, 0, 0, canvas3.width, canvas3.height / 3);

		ctx3.drawImage(img8, 0, canvas3.height / 3, canvas3.width, canvas3.height / 3);
		
		ctx3.drawImage(img9, 0, (canvas3.height / 3) * 2, canvas3.width, canvas3.height / 3);

	});

	//Win condition. 
	var win1 = false;
	var win2 = false;
	var win3 = false;

	//If winCondition comes back true a "WIN" text will be displayed on the row that had 3 similar symbols.
	if(winCondition(reel1[0],reel2[0],reel3[0]) === true){
		wincon1.style.display = "block";
	} else {
		wincon1.style.display = "none";
	}
	if(winCondition(reel1[1],reel2[1],reel3[1]) === true){
		wincon2.style.display = "block";
	} else {
		wincon2.style.display = "none";
	}
	if(winCondition(reel1[2],reel2[2],reel3[2]) === true){
		wincon3.style.display = "block";
	} else {
		wincon3.style.display = "none";
	}
	});

//End of main function.
}





//various functions


//loadImages, used by drawImagesOnCanvas().
//If promise resolves, returns the loaded image. 
function loadImage(img) {
	return new Promise(function(resolve, reject) {
	  img.onload = function() {
		resolve();
	  };
	  img.onerror = function() {
		reject();
	  };
	});
}

//Used by selectRandomImages().
//Returns a random int between 0 and max.
function getRandomInt(max) {
	return Math.floor(Math.random() * max);
}

//Used by main function.
//Create an arrray with 3 random symbols from images[]
function selectRandomImages(images) {
	const selectedImages = [];

	for (let i = 0; i < 3; i++) {
	  const randomIndex = getRandomInt(images.length);
	  selectedImages.push(images[randomIndex]);
	}
	return selectedImages;
}

//Used by main function.
//if img1, img2 and img3 are the same, return true.
function winCondition(img1, img2, img3) {

	if(img1 === img2 && img2 === img3) {
		return true;
	}
} 

//Used by main function.
//clear anything that has been drawn on the canvases. 
function clearCanvas(canvas) {
	const ctx = canvas.getContext('2d');
	ctx.clearRect(0, 0, canvas.width, canvas.height);
}