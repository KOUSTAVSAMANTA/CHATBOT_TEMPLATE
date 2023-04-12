import React,{useContext,useState} from 'react';
import { ChatContext } from '../Context/Chatcontext';
import { Widget,addResponseMessage,setQuickButtons,addUserMessage } from "react-chat-widget";
import 'react-chat-widget/lib/styles.css';
import axios from 'axios';
import Dropzone from "react-dropzone";

console.log("hello")
// const data = {
//   'msg':"hi how are you",
  // 'options':[{
  //   label: 'hello',
  //   value: 'hello'
  // }]
// }


const api = {"key":"http://127.0.0.1:8000/",'ft':true}




function Chatbot() {

  const [files, setFiles] = useState([]);

  const handleFileUpload = (acceptedFiles) => {
    // Send the file to the server using an HTTP request or WebSocket connection
    // Display the file in the chat widget
    addResponseMessage(`File uploaded: ${acceptedFiles[0].name}`);
  };
  const handleDrop = (acceptedFiles) => {
    setFiles(acceptedFiles);
    handleFileUpload(acceptedFiles);
  };

    const [data, setData] = useState([]);
    // const [history,setHistory] = useState([['HI how may i help you. \n can i know your current city name?']]);
    const [history,setHistory] = useState([['I am AdviserrBot, your virtual assistant at BDM Insurance. I am her to assist you with all your policy related queries and guide you through our process. \n \n Please let me know what are you looking for?']]);
    const [opt, setOpt] = useState([]);
    const {dispatch} = useContext(ChatContext);
    // const {data} = useContext(ChatContext);

    if(api['ft'] === true){
      api['ft'] = false

      axios.get(api["key"]+"CD")
      .then(dat =>{
        addResponseMessage(dat.data['msg']);
        // data.push(dat.data['msg']) 
        opt.push(dat.data['option'])// DATA STORAGE
        
        if (dat.data['options'] !==[] ){
          setQuickButtons(dat.data['options'])
        }
        else{
          setQuickButtons([]);
        }
      })
    }
      console.log(data)
    const handleQuickButtonClicked = (message)=> {
      if (message.toLowerCase() !=="claim status")
      {
        
        addUserMessage (message);
        // data.push(message) // DATA STORAGE
        axios.post( api["key"]+'chatbot',{'msg':{"msg":message,"hst":history,"options":opt}})
          .then(res=>{
            console.log(res.data)
            setHistory(res.data['hist'])
            setOpt(res.data['opt'])
            data.push(res.data['msg']) // DATA STORAGE
            addResponseMessage(res.data['msg'])
            if (res.data['options'] !==[] ){
              setQuickButtons(res.data['options'])
            }
            else{
              setQuickButtons([]);
            }
          })
        .catch(err=>{
          console.log(err);
        });
      }
      else{
        files.length > 0 && (
          <Dropzone onDrop={handleDrop}>
            {({ getRootProps, getInputProps }) => (
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                <p>Drag and drop a file here, or click to select a file</p>
              </div>
            )}
          </Dropzone>
        )
      }
    }
    const handleNewUserMessage = (newMessage) => {
        console.log({'msg':{"msg":newMessage,"hst":history,"options":opt} })
        
        console.log("his:-",history)
        // data.push(newMessage) // DATA STORAGE
        axios.post( api["key"]+'chatbot',{'msg':{"msg":newMessage,"hst":history,"options":opt} })
        .then(res=>{
          console.log(res.data)
          setHistory(res.data['hist'])
          setOpt(res.data['opt'])
          data.push(res.data['msg']) // DATA STORAGE
          addResponseMessage(res.data['msg'])
          if (res.data['options'] !==[] ){
            setQuickButtons(res.data['options'])
          }
        })
        .catch(err=>{
          console.log(err);
        });
        console.log(data)
      };
      console.log("options:-",opt)
      // console.log("options:-",opt)


      return (
        <Widget
        handleNewUserMessage={handleNewUserMessage}
        title="Chatbot"
        subtitle="Hello, how can I help you today?"
        fullScreenMode={false}
        senderPlaceHolder="Type a message..."
        showCloseButton={true}
        autofocus={true}
        handleQuickButtonClicked={handleQuickButtonClicked}
        showTimeStamp={true}
      />
        
      
  );

}

export default Chatbot;