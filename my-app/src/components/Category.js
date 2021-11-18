import React from "react"


class Category extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = ({
            category: [],
        })
    }

    componentDidMount()
    {
        fetch('https://opentdb.com/api_category.php')
            .then((res) => res.json())
            .then((data) => this.setState({
                category: data.trivia_categories
            })).catch((err) => console.log(err))
    }

    render()
    {
        // console.log(this.props)
        return <>
            <div className="category-container">
                <h2>Select Category</h2>
                <div className="all-category">
                    {this.state.category.length !== 0 ? (


                        this.state.category.map((e) => (


                            <button key={e.id}
                                className={this.props.category === e ? "active-btn" : "btn"}
                                onClick={(event) =>
                                {
                                    this.props.handleAddCategory(event, e)
                                }}
                            >{e.name}</button>
                        ))


                    ) : <span>Loading data....</span>}



                </div>
            </div>

        </>


    }

}


export default Category