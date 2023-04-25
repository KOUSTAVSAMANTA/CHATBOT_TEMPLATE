import React from 'react'
import axios from 'axios'
import Img from "../img/attach.png"
import "./uploadfile.css"
import { addResponseMessage} from "react-chat-widget";


const api = {"key":"http://127.0.0.1:8000/"}

const UploadFile = () => {
    const check=(e)=>{
        console.log("finalllllll",e.target.files[0])
        const selectedfile = e.target.files[0]
        const formData = new FormData();
          // Update the formData object
        formData.append(
            "file",
            selectedfile,
            selectedfile.name
        );
        console.log(selectedfile.name+"aifkhhhhhhhhhhhh")
        axios.post( api["key"]+'file_name',{'msg':selectedfile.name})
        .then(resq=>{
          axios.post( api["key"]+'file',formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then(res=>{
            console.log("ocr output",res.data["msg"])
            // alert("Your file is being uploaded!")
            addResponseMessage(`Do you want to upload ${res.data["msg"]}?`)

          })
          .catch(err=>{
              console.log(err);
          });  
          // console.log("ocr output",resq)
        })
        
      }
    // const check=(e)=>{
    //     console.log("hello")
    // }

  return (
    <div className="send">
        <input type="file" style={{display:"none"}} id="file" onChange={e=>check(e)}/>
        
        <label htmlFor="file">
          <p>click to upload <img src={Img} alt="" /></p>
          
        </label>
      </div>
  )
}

export default UploadFile
