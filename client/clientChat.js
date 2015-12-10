Template.chat.helpers({
    chat: function() {
    	if(Session.equals("sessionId", undefined)){
    		return [];
    	}
    	else{
    		return Chat.find({$or:[{user:Session.get("sessionId")}, {to:Session.get("sessionId")}]});
    	}
        
    }
});

Template.chat.events({
    'keypress textarea': function(ev) {
        var $textarea = $('.input textarea')
        if (ev.which === 13 && $textarea.val().trim() !== '') {
            //esto no deberia ir aqui pero no se donde ponerlo :(
            if (localStorage.getItem("sessionId") === null) {
                if (Session.equals("sessionId", undefined)) {
                	Session.set("sessionId", Meteor.connection._lastSessionId);
                    localStorage.setItem("sessionId", Session.get("sessionId"));
                    Clients.insert({
                        _id: Session.get("sessionId")
                    });                   
                }
            } else {
                Session.set("sessionId", localStorage.getItem("sessionId"));
            }

            ev.stopPropagation();
            Chat.insert({
                user: Session.get("sessionId").toString(),
                message: $textarea.val()
            });
            $textarea.val('');
        }
    }
});