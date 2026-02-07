
const Notify = ({errorMessage}) => {
    if(!errorMessage){
        return null
    }

    return (
        <div className="notify">
            {errorMessage}
        </div>
    )
}

export default Notify