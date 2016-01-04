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
    'submit form':function(event){
        event.preventDefault();
        sessionId = event.target.email.value;
        Session.set("sessionId",sessionId);
        localStorage.setItem("sessionId", sessionId);
        Clients.insert({
            _id: Session.get("sessionId")
        });
        $("form.enter-email").attr("hidden", "true");
        $('.chatting').removeAttr('hidden');               
            
    },

    'keypress textarea': function(ev) {
        var $textarea = $('.input textarea')
        if (ev.which === 13 && $textarea.val().trim() !== '') {
            ev.stopPropagation();
            Chat.insert({
                user: Session.get("sessionId").toString(),
                message: $textarea.val()
            });
            $textarea.val('');
        }
    }
});

Template.chat.rendered= function(){
 $(document).ready(function(){
    if (localStorage.getItem("sessionId") !== null){
        $("form.enter-email").attr("hidden", "true");
        $('.chatting').removeAttr('hidden');
        Session.set("sessionId", localStorage.getItem("sessionId"));
    }
 })
}