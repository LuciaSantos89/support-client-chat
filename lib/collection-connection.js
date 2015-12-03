var remote = DDP.connect('http://localhost:3000/');
Chat = new Meteor.Collection('chat', remote); 
Clients = new Meteor.Collection('clients', remote); 

remote.subscribe('chat');
remote.subscribe('clients');

