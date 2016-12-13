// ----------- initialize variables -------------
var currentCountryObject = null;
var answerCountryArray = []; // arrayified country word, with all the letters
var userCountryArray = []; // arrayified country word, but none of the letters shown
var activeGame = false; // controls whether the game is active or not

// ----------- helper functions -------------
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


// ----------- playGame eventlistener function --------
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

    //3c) set active game to true & start the count down!
    activeGame = true;
    countdown.initialize();

} // closes playGame function


// ----------- keydown eventlistener function --------
function keyDown(){
  console.log("You pressed a key");
  // 1) check if it is an active game

  // 2) check if the letter is valid

  // 3) check if letter is in the Country

    // 3a) if letter is not in country --> wrong Guess

    // 3b) if letter is in country -- > Right Guess

} // closes keyDown function



// ------- Event Listeners -------
$(document).ready(function(){
  // hide the Game initially
  $("#gameRow").hide();

  // playGame event listener
  $("#playGame").on("click", playGame)

  // keydown event listener
  $(document).on("keydown", keyDown)

});
