// import core tools
import { Meteor } from 'meteor/meteor'
import { Accounts } from 'meteor/accounts-base'

const Vote = new Meteor.Collection('votes');

Meteor.publish('users', function () {
  return Meteor.users.find({_id: this.userId},
                          {fields: {'username':1, 'profile': 1}});
});

Meteor.publish('votes', function(){
  return Vote.find();
})

Meteor.methods({
    getVote(id) {
      return Vote.findOne(id);
    },
    getVotes() {
      return Vote.find().fetch();
    },
    insertVote(message) {
      return Vote.insert({message: message});
    },
    removeVote(id) {
      return Vote.remove({_id: id});
    },
    editVote(id, finished) {
      return Vote.update({_id: id}, {$set: {finished: finished}});
    }
});


Meteor.startup(() => {
  const theOnlyUser = Meteor.users.find().fetch();
  if (!theOnlyUser.length) {
    Accounts.createUser({
      username: 'admin',
      password: 'pass'
    });
  }
});
