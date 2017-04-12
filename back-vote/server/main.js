// import core tools
import { Meteor } from 'meteor/meteor'
import { Accounts } from 'meteor/accounts-base'

const Vote = new Meteor.Collection('votes');
const didVote = new Meteor.Collection('did_votes');

Meteor.publish('users', function () {
  return Meteor.users.find({_id: this.userId},
                          {fields: {'username':1, 'profile': 1}});
});

Meteor.publish('votes', function(){
  return Vote.find({});
})

Meteor.publish('did_votes', function(){
  return didVote.find({});
})

Meteor.methods({
    getVote(id) {
      return Vote.findOne(id);
    },
    getVotes() {
      return Vote.find().fetch();
    },
    addVote(vote) {
      return Vote.insert({...vote});
    },
    removeVote(id) {
      return Vote.remove({_id: id});
    },
    saveVote(id,value) {
      return didVote.insert({vote_id:id,value:value});
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
