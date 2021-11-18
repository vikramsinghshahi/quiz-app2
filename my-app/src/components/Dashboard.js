import React from "react";
import Category from "./Category";
import Level from "./Level";
import { NavLink } from "react-router-dom"

class Dashboard extends React.Component
{
    constructor()
    {
        super();
        this.state = ({
            category: null,
            level: null,
        })
    }


    handleAddCategory = (event, category) =>
    {
        // console.log(event, category)
        // console.log('clicked');
        this.setState({ category: category });
    };


    handleDifficulty = (event, level) =>
    {
        // console.log(event, level)
        this.setState({ level: level });
    };

    render()
    {
        // console.log(this.state)
        return <>
            <section>
                <Category handleAddCategory={this.handleAddCategory} category={this.state.category} />
                <Level handleDifficulty={this.handleDifficulty} level={this.state.level} />
                {this.state.category !== null && this.state.level !== null ?

                    <div>
                        <NavLink
                            to={`/quiz/${this.state.category.id}/${this.state.level}`}
                            state={{ category: this.state.category.id, level: this.state.level }}>
                            <button className="btn">Start Quiz</button>
                        </NavLink>
                    </div> : ""
                }
            </section>
        </>
    }
}


export default Dashboard;