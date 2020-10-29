import React, { Component } from "react";
import PropTypes from "prop-types";

import { IoMdClose as CancelIcon } from "react-icons/io";
import Button from "./Button";

class Form extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: props.initialValue,
    };

    this.formRef = React.createRef();
    this.controlRef = React.createRef();
  }

  componentDidMount() {
    if (this.controlRef?.current) {
      this.controlRef.current.focus();
    }
  }

  handleOnChangeText = (event) => {
    this.setState({ text: event.target.value });
  };

  handleOnSubmit = (event) => {
    event.preventDefault();
    this.props.onClickSubmit(this.state.text);
    this.setState({ text: "" });
  };

  handleOnKeyDown = (e) => {
    if (e.key === "Enter") {
      this.handleOnSubmit(e);
    }
  };

  render() {
    const options = {
      type: "text",
      value: this.state.text,
      placeholder: this.props.placeholder,
      onChange: this.handleOnChangeText,
    };

    return (
      <form ref={this.formRef} className={`form form-${this.props.type}`}>
        {this.props.type === "list" || this.props.type === "labels" ? (
          <input ref={this.controlRef} className="form-input" {...options} />
        ) : (
          <textarea
            ref={this.controlRef}
            className="form-textarea"
            onKeyDown={this.handleOnKeyDown}
            {...options}
          />
        )}
        <div className="form-actions">
          <Button text={this.props.buttonText} onClick={this.handleOnSubmit} />
          {this.props.onClickCancel && (
            <CancelIcon
              className="form-cancel-action"
              onClick={this.props.onClickCancel}
            />
          )}
        </div>
      </form>
    );
  }
}

Form.defaultTypes = {
  initialValue: "",
  placeholder: "",
  buttonText: "",
  onClickSubmit: () => null,
  onClickCancel: () => null,
};

Form.propTypes = {
  type: PropTypes.oneOf(["list", "card", "editor"]).isRequired,
  initialValue: PropTypes.string,
  placeholder: PropTypes.string,
  buttonText: PropTypes.string,
  onClickSubmit: PropTypes.func,
  onClickCancel: PropTypes.func,
};

export default Form;
