// ----------- playGame eventlistener function --------
function playGame(){
  alert("Play game");
  //1) hide the directions div
  //**2) Load a country!

  //3) display the map div

} // closes playGame function


// ----------- keydown eventlistener function --------
function keyDown(){
  alert("You pressed a key");
  // 1) check if it is an active game

  // 2) check if the letter is valid

  // 3) check if letter is in the Country

    // 3a) if letter is not in country --> wrong Guess

    // 3b) if letter is in country -- > Right Guess

} // closes keyDown function



// ------- Event Listeners -------
$(document).ready(function(){
  // playGame event listener
  $("#playGame").on("click", playGame)

  // keydown event listener
  $(document).on("keydown", keyDown)

});
