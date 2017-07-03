import React, { Component } from 'react';
import {
  StyleSheet,
  View
} from 'react-native';

import Button from './../Button';
import NormalText from './../NormalText';
import HeadingText from './../HeadingText';

import colors from './../../styles/colors';

import { mkContinueQuitButtons, mkAnswerButtons } from './ReviewButtons';

class ViewCard extends Component {
  static displayName = 'ViewCard';

  _getInitialState() {
    return {
      showingAnswer: false,
      wasCorrect: null
    };
  }

  constructor(props) {
    super(props);
    this.state = this._getInitialState();
  }

  _continue = () => {
    this.setState(this._getInitialState());
    this.props.continue();
  }

  _selectAnswer = (correct) => {
    this.props.onReview(correct);
    this.setState({
      showingAnswer: true,
      wasCorrect: correct
    });
    // CardActions.review(this.props.cardID, this.props.orientation, correct)
  }

  _mkButtons = () => {
    if (!this.props.answers) {
      return null;
    }

    return this.props.answers.map((a) => {
      let isCorrectAnswer = a === this.props.correctAnswer;
      let buttonStyle = [styles.options];
      if (this.state.showingAnswer && isCorrectAnswer) {
        if (this.state.wasCorrect) {
          buttonStyle.push(styles.rightAnswer);
        }
        else {
          buttonStyle.push(styles.wrongAnswer);
        }
      }
      return (
        <Button
          key={a}
          disabled={this.state.showingAnswer}
          style={buttonStyle}
          onPress={this._selectAnswer.bind(this, a === this.props.correctAnswer)}>
          <NormalText>
            {a}
          </NormalText>
        </Button>
        );
    });
  }

  render() {
    var buttons = mkAnswerButtons(
      this.props.answers,
      this.props.correctAnswer,
      this.state.showingAnswer,
      this.state.wasCorrect,
      this._selectAnswer
      );
    return (
      <View>
        <HeadingText>
          {this.props.prompt}
        </HeadingText>
        {buttons}
        {
          mkContinueQuitButtons(
            this.state.showingAnswer,
            this.state.wasCorrect,
            this._continue,
            this.props.quit
            )
        }
      </View>
      );
  }
}

ViewCard.propTypes = {
  continue: React.PropTypes.func.isRequired,
  quit: React.PropTypes.func.isRequired,
  onReview: React.PropTypes.func.isRequired,
  orientation: React.PropTypes.string.isRequired,
  cardID: React.PropTypes.string.isRequired,
  answers: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
  correctAnswer: React.PropTypes.string.isRequired,
  prompt: React.PropTypes.string.isRequired
}

const styles = StyleSheet.create({
  options: {
    backgroundColor: '#FFFFFF'
  },
  continueButton: {
    backgroundColor: colors.tan
  },
  rightAnswer: {
    backgroundColor: colors.green
  },
  wrongAnswer: {
    backgroundColor: colors.pink
  }
});

export default ViewCard;