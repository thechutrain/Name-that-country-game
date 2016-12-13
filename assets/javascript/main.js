// I) ----------- initialize variables -------------
var currentCountryObject = null;
var answerCountryArray = []; // arrayified country word, with all the letters
var userCountryArray = []; // arrayified country word, but none of the letters shown
var activeGame = false; // controls whether the game is active or not

// II ) ----------- helper functions -------------
// these functions get called from inside the event listeners

/* getCountry - randomizes the countriesArray, gets the last country,
* and gets us an array of the userCountryArray & answerCountryArray
*/
function getCountry(){
      /** this nested functions takes a word and converts it to an array
        * of either letters or empty spaces in place of letters
        * @param {str} word - the word that you will turn into an array
        * @param {boolean} showLetter - if true, it'll return an array containing letter values
        * @return {array} arrayifiedWord - an array of the word that was in the arguments
        */
        arrayifiedWord = function(word, showLettersBool){
            var arrayifiedWord = [];
            // *) Loop through the word
            for (index in word){
              if(word[index]==" "){
                // console.log("//");
                arrayifiedWord.push("//");
              } else if (showLettersBool){
                // console.log(word[index]);
                arrayifiedWord.push(word[index].toUpperCase());
              } else{
                // console.log(word[index]);
                arrayifiedWord.push(" ");
              }
            }
            // console.log(arrayifiedWord);
            return arrayifiedWord;
          };
  // console.log("inside getCountry function .... ");
  // 1) randomize the countriesArray
  // TO DO

  // 2) get the last country
  currentCountryObject = countriesArray.pop();
  // console.log(currentCountryObject.name);
    //2a) assign answerCountryArray & userCountryArray
    answerCountryArray = arrayifiedWord(currentCountryObject.name, true);
    userCountryArray = arrayifiedWord(currentCountryObject.name, false);
    // console.log(answerCountryArray);
    // console.log(userCountryArray);
}

/* displayCountry - takes a country name string and updates view so that it will
* highlight that country. If no string, displays no country
*/
function displayCountry(){
  var country = currentCountryObject.name;
  // console.log(country);
  // 1) GOOGLE script that updates the map
  google.charts.load('upcoming', {'packages':['geochart']});
  google.charts.setOnLoadCallback(drawRegionsMap);

  function drawRegionsMap() {
    if (country == undefined){
      var data = google.visualization.arrayToDataTable([
      ["Country"],
      ]);
    } else {
      var data = google.visualization.arrayToDataTable([
        ["Country"],
        [country],
      ]);
    }
    var options = {enableRegionInteractivity: false}; // !!! this is where to add options!!
    var chart = new google.visualization.GeoChart(document.getElementById('map_target'));
    chart.draw(data, options);
  }
} // closes displayCountry

/* displayWord - this function access the userCountryArray and displays letters
* if they exist, underlines if it doesn't, and spaces if '//'
*/
function displayWord(){
  // 1) create the container to append each letter
  var container = $("<p>")
  // 2) loop through the userArray and append their word to the container
  userCountryArray.forEach(function(element){
    if (element == " "){
      container.append( $("<span>").html("__ ") );
    } else if(element == "//") {
      container.append( $("<span>").html("&nbsp;") );
    } else{
      container.append( $("<span>").html(element) );
    }
  })
  //3) empty the user word container
  $("#word_target").empty();
  //4) update the user word with the container
  $("#word_target").append(container);
}

/* updateUserWord - function takes a given letter, and updates the userGuess
* word wherever that letter appears
*@param userGuess{string} - letter of the user guess
*/
function updateUserWord(userGuess){
// 1) loop through the answerCountryArray
  answerCountryArray.forEach(function(element, index){
    // 1a) if the answerCountry Array index == userGuess
    // console.log(element + ": " + index);
    if (element === userGuess){
      // update the userCountryArray index of the userGuess
      userCountryArray[index] = userGuess;
    }
  })
  // 2) update the display
}

/* hasWon - function checks to see if the user has won
*
*/
function hasWon(){
  for (var i=0; i < answerCountryArray.length; i++){
    if (answerCountryArray[i] !== userCountryArray[i]){
      // console.log(answerCountryArray[i] + " not equal to " + userCountryArray[i]);
      return false;
    }
  };
  return true;
}

// III) ----------- playGame eventlistener function --------
function playGame(){
  // console.log("playGame eventlistern ...");
  //1) hide the directions div
  $("#directionsRow").hide();
  //2) display the map div
  $("#gameRow").show();
  //**3) Intialize Game
    // 3a) Get a random country
    getCountry();

    // 3b) display the map with that random country
    displayCountry();

    // 3c) update the word display below the country
    displayWord();

    //3d) set active game to true & start the count down!
    activeGame = true;
    countdown.initialize();

} // closes playGame function


// III) ----------- keydown eventlistener function --------
function keyDown(event){
  // 1) check if it is an active game
  if (!activeGame) return;
  // 2) check if the letter is valid
  if (event.keyCode < 65 || event.keyCode > 90) return;
  // console.log(event.keyCode); // the number!
  // console.log(event.key); // the lower case letter
  // 3) Get the user's guess
  var userGuess = event.key.toUpperCase();
  // console.log(userGuess);
  // 4) check if letter is in the Country
  if (answerCountryArray.indexOf(userGuess) != -1){
    // 4a) if letter is in country -- > Right Guess
    //i) update view
      console.log('Found!');
      updateUserWord(userGuess);
      displayWord(); // updates the view
    //ii) check if the user has won
      if (hasWon()){
        countdown.clear(); // turns off the timer
        activeGame = false; // turns off the keydown event listeners
        alert("You've won!");
        // CALL THE NEXT THING!
      }

  } else {
    // 3b) if letter is not in country --> wrong Guess
    console.log("Sorry, no " + userGuess);
    return;
  }


} // closes keyDown function



// IV) ------- Event Listeners -------
$(document).ready(function(){
  // hide the Game initially
  $("#gameRow").hide();

  // playGame event listener
  $("#playGame").on("click", playGame)

  // keydown event listener
  $(document).on("keydown", keyDown)

});
