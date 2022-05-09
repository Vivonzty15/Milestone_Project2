import { Link } from 'react-router-dom'
import axios from 'axios'
import { Button } from 'react-bootstrap';
import { useState } from 'react';
import { v4 as uuid } from 'uuid';


export default function QuestionItem (props) {
  let [message, setMessage] = useState("")
  const unique_id = uuid();

    const handleDelete = async (event) => {
        event.preventDefault();
        setMessage('')
        const id = document.getElementById(`${props.item.question_id}`).value;
      //   const removeID = document.getElementById(`${props.item.question_id}`);
      //   const removeText = document.getElementById(`${props.item.question_text}`);
      //   const removeDeleteBtn = document.getElementById("deleteButton");
      //   const removeEditBtn = document.getElementById("editButton");
      //   const removeIDLabel = document.getElementById("questionIDLabel");
      //   const removeTextLabel = document.getElementById("questionTextLabel");

      //   const removeArray = [ removeID, removeText, removeIDLabel, removeTextLabel, removeDeleteBtn, removeEditBtn ];

      //   const remove =removeArray.map((item) => {
      //     return (
      //         item.remove()
      //     )
      // })

      const listItem = document.getElementById(`${unique_id}`)
    
        await axios
          .delete(`http://localhost:5000/questions/${id}`, {
          })
          .then((data) => {
            console.log(data);
            if (data.data.success) {
              console.log("question deleted");
            }
          })
          .catch((error) => {
            console.log(error)
            console.log("question was not deleted");
          });
          // remove()
          listItem.remove()
      }

      const handleEdit = async (event) => {
        event.preventDefault();
        setMessage("")
        const id = document.getElementById(`${props.item.question_id}`).value;
        const question_text = document.getElementById(`${props.item.question_text}`)
    
        await axios
          .put(`http://localhost:5000/questions/${id}`, {
            question_text: question_text.value,
            question_id: id
          })
          .then((data) => {
            console.log(data);
            if (data.data.success) {
              console.log("question update");
            }
          })
          .catch((error) => {
            console.log(error)
            console.log("question was not updated");
          });
          setMessage("updated")
      }

      


    return (
        <li id={unique_id}>   
            <form>
            <label id="questionTextLabel" style={{display:"inline-block", width:"100px", textAlign:"right", paddingRight:"10px"}}>Question:</label>
            <input 
            defaultValue={props.item.question_text} 
            type="text"  
            id={props.item.question_text} 
            style={{width:"50%"}}
            />
            <br/>
            <label id="questionIDLabel" style={{display:"inline-block", width:"100px", textAlign:"right", paddingRight:"10px"}}>Question ID:</label>
            <input 
            value={props.item.question_id}
            type="text" 
            id={props.item.question_id}
            style={{width:"50%"}} 
            />
            <br/>
                <Button onClick={handleDelete} variant="danger" size='sm' type="submit" id="deleteButton">
                    Delete
                </Button>
                <Button onClick={handleEdit} variant="info" size='sm' type="submit" id="editButton">
                    Update
                </Button>
                <br/>
                <a style={{color:"blue"}}>{message}</a>
                <br/>
            </form>
        </li>
    )
}
