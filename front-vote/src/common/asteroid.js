import { createClass } from 'asteroid-isme2n';
import { setLoggedUser, unsetLoggedUser } from '../actions/LoginActions';
import { removeVote, insertVote, editVote } from '../actions/VoteActions';
import store from '../configureStore';

const Asteroid = createClass();
// Connect to a Meteor backend
const asteroid = new Asteroid({
  endpoint: 'ws://localhost:9000/websocket',
});

asteroid.subscribe('users');
asteroid.subscribe('votes');

asteroid.ddp.on('added', (doc) => {
  if (doc.collection === 'users') {
    store.dispatch(setLoggedUser(doc.fields));
  }
  if (doc.collection === 'votes') {
    store.dispatch(insertVote(doc.fields));
  }
});


asteroid.ddp.on('removed', (removedDoc) => {
  if (removedDoc.collection === 'users') {
    store.dispatch(unsetLoggedUser());
  }
  if (removedDoc.collection === 'votes') {
    store.dispatch(removeVote(removedDoc.id));
  }
});

asteroid.ddp.on('changed', (updatedDoc) => {
  if (updatedDoc.collection === 'users') {
    store.dispatch(setLoggedUser(updatedDoc.id, updatedDoc.fields.finished));
  }
  if (updatedDoc.collection === 'votes') {
    store.dispatch(editVote(updatedDoc.id, updatedDoc.fields.finished));
  }
});

export default asteroid;
