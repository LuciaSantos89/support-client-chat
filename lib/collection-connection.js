var remote = DDP.connect('http://localhost:3000/');
Chat = new Meteor.Collection('chat', remote); 

remote.subscribe('chat');