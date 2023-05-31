// * events (publish subscribe / mediator) pattern

let events = {
  events: {},
  on: function (eventName, fn) {
    this.events[eventName] = this.events[eventName] || [];
    this.events[eventName].push(fn);
  },
  off: function (eventName, fn) {
    if (this.events[eventName]) {
      for (let i = 0; i < this.events[eventName].length; i++) {
        if (this.events[eventName][i] === fn) {
          this.events[eventName].splice(i, 1);
          break;
        }
      };
    }
  },
  emit: function (eventName, data) {
    if (this.events[eventName]) {
      this.events[eventName].forEach(function (fn) {
        fn(data);
      });
    }
  }
};

// ! eXamP pressStart ⬇️

// * 1. a module that is subscribing/on to an event
// ? events.on('peopleChanged', someHandler);

// * 2. because peopleChanged didn't exist, it was created
// ? events: {
// ?   peopleChanged: [someHandler],
// ? }

// * 3. another module that is subscribing/on to an event 
// ? events.on('peopleChanged', someOtherHandler);

// * 4. because peopleChanged already existed, someOtherHandler was pushed into the array
// ? events: {
// ?   peopleChanged: [someHandler, someOtherHandler],
// ? }

// * 5. a module that is publishing/emit an event
// ? events.emit('peopleChanged',  8);

// ? the emit function (see below) says, if there is an event called peopleChanged, then loop through 
// ? the array of functions and call each one with the data that was passed in

// ! eXamP gameOver ⬆️

// pubSub => events
// pubSub.subscribe() => events.on()
// pubSub.unscubscribe() => events.off()
// pubSub.publish => events.emit() || events.trigger()