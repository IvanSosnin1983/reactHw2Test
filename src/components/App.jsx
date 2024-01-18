import React, { Component } from 'react';
import Buttons from './Buttons/Buttons';

export class App extends Component {
  state = {
    good: 0,
    neutral: 0,
    bad: 0,
  };

  pressButton = name => {
    this.setState(prevState => ({ [name]: prevState[name] + 1 }));
  };

  countTotalFeedback = () => {
    const { good, neutral, bad } = this.state;
    return good + neutral + bad;
  };

  countPositiveFeedbackPercentage = () => {
    const { good } = this.state;
    const total = this.countTotalFeedback();
    return Math.round((good / total) * 100);
  };

  render() {
    const names = Object.keys(this.state);
    const { good, neutral, bad } = this.state;
    return (
      <>
        <h1>Please leave feedback</h1>
        <Buttons names={names} pressButton={this.pressButton} />

        {/* <button
          type="button"
          onClick={() => {
            console.log('Bad');
          }}
        >
          Bad
        </button>
        <button type="button">Neutral</button>
        <button type="button" onClick={this.onGood}>
          Good
        </button> */}

        <h2>Statistics</h2>
        <p>Bad: {good}</p>
        <p>Neutral: {neutral}</p>
        <p>Good: {bad}</p>
        <p>Total: {this.countTotalFeedback()}</p>
        {/* {Boolean(this.countPositiveFeedbackPercentage()) ? (
          <p>Positive feedback: {this.countPositiveFeedbackPercentage()}</p>
        ) : (
          'no feedback'
        )} */}
        <p>
          Positive feedback:
          {!isNaN(this.countPositiveFeedbackPercentage())
            ? this.countPositiveFeedbackPercentage()
            : 'No feedback'}
        </p>
      </>
    );
  }
}
