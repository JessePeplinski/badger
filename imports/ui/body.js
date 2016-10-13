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

// Template.body.events({
//   'submit .new-task'(event) {
//     // Prevent default browser form submit
//     event.preventDefault();
 
//     // Get value from form element
//     const target = event.target;
//     const text = target.text.value;
 
//     // Insert a task into the collection
//     Tasks.insert({
//       text,
//       createdAt: new Date(), // current time
//     });
 
//     // Clear form
//     target.text.value = '';
//   },
// });


Template.body.events({
  'submit .new-talk'(event) {
    // Prevent default browser form submit
    event.preventDefault();

    var theName = event.target.name.value;
    var theType = event.target.type.value;
    var theDescription = event.target.description.value;
    var theUrl = event.target.url.value;
    

    Talk.insert({
        name: theName,
        type: theType,
        description : theDescription,
        url: theUrl,
        hidden: "false",
        addedToUser : 0
    });
 
    // Clear form after being added to db
    target.name.value = '';
    target.type.value = '';
    target.url.value = '';
  },

  'submit .new-member'(event) {
    // Prevent default browser form submit
    event.preventDefault();

    var theName = event.target.name.value;

    // TODO Add array of lightningTalkNames or just create relation to it
    User.insert({
        name: theName,
        lightningCount: 0,
        eventCount: 0,
        announcementCount: 0

    });
 
    // Clear form after being added to db
    target.name.value = '';
  },

   // Delete the talk
  'click .delete-talk'() {
    Talk.remove(this._id);
  },

  // Delete the member
  'click .delete-member'() {
    User.remove(this._id);
  },

  // Add the talk to the user count
  'click .submit-talk'() {

    // TALKS
    var talkId = this._id;
    Session.set('selectedTalkId', talkId);
    var selectedTalkId = Session.get('selectedTalkId');
    console.log(selectedTalkId);

    var talkName = this.name;
    Session.set('selectedTalkName', talkName);
    var selectedTalkName = Session.get('selectedTalkName');
    console.log(selectedTalkName);

    var talkType = this.type;
    Session.set('selectedTalkType', talkType);
    var selectedTalkType = Session.get('selectedTalkType');
    console.log(selectedTalkType);

    var hidden = this.hidden;
    Session.set('selectedHidden', hidden);
    var selectedHidden = Session.get('selectedHidden');
    console.log(selectedHidden);

    Talk.update({_id: talkId}, {$set:{hidden: "hidden"}}); 

    // USERS
    var users = User.find();

    // TODO - dont add same named members
    // TODO what if name and type are the same? need to do some description checking as well (not equal each other maybe)

    users.forEach(function(theUser) {
      console.log("USER ITERATION: The id is " + theUser._id + " The user name is " + theUser.name + ". Lightning count is " + theUser.lightningCount + ". Event count is " + theUser.eventCount  + ". AnnouncementCount is " + theUser.announcementCount);

      // (If theUser.name === talkName)
      if(theUser.name === selectedTalkName) {
        if(selectedTalkType === "Lightning Talk") {
          theUser.lightningCount = theUser.lightningCount + 1;
          User.update({_id : theUser._id}, {$set:{lightningCount: theUser.lightningCount}});  
        }
        else if(selectedTalkType === "Upcoming Event") {
          theUser.eventCount = theUser.eventCount + 1;
          User.update({_id : theUser._id}, {$set:{eventCount: theUser.eventCount}});  
        }

        else if(selectedTalkType === "Announcement") {
          theUser.announcementCount = theUser.announcementCount + 1;
          User.update({_id : theUser._id}, {$set:{announcementCount: theUser.announcementCount}});  
        }
        // ELSE IF (etc...)
      }
    });



    // Archive the talk to REST API

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