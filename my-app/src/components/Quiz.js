import React from "react";
import _ from "lodash"

class Quiz extends React.Component
{
    constructor(props)
    {
        super();
        this.state = ({
            currentQuestion: 0,
            answers: null,
            correctAnswer: null,
        })
    }

    componentDidMount()
    {
        let arrOfIncorrect = [
            ...this.props.questions[this.state.currentQuestion].incorrect_answers,
        ];
        let correctAns =
            this.props.questions[this.state.currentQuestion].correct_answer;

        let arrOfAllAns = _.uniq(_.concat(arrOfIncorrect, correctAns));

        this.setState({
            answers: arrOfAllAns,
            correctAnswer: correctAns,
        });
    }

    componentDidUpdate(prevProps, prevState)
    {
        // console.log(prevState)
        if (prevState.currentQuestion !== this.state.currentQuestion)
        {
            let arrOfIncorrect = [
                ...this.props.questions[this.state.currentQuestion].incorrect_answers,
            ];

            let correctAns =
                this.props.questions[this.state.currentQuestion].correct_answer;

            let arrOfAllAns = _.uniq(_.concat(arrOfIncorrect, correctAns));

            this.setState({
                answers: arrOfAllAns,
                correctAnswer: correctAns,
            });
        }
    }

    handleNextQuestion = () =>
    {
        if (!this.props.allAnswers[this.state.currentQuestion])
        {
            alert('You must select answer of current question.');
        } else
        {
            this.setState((prevState) =>
            {
                return {
                    currentQuestion: prevState.currentQuestion + 1,
                };
            });
        }
    };

    render()
    {
        // console.log(this.state)
        let questionToDisplay = this.props.questions[this.state.currentQuestion];
        return <>
            <div>
                <h2 as="label" htmlFor="index">
                    Question {this.state.currentQuestion + 1}/10
                </h2>
                <progress id="index" value={this.state.currentQuestion + 1} max="10"></progress>
            </div>
            <div className="question">
                <h3>{questionToDisplay.question}</h3>
            </div>

            {this.state.answers !== null ?

                <ul className="answer-container">

                    {this.state.answers.map((answer) => (

                        <li key={answer}
                            onClick={(event) =>
                            {
                                this.props.handleAnswerSelect(
                                    answer,
                                    this.state.currentQuestion, event
                                );
                            }}
                            className={
                                this.props.allAnswers[this.state.currentQuestion] ===
                                    answer
                                    ? 'option_active'
                                    : ''
                            }
                        >{answer} </li>

                    ))}

                </ul>
                : <h2>Loading answers...</h2>}

            <div className="answer-submit-button">
                {this.state.currentQuestion > 8
                    ?
                    <button className="btn"
                        onClick={(event) =>
                        {
                            this.props.handleSubmit(
                                this.props.questions,
                                this.props.allAnswers
                            );
                        }}
                    >
                        submit
                    </button>
                    :
                    <button className="btn"
                        onClick={() => { this.handleNextQuestion() }}
                    >
                        Next
                    </button>
                }
            </div>
        </>

    }
}


export default Quiz;