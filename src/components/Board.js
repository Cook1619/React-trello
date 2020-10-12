import React, { Component } from "react";
import { _getNextNumber, _generateId } from "../utils";
// Icons
import { IoMdAdd as AddIcon } from "react-icons/io";
// Components
import CardsList from "./CardsList";
import Form from "./Form";

import data from "../data";

class Board extends Component {
  constructor(props) {
    super(props);

    this.state = {
      lists: {},
      cards: {},
      listOrder: [],
      newListText: "",
      creatingNewList: false,
      openMenuId: null,
    };

    this.handleAddList = this.handleAddList.bind(this);
    this.handleRemoveList = this.handleRemoveList.bind(this);
    this.handleAddCard = this.handleAddCard.bind(this);
    this.handleRemoveCard = this.handleRemoveCard.bind(this);
    this.handleRemoveAllCards = this.handleRemoveAllCards.bind(this);
    this.handleCopyCard = this.handleCopyCard.bind(this);
    this.handleCopyList = this.handleCopyList.bind(this);
    this.handleMoveAllCards = this.handleMoveAllCards.bind(this);
    this.handleToggleMenu = this.handleToggleMenu.bind(this);
    this.handleEditCard = this.handleEditCard.bind(this);
    this.handleRemoveTag = this.handleRemoveTag.bind(this);
    this.handleAddTag = this.handleAddTag.bind(this);
  }

  componentDidMount() {
    this.setState({
      cards: data.cards,
      lists: data.lists,
      listOrder: data.listOrder,
    });
  }

  handleAddList(title = "") {
    if (title.trim()) {
      const id = _generateId();
      const { lists, listOrder } = this.state;
      lists[id] = { id, title, cardIds: [] };
      listOrder.push(id);
      this.setState({
        lists,
        listOrder,
        newListText: "",
        creatingNewList: false,
      });
    } else {
      this.setState({ newListText: "", creatingNewList: false });
    }
  }

  handleRemoveList(listId) {
    const { lists, listOrder, cards } = this.state;
    lists[listId].cardIds.map((id) => delete cards[id]);
    delete lists[listId];
    const index = listOrder.indexOf(listId);
    if (index > -1) {
      listOrder.splice(index, 1);
    }

    this.setState({
      lists,
      cards,
      listOrder,
    });
  }

  handleAddCard(listId, description = "") {
    if (description.trim()) {
      const { lists, cards } = this.state;
      const id = _generateId();
      const number = _getNextNumber(cards);
      cards[id] = {
        id,
        number,
        description,
        tags: [],
      };
      lists[listId].cardIds.push(id);
      this.setState({
        lists,
        cards,
      });
    }
  }


  handleRemoveCard(listId, cardId) {
    const { lists, cards } = this.state;
    delete cards[cardId];
    const cardIndex = lists[listId].cardIds.indexOf(cardId);
    if (cardIndex > -1) {
      lists[listId].cardIds.splice(cardIndex, 1);
    }
    this.setState({ lists, cards });
  }

  handleRemoveAllCards(listId) {
    const { lists, cards } = this.state;
    lists[listId].cardIds.map((id) => delete cards[id]);
    lists[listId].cardIds = [];

    this.setState({
      lists,
      cards,
      openMenuId: null,
    });
  }

  handleCopyCard(listId, cardId) {
    let lists = {...this.state.lists};
    let cards = {...this.state.cards};
    let listOrder = [...this.state.listOrder];
    let cardIds = [];
    for (let i = 0; i < lists[listId].cardIds.length; i++) {
      const id = _generateId();
      const number = _getNextNumber(cards);
      const cardId = lists[listId].cardIds[i];
      cardIds.push(id);
      cards[id] = { id, number, description: cards[cardId].description, tags: [...cards[cardId].tags] };
    }
    const id = _generateId();
    lists[id] = { id, title: '(Copy) - ' + lists[listId].title, cardIds };
    listOrder.push(id);
    this.setState({ cards, lists, listOrder, openMenuId: null });
  }

  handleCopyList(listId) {
    let lists = {...this.state.lists};
    let cards = {...this.state.cards};
    let listOrder = [...this.state.listOrder];
    let cardIds = [];
    for (let i = 0; i < lists[listId].cardIds.length; i++) {
      const id = _generateId();
      const number = _getNextNumber(cards);
      const cardId = lists[listId].cardIds[i];
      cardIds.push(id);
      cards[id] = { id, number, description: cards[cardId].description, tags: [...cards[cardId].tags] };
    }
    const id = _generateId();
    lists[id] = { id, title: '(Copy) - ' + lists[listId].title, cardIds };
    listOrder.push(id);
    this.setState({ cards, lists, listOrder, openMenuId: null });
  }


  handleMoveAllCards(listId) {
    let lists = {...this.state.lists};
    let cardIds = [];
    for (let id in lists) {
      if (id !== listId) {
        cardIds.push(...lists[id].cardIds);
        lists[id].cardIds = [];
      }
    }
    lists[listId].cardIds.push(...cardIds);
    this.setState({ lists, openMenuId: null });
  }

  handleToggleMenu(listId) {
    this.setState({ 
      openMenuId: this.state.openMenuId !== listId ? listId : null
    })
  }

  handleEditCard(cardId, description = "") {
    const { cards } = this.state;
    cards[cardId].description = description;
    this.setState({
      cards,
    });
  }

  handleRemoveTag(cardId, tagId) {
    let cards = {...this.state.cards};
    if (cards[cardId]) {
      cards[cardId].tags.splice(tagId, 1);
    }
    this.setState({ cards});
  }

  handleAddTag(cardId, text = '') {
    let cards = {...this.state.cards};
    if (cards[cardId]) {
      cards[cardId].tags.push(text);
    }
    this.setState({ cards });
  }

  // TODO: implement the renderLists method to render the board lists UI.
  // Tips:
  // - Iterate through the listOrder state array to render each list of cards (CardsList)
  // - Pass the necessary methods to the CardsList component to handle all actions
  renderLists() {
    return (
      <div className="board-lists">
        {this.state.listOrder.map((listId, index) => {
          const list = this.state.lists[listId];
          const cards = list.cardIds.map((key) => this.state.cards[key]);
          return (
            <li key={list.id}>
              <CardsList
                id={list.id}
                index={index}
                title={list.title}
                cards={cards}
                isMenuOpen={this.state.openMenuId === listId}
                onToggleMenu={this.handleToggleMenu}
                onAddCard={this.handleAddCard}
                onRemoveAllCards={this.handleRemoveAllCards}
                onRemoveList={this.handleRemoveList}
                onCopyCard={this.handleCopyCard}
                onCopyList={this.handleCopyList}
                onMoveAllCards={this.handleMoveAllCards}
                onEditCard={this.handleEditCard}
                onRemoveTag={this.handleRemoveTag}
                onAddTag={this.handleAddTag}
              />
            </li>
          );
        })}
      </div>
    );
  }

  renderNewList() {
    return this.state.creatingNewList ? (
      <Form
        type="list"
        placeholder="Enter a title for this list..."
        buttonText="Add List"
        onClickSubmit={this.handleAddList}
        onClickCancel={() => this.setState({ creatingNewList: false })}
      ></Form>
    ) : (
      <button
        className="add-button"
        onClick={() => this.setState({ creatingNewList: true })}
      >
        <AddIcon />
        <p>Add a new list</p>
      </button>
    );
  }

  // TODO: render the Board UI.
  render() {
    return (
      <div className="board">
        {this.renderLists()}
        {this.renderNewList()}
      </div>
    );
  }
}

export default Board;
