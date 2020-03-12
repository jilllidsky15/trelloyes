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
  let { [keyToOmit]: _, ...rest } = obj;
  return rest;
}

class App extends Component {
  state = {
    store: STORE,
  };

  handleDeleteCard = (cardId) => {
    const { lists, allCards } = this.state.store;

    const newLists = lists.map(list => ({
      ...list,
      cardIds: list.cardIds.filter(id => id !== cardId)
    }));

    const newCards = omit(allCards, cardId);

    this.setState({
      store: {
        lists: newLists,
        allCards: newCards,
      }
    })
  }

  handleAddCard = (listId) => {
    const randomCard = newRandomCard()
    const newList = this.state.store.lists.map(list => {
      if (list.id === listId) {
        return {
          ...list, cardIds: [...list.cardIds, randomCard.id]
        };
      }
      return list;
    })
    console.log(listId)
    this.setState({
      store: {
        lists: newList,
        allCards: {
          ...this.state.store.allCards,
          [randomCard.id]: randomCard,
        }
      }
    })
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
              id={list.id}
              header={list.header}
              cards={list.cardIds.map(id => store.allCards[id])}
              onAddCard={this.handleAddCard}
              onDeleteCard={this.handleDeleteCard}
            />
          ))}
        </div>
      </main>
    );
  }
}

export default App;