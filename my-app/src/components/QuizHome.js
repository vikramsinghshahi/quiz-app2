import React from "react";
import { NavLink } from "react-router-dom"
import Quiz from "./Quiz";
import _ from "lodash"
import Result from "./Result"

class QuizHome extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = ({
            questions: null,
            answers: [],
            isSubmitted: false,

        })
    }

    componentDidMount()
    {
        let category = this.props.location.state.category;
        let level = this.props.location.state.level;
        // console.log(category, level)
        fetch(
            `https://opentdb.com/api.php?amount=10&category=${category}&difficulty=${level}`
        ).then((res) => res.json())
            .then((data) =>
            {
                this.setState({
                    questions: data.results
                })
            })

    }
    handleAnswerSelect = (ans, currentQuestion, event) =>
    {
        // console.log(ans, currentQuestion);
        // console.log(this.state.answers[currentQuestion])
        if (!this.state.answers[currentQuestion])
        {
            this.setState((prevState) =>
            {
                let updatedAns = _.concat(prevState.answers, ans);
                return {
                    answers: updatedAns,
                };
            });
        } else
        {
            this.setState((prevState) =>
            {
                prevState.answers[currentQuestion] = ans;
                return {
                    answers: prevState.answers,
                };
            });
        }
    };

    handleSubmit = (q, a) =>
    {
        // console.log(q, a)
        if (!this.state.answers[9])
        {
            alert('You must select answer of current question.');
        } else
        {
            this.setState((prevState) =>
            {
                return {
                    isSubmitted: !prevState.isSubmitted,
                };
            });
        }
    };

    render()
    {
        // console.log(this.state)
        return <>
            <section>
                <div className="quiz-container">
                    {this.state.questions && !this.state.isSubmitted ?
                        <Quiz questions={this.state.questions}
                            allAnswers={this.state.answers}
                            isSubmitted={this.state.isSubmitted}
                            handleAnswerSelect={this.handleAnswerSelect}
                            handleSubmit={this.handleSubmit}

                        />
                        :
                        (this.state.isSubmitted ?
                            <Result questions={this.state.questions}
                                allAnswers={this.state.answers}
                                location={this.props.location}
                            />
                            :
                            <h2>Loading data....</h2>
                        )
                    }


                </div>
            </section>

        </>
    }
}


export default QuizHome;