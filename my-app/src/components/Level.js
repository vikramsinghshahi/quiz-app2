function Level(props)
{
    // console.log(props)
    return <>
        <div className="difficulty-container">
            <h2>Select Difficulty level</h2>
            <div className="all-dificulties">
                {["easy", "medium", "hard"].map((e) => (
                    <button key={e}
                        className={props.level === e ? "active-btn" : "btn"}
                        onClick={(event) =>
                        {
                            props.handleDifficulty(event, e)
                        }}
                    >{e}</button>
                ))}
            </div>
        </div>

    </>

}

export default Level