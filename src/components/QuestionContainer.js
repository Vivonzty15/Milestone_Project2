import { useContext } from "react"
import QuestionItem from "./QuestionItem"


 function QuestionContainer (props) {

    const display = props.data.map((item,index) => {
        return (
            <QuestionItem item={item} key={index} />
        )
    })
    
    return (
        <div style={{textAlign:"center"}}>
            <ul style={{listStyle: "none"}}>
            {display}
            </ul>
        </div>
    )
}

export default QuestionContainer