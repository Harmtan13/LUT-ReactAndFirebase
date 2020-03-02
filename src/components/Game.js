import React, { Component } from 'react';
import Question from './Question'
import loadQuestions from './../helpers/QuestionsHelpper';
import HUD from './HUD';

export default class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: null,
      currentQuestion: null,
      loading: true,
      score: 0,
      questionNumber: 0
    }
  }

  async componentDidMount() {
    try {
      const questions = await loadQuestions();

      this.setState({
        questions
      }, () => {
        this.changeQuestion();
      });
    } catch (err) {
      console.log(err);
    }
  }

  changeQuestion = (bonus = 0) => {
    const randomQuestionIndex = Math.floor(Math.random() * this.state.questions.length);
    const currentQuestion = this.state.questions[randomQuestionIndex];
    const remainingQuestions = [...this.state.questions];

    remainingQuestions.splice(randomQuestionIndex, 1);

    this.setState((prevState) => ({
      questions: remainingQuestions, 
      currentQuestion, 
      loading: false,
      score: prevState.score += bonus,
      questionNumber: prevState.questionNumber += 1
    }));
  }

  render() {
    return (
      <>
      {this.state.loading && <div id="loader"></div>}

      {!this.state.loading && this.state.currentQuestion &&
        <>  
          <HUD score={this.state.score} questionNumber={this.state.questionNumber}/>

          <Question 
            question={this.state.currentQuestion} 
            changeQuestion={this.changeQuestion}
          />
        </>
        }
        </>

    )
  }
}
