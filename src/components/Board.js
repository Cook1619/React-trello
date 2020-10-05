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

  // TODO: implement the componentDidMount lifecycle method to fetch data and init the component state.
  // Tips:
  // - Use the `this.setState` method to update the component state
  componentDidMount() {
    this.setState({
      cards: data.cards,
      lists: data.lists,
      listOrder: data.listOrder,
    });
  }

  // TODO: implement the handleAddList method to add a new list to the board.
  // Tips:
  // - Check if the list title is not an empty string. Do not create the list otherwise
  // - Use the `_generateId` function to generate a unique Id for the new list
  // - Add the new list
  // - Use the `this.setState` method to update the state (lists, listOrder, newListText, creatingNewList)
  // - Reset the `newListText` and `creatingNewList` state values as well to cleanup and close the form
  handleAddList(title = "") {}

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

  // TODO: implement the handleCopyCard method to copy a card from a list to another.
  // Tips:
  // - Create card copy
  // - Use the `_generateId` function to generate a unique Id for the new card
  // - Use the `_getNextNumber` function to get the new card number
  // - Add it to the list
  // - Use the `this.setState` method to update the state (lists, cards)
  handleCopyCard(listId, cardId) {}

  // TODO: implement the handleCopyList method to clone an entire list.
  // Tips:
  // - Copy all cards from list to clone
  // - Use the `_generateId` function to generate a unique Id for every cloned cards
  // - Use the `_getNextNumber` function to get a new card number for every cloned cards
  // - Create a new list and add all the cloned cards
  // - Use the `_generateId` function to generate a unique Id for the new list
  // - Edit the new list title to append '(Copy) - ' to it
  // - Use the `this.setState` method to update the state (lists, cards, listOrder, openMenuId)
  // - Close the opened menu by reseting the openMenuId state value
  handleCopyList(listId) {}

  // TODO: implement the handleMoveAllCards method to move all cards to a list.
  // Tips:
  // - Update all the lists
  // - The target list should get all the cards. The other lists should be emptied
  // - Use the `this.setState` method to update the state (lists, openMenuId)
  // - Close the opened menu by reseting the openMenuId state value
  handleMoveAllCards(listId) {}

  // TODO: implement the handleToggleMenu method to toggle the corresponding list menu.
  // Tips:
  // - Use the `this.setState` method to update the state (openMenuId)
  handleToggleMenu(listId) {
    this.setState({ 
      openMenuId: this.state.openMenuId !== listId ? listId : null
    })
  }

  // TODO: implement the handleEditCard method to update the card description.
  // Tips:
  // - Use the `this.setState` method to update the state (cards)
  handleEditCard(cardId, description = "") {}

  // TODO: implement the handleRemoveTag method to remove a tag from a card.
  // Tips:
  // - Use the `this.setState` method to update the state (cards)
  handleRemoveTag(cardId, tagId) {}

  // TODO: implement the handleAddTag method to add a tag to a card.
  // Tips:
  // - Use the `this.setState` method to update the state (cards)
  handleAddTag(cardId, text = "") {}

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
              />
            </li>
          );
        })}
      </div>
    );
  }

  // TODO: implement the renderNewList method to render the list creation form.
  // Tips:
  // - Render a Form component in creation mode to let the user enter the new list title
  // - Otherwise, render a button to trigger the creation mode (creatingNewList)
  renderNewList() {}

  // TODO: render the Board UI.
  render() {
    return (
      <div className="board">
        {this.renderLists()}
        <Form type="editor" />
      </div>
    );
  }
}

export default Board;
