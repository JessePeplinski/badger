import { Template } from 'meteor/templating';
 
import { Tasks } from '../api/tasks.js';
import { Talk } from '../api/tasks.js';
import { User } from '../api/tasks.js';
 
import './task.js';
import './body.html';
 
Template.body.helpers({
  // tasks() {
  //   return Tasks.find({});
  // },
  talk() {
    return Talk.find({});
  },
  user() {
    return User.find({});
  },
});

Template.body.events({
  'submit .new-task'(event) {
    // Prevent default browser form submit
    event.preventDefault();
 
    // Get value from form element
    const target = event.target;
    const text = target.text.value;
 
    // Insert a task into the collection
    Tasks.insert({
      text,
      createdAt: new Date(), // current time
    });
 
    // Clear form
    target.text.value = '';
  },
});


Template.body.events({
  'submit .new-talk'(event) {
    // Prevent default browser form submit
    event.preventDefault();

    var theName = event.target.name.value;
    var theType = event.target.type.value;
    var theDescription = event.target.description.value;
    

    Talk.insert({
        name: theName,
        type: theType,
        description : theDescription,
        addedToUser : 0
    });
 
    // Clear form after being added to db
    target.name.value = '';
    target.type.value = '';
    target.description.value = '';
  },

  'submit .new-member'(event) {
    // Prevent default browser form submit
    event.preventDefault();

    var theName = event.target.name.value;

    User.insert({
        name: theName,
    });
 
    // Clear form after being added to db
    target.name.value = '';
  },

   // Delete the id
  'click .delete-talk'() {
    Talk.remove(this._id);
  },

  // Delete the id
  'click .delete-member'() {
    User.remove(this._id);
  },

  // Add the talk to the user count
  'click .submit-talk'() {


  	// Iterate through the values of the database
  	var talks = Talk.find();
  	var users = User.find();

  	// Update this value in the database
	// User.update(User._id, {
	// 	$set: {lightningCount : 5},
	// });

	// Cant call this - need to get the ID of the User and not the Talk

	// console.log(this);

	console.log("lightingCount should be updated by 5");

	// users.forEach(function(theUser) {
	// 	console.log("USER ITERATION: The user name is " + theUser.name + ". Lightning count is " + theUser.lightningCount + ". Event count is " + theUser.eventCount  + ". AnnouncementCount is " + theUser.announcementCount);
	// });
	// console.log(this);


  

  	users.forEach(function(theUser) {
  		talks.forEach(function(theTalk) {
  		
  		console.log("TALK ITERATION: The user name is " + theTalk.name + ". Type is " + theTalk.type + ". Descirption is " + theTalk.description + ". Added to user is "+ theTalk.addedToUser);

		console.log("USER ITERATION: The user name is " + theUser.name + ". Lightning count is " + theUser.lightningCount + ". Event count is " + theUser.eventCount  + ". AnnouncementCount is " + theUser.announcementCount);

		if(theUser.name === theTalk.name && theTalk.addedToUser === 0) {
			// console.log("GOT INTO FIRST IF");
			// console.log(theTalk.type +" is the type name");
			if(theTalk.type === "Lightning Talk") {
				console.log("TRYING TO ADD LIGHTING TALK");
				theUser.lightningCount = theUser.lightningCount + 1;

				// Set the talk to added_to_user to 1
				
				// console.log(this._id);

				// Update this value in the database
				User.update(theUser._id, {
      				$set: {lightningCount : theUser.lightningCount},
    			});

				console.log(theUser.lightningCount + " light talk value is 1; Light count should be incremented by 1!!");
			}
		}

  		});
  	});
  	},
  	

  	// IF(name from talk == name from user && addedToUser from Talk == 0)
  		// IF(type from talk is lightning talk)
  			// Increment lightingCount from User
  			// Set incremented to user = 1
  		// ELSE IF(type from talk is event)
  			// Increment lightingCount from User
  			// Set incremented to user = 1
  		// ELSE IF(type from talk is announcement)
  			// Increment lightingCount from User
  			// Set incremented to user = 1
    
  
});