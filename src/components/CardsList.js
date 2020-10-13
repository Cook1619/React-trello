import React, { Component } from "react";
import PropTypes from "prop-types";
// Icons
import { IoMdAdd as AddIcon } from "react-icons/io";
// Components
import Card from "./Card";
import CardEditor from "./CardEditor";
import Menu from "./Menu";
import Form from "./Form";

class CardsList extends Component {
  constructor(props) {
    super(props);
    this.handleAddNewCard = this.handleAddNewCard.bind(this);
    this.handleCancelNewCard = this.handleCancelNewCard.bind(this);
    this.handleCreateNewCard = this.handleCreateNewCard.bind(this);
    this.handleEditCard = this.handleEditCard.bind(this);
    this.handleCopyCard = this.handleCopyCard.bind(this);
    this.handleArchiveCard = this.handleArchiveCard.bind(this);
    this.handleSaveCard = this.handleSaveCard.bind(this);
    this.handleRemoveTag = this.handleRemoveTag.bind(this);
    this.handleAddTag = this.handleAddTag.bind(this);
    this.renderCards = this.renderCards.bind(this);

    this.cardRefs = {};

    this.state = {
      creatingNewCard: false,
      editCardId: null,
      editCardText: "",
      editCardTags: [],
    };

    this.actions = [
      [
        {
          title: "Add Card...",
          onClick: () => {
            const { onToggleMenu, id } = this.props;
            onToggleMenu(id);
            this.setState({ creatingNewCard: true });
          }, 
        },
        {
          title: "Copy List...",
          onClick: () => this.props.onCopyList(this.props.id)
        },
      ],
      [
        {
          title: "Move All Cards in This List...",
          onClick: () => this.props.onMoveAllCards(this.props.id)
        },
        {
          title: "Archive All Cards in This List...",
          onClick: () => {
            const { onRemoveAllCards, id } = this.props;
            onRemoveAllCards(id)
          }, 
        },
      ],
      [
        {
          title: "Archive This List",
          onClick: () => {
            const { onRemoveList, id } = this.props;
            onRemoveList(id)
          },
        },
      ],
    ];
  }

  handleAddNewCard(cardText = "") {
    const { id, onAddCard } = this.props;
    if (cardText){
      onAddCard(id, cardText)
    }
    this.handleCancelNewCard();
  }

  handleCancelNewCard() {
    this.setState({ creatingNewCard: false });
  }

  handleCreateNewCard() {
    this.setState({ creatingNewCard: true });
  }

  handleEditCard(id, text, tags) {
    this.setState({ editCardId: id, editCardText: text, editCardTags: tags });
  }

  handleCancelEdit() {
    this.setState({ editCardId: null, editCardText: "", editCardTags: [] });
  }

  handleCopyCard() {
    this.props.onCopyCard(this.props.id, this.state.editCardId);
    this.handleCancelEdit();
  }

  handleArchiveCard() {
    this.props.onRemoveCard(this.props.id, this.state.editCardId);
    this.handleCancelEdit();
  }
  handleSaveCard(text) {
    this.props.onEditCard(this.state.editCardId, text);
    this.handleCancelEdit();
  }

  handleRemoveTag(tagId) {
    this.props.onRemoveTag(this.state.editCardId, tagId);
  }

  handleCardRef(node, id) {
    if (node) {
      this.cardRefs[id] = node;
    }
  }

  handleAddTag(text) {
    if (text) {
      this.props.onAddTag(this.state.editCardId, text);
    }
  }

  renderHeader() {
    const { title, isMenuOpen, cards, onToggleMenu, id } = this.props
    return (
      <div className="cards-list-header">
        <div className="cards-list-title">
          <h3>{title}</h3>
          <Menu 
              actions={this.actions}
              isOpen={isMenuOpen} 
              onClick={() => onToggleMenu(id)}
          />
        </div>
        <p>{cards.length} cards</p>
      </div>
    );
  }

  renderCards() {
    return (
      <ul className='cards'>
      {
        this.props.cards.map((card, index) => (
          <li key={card.id}
          ref={(node) => this.handleCardRef(node, card.id)}
          onClick={() => this.handleEditCard(card.id, card.description, card.tags)}
          >
            <Card
              id={card.id}
              index={index}
              number={card.number}
              tags={card.tags}
              description={card.description}
            />
          </li>
      ))
      }
      </ul>
    )
  }

  renderFooter() {
    return this.state.creatingNewCard ? (
      <Form
        type="card"
        placeholder="Enter a title for this card..."
        onClickSubmit={this.handleAddNewCard}
        onClickCancel={this.handleCancelNewCard}
        buttonText="Add Card"
      />
    ) : (
      <button
        className="add-button add-card-button"
        onClick={this.handleCreateNewCard}
      >
        <AddIcon />
        <p>Add new card</p>
      </button>
    );
  }

  // TODO: render the CardsList UI.
  render() {
    return (
      <div className="cards-list">
        {this.renderHeader()}
        {this.renderCards()}
        {this.renderFooter()}
        { 
          this.state.editCardId && 
          <CardEditor 
            initialValue={this.state.editCardText}
            tags={this.state.editCardTags}
            onCopyCard={this.handleCopyCard}
            onArchiveCard={this.handleArchiveCard}
            onSaveCard={this.handleSaveCard}
            onCancelEdit={this.handleCancelEdit}
            onRemoveTag={this.handleRemoveTag}
            onAddTag={this.handleAddTag}
            position={{
              top: this.cardRefs[this.state.editCardId].getBoundingClientRect().top,
              left: this.cardRefs[this.state.editCardId].getBoundingClientRect().left 
            }}
          /> 
      }
      </div>
    );
  }
}

CardsList.defaultProps = {
  cards: null,
  isMenuOpen: false,
  onToggleMenu: () => null,
  onAddCard: () => null,
  onRemoveCard: () => null,
  onRemoveList: () => null,
  onRemoveAllCards: () => null,
  onCopyList: () => null,
  onMoveAllCards: () => null,
  onCopyCard: () => null,
  onEditCard: () => null,
  onRemoveTag: () => null,
  onAddTag: () => null,
};

CardsList.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  cards: PropTypes.arrayOf(
    PropTypes.exact({
      id: PropTypes.string.isRequired,
      number: PropTypes.number.isRequired,
      description: PropTypes.string,
      tags: PropTypes.arrayOf(PropTypes.string),
    })
  ),
  isMenuOpen: PropTypes.bool,
  onToggleMenu: PropTypes.func,
  onAddCard: PropTypes.func,
  onRemoveCard: PropTypes.func,
  onRemoveList: PropTypes.func,
  onRemoveAllCards: PropTypes.func,
  onCopyList: PropTypes.func,
  onMoveAllCards: PropTypes.func,
  onCopyCard: PropTypes.func,
  onEditCard: PropTypes.func,
  onRemoveTag: PropTypes.func,
  onAddTag: PropTypes.func,
};

export default CardsList;
