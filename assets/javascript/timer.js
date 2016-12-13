// Create a universal timer object
let timer = {
  SECONDS_PER_QUESTION: 10,
  // secondsLeft: SECONDS_PER_QUESTION, // can't do this :(
  secondsLeft: null,
  timerReference: null,
  displayTarget: document.querySelector("#timerDisplay"),

  start(){
    // creates a new timer & begins the count down
  },
  pause(){
    // pauses the current timer
  },
  display(){
    // updates the view
  }

}
