// Create a universal countdown object
var countdown = {
  SECONDS_PER_QUESTION: 5,
  // secondsLeft: SECONDS_PER_QUESTION, // can't do this, because it doesn't get made yet? :(
  secondsLeft: null,
  timerReference: null,
  displayTarget: document.querySelector("#timerDisplay"),

  /*
  initializes a new timer
  */
  initialize(){
    // creates a new timer & begins the count down
    // 1) initialize seconds left to Constant
    this.secondsLeft = this.SECONDS_PER_QUESTION;
    // 2) update view
    this.display();
    // 3) calls resume --> creates a timer
    this.resume();
  },

  /* if the timer was previouslly paused, it will resume itself from where it
  was
  */
  resume(){
    // 0) check if there is already a timer!!! don't want multipled things
    // updating the timer
    if (this.timerReference !== null || this.secondsLeft < 0) return;
    // 1) create 1 second timer intervale & assign it to the timerReference
    this.timerReference = setInterval(function(){
      // console.log(this); // bounded to the timer object
      // a) subtract one second from seconds left
      this.secondsLeft --;
      // b) update the view
      this.display();
      // c) if seconds left is less than 0
      if (this.secondsLeft < 0){
        //i) clear timer
        this.clear();
        //ii) call the callback
        this.timesup_callback();
      }
    }.bind(this), 1000);
  },

  // could have just used clear() but seems more intuitive for user
  pause(){
    this.clear();
  },

  // updates the view of the timer
  display(){
    // updates the view
    switch(this.secondsLeft){
      case 1:
        this.displayTarget.innerHTML = "1 second left";
      break;
      case -1:
        this.displayTarget.innerHTML = "Out of time";
      break;
      default:
          this.displayTarget.innerHTML = this.secondsLeft + " seconds left";
            // this.displayTarget.innerHTML = `${this.secondsLeft seconds} left`;
      break;
    }
  },

  clear(){
    // clears the timer
    clearInterval(this.timerReference);
    this.timerReference = null;
  },

  timesup_callback(){
    // this is the callback function that gets called when time is up
    console.log("times up!");
  }
}

// ------ TESTING ---------
countdown.initialize();
