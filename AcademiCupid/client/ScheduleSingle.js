Template.ScheduleSingle.helpers({
	getDayOfWeek: function(arg){
		if(arg == 0){
			return "Monday";
		}
		else if(arg == 1){
			return "Tuesday";
		}
		else if(arg == 2){
			return "Wednesday";
		}
		else if(arg == 3){
			return "Thursday";
		}
		else if(arg == 4){
			return "Friday";
		}
		else if(arg == 5){
			return "Saturday";
		}
		else if(arg == 6){
			return "Sunday";
		}
	},
	getSchedule: function(){
		//console.log("schedule called")
		var userId = FlowRouter.getParam('userId');
		var weekSchedule = [];
		var oneWeek = Meteor.users.findOne(userId).profile.schedule;
		//console.log(oneWeek);
		for (var oneDay in oneWeek) {
			if (oneWeek.hasOwnProperty(oneDay)) {
				var daySchedule = [];
				//daySchedule.push(oneDay);
				for(var timeSlot in oneWeek[oneDay]){
					daySchedule.push(oneWeek[oneDay][timeSlot]);	
				}
				//console.log(daySchedule);
				weekSchedule.push(daySchedule);
			}
		}
		return weekSchedule;
	},
	conditionalColor: function(row, col){
		var userId = FlowRouter.getParam('userId');
		var weekSchedule = [];
		var oneWeek = Meteor.users.findOne(userId).profile.schedule;
		dayFinder = {"0": "Monday", "1": "Tuesday", "2": "Wednesday", "3": "Thursday", "4": "Friday", "5": "Saturday", "6": "Sunday"};
		var timeSlot = (parseInt(col) + 1).toString();
		var Day = dayFinder[row];
		var timeSlot = oneWeek[Day][timeSlot]
		if(timeSlot == "Busy"){
			return "error";
		}
		else if(timeSlot == "Free"){
			return "positive";
		}
	},
	isClickable:function() {
		if(Meteor.userId() == FlowRouter.getParam("userId")){
			return "clickable";
		}
		return "";
	},
	isSelectable: function() {
		if(Meteor.userId() == FlowRouter.getParam("userId")){
			return "selectable";
		}
		return "";
	},
	showFinger: function() {
		if(Meteor.userId() == FlowRouter.getParam("userId")){
			return "cursor: pointer;";
		}
		return "";
	}
});

Template.ScheduleSingle.events({
	"click .clickable": function(event){
		var position = event.currentTarget.id;
		var row = position.split(",")[0];
		var col = position.split(",")[1];
		dayFinder = {"0": "Monday", "1": "Tuesday", "2": "Wednesday", "3": "Thursday", "4": "Friday", "5": "Saturday", "6": "Sunday"};
		var timeSlot = (parseInt(col) + 1).toString();
		var Day = dayFinder[row];
		//console.log(Day + timeSlot);
		var user = Meteor.users.findOne(Meteor.userId());
		var currentSchedule = user.profile.schedule;
		var fieldToUpdate = "profile.schedule." + Day + "." + timeSlot;
		if(currentSchedule[Day][timeSlot]==="Free"){
			//console.log("true")
			Meteor.users.update(Meteor.userId(), {$set: {[fieldToUpdate]: "Busy"}});
		}
		else if(currentSchedule[Day][timeSlot]==="Busy"){
			//console.log("false")
			Meteor.users.update(Meteor.userId(), {$set: {[fieldToUpdate]: "Free"}});
		}
		//console.log("schedule Updated");
		//console.log(Meteor.userId())
	},
	"onHover .clickable":function(event){
		return;
	}
});
