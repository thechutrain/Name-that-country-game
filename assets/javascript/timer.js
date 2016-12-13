// Create a universal timer object
let timer = {
  SECONDS_PER_QUESTION: 10,
  // secondsLeft: SECONDS_PER_QUESTION, // can't do this :(
  secondsLeft: null,
  timerReference: null,
  displayTarget: document.querySelector("#timerDisplay"),

  start(){
    // creates a new timer & begins the count down
    // 1) initialize seconds left to Constant
    this.secondsLeft = this.SECONDS_PER_QUESTION;
    // 2) update view
    this.display();
    // 3) create 1 second timer intervale & assign it to the timerReference
      // a) subtract one second from seconds left
      // b) if seconds left is less than 0
        //i) clear timer
        //ii) call the callback
  },
  
  pause(){
    // pauses the current timer
  },

  clear(){
    // clears the timer
    clearInterval(this.timerReference);
  },

  display(){
    // updates the view
    switch(this.secondsLeft){
      case 1:
        this.displayTarget.innerHTML = "1 second left";
      break;
      case 0:
        this.displayTarget.innerHTML = "Out of time";
      break;
      default:
          this.displayTarget.innerHTML = this.secondsLeft + " seconds left";
      break;
    }
  },

  timesup_callback(){
    // this is the callback function that gets called when time is up
  }
}

// TESTING
timer.start();
