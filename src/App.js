import React, { Component } from 'react';
import List from './List';
import './App.css';
import STORE from './STORE';

const newRandomCard = () => {
  const id = Math.random().toString(36).substring(2, 4)
    + Math.random().toString(36).substring(2, 4);
  return {
    id,
    title: `Random Card ${id}`,
    content: 'lorem ipsum',
  }
}

function omit(obj, keyToOmit) {
  let {[keyToOmit]: _, ...rest} = obj;
  return rest;
}

class App extends Component {
  state = {
    store: STORE,
  };

  handleDeleteCard() {
    console.log('handle delete card')
  }

  handleAddCard() {
    console.log('handle add card')
  }

  render() {
    const { store } = this.state;
    return (
      <main className='App'>
        <header className='App-header'>
          <h1>Trelloyes!</h1>
        </header>
        <div className='App-list'>
          {store.lists.map(list => (
            <List
              key={list.id}
              header={list.header}
              cards={list.cardIds.map(id => store.allCards[id])}
              onAddCard = {this.handleAddCard}
              onDeleteCard = {this.handleDeleteCard}
            />
          ))}
        </div>
      </main>
    );
  }
}

export default App;