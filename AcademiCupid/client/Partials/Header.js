// Template.loginButtons.onCreated(function() {
// 	console.log("onCreated");
//  // if(User.findOne({owner: this.userId}) == null) {
//  // 	console.log("inside the if statement");
//  // 	User.insert({});
//  // 	//User.insert({owner: this.userId});
//  // }
// });

// Accounts.onCreateUser(function(options, user) {
//     //pass the surname in the options

//     user.profile['surname'] = options.surname	

//     return user
// }

// https://medium.com/all-about-meteorjs/extending-meteor-users-300a6cb8e17f

Template.EventSingle.onCreated(function() {
 var self = this;
 self.autorun(function() {
  var id = FlowRouter.getParam('id');
  self.subscribe('singleEvent', id); //when we subscribe to 'singleRecipe', we are passing in a single id, to our publish statement (refer to publish.js)
 });
});