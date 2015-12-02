UserSession = Meteor.connection._lastSessionId;

Template.chat.helpers({
	chat: function () {
		return Chat.find();
	}
});

Template.chat.events({
	'keypress textarea': function(ev) {
      var $textarea = $('.input textarea')
      if (ev.which === 13 && $textarea.val().trim() !== ''){
        ev.stopPropagation();
        Chat.insert({user:"User-"+UserSession, message:$textarea.val() });
        $textarea.val('');
      }
    }
});