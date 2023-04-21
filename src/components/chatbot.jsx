import React,{useContext,useState,useEffect} from 'react';
import { ChatContext } from '../Context/Chatcontext';
import { Widget,addResponseMessage,setQuickButtons,addUserMessage,renderCustomComponent } from "react-chat-widget";
import 'react-chat-widget/lib/styles.css';
import axios from 'axios';
import UploadFile from './UploadFile';
import Card from "./Cards";
import annyang from 'annyang';

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
    const [data, setData] = useState([]);
    // const [history,setHistory] = useState([['HI how may i help you. \n can i know your current city name?']]);
    const [history,setHistory] = useState([['I am AdviserrBot, your virtual assistant at BDM Insurance. I am her to assist you with all your policy related queries and guide you through our process. \n \n Please let me know what are you looking for?']]);
    const [opt, setOpt] = useState([]);
    const [memory,setMemory] = useState([]);
    const {dispatch} = useContext(ChatContext);
    // const {data} = useContext(ChatContext);
    useEffect(() => {
      annyang.start();
      annyang.addCommands({
        'hello': () => {
          console.log("hello")
          addUserMessage ("hello");
          handleNewUserMessage("hello")
          // setTexts(text)
          // setText("")
          // handleaudiostart();
        },
        'medi *text': (text) => {
          console.log(text)
          addUserMessage (text);
          handleNewUserMessage(text)
          // setTexts(text)
          // setText("")
          // handleaudiostart();
        },
        'hi medi *text': (text) => {
          console.log(text)
          addUserMessage (text);
          handleNewUserMessage(text)
          // setTexts(text)
          // setText("")
          // handleaudiostart();
        },
        'hello medi *text': (text) => {
          console.log(text)
          addUserMessage (text);
          handleNewUserMessage(text)
          // setTexts(text)
          // setText("")
          // handleaudiostart();
        },
        'option *text': (text) => {
          console.log(text)
          addUserMessage (text);
          handleNewUserMessage(text)
          // setTexts(text)
          // setText("")
          // handleaudiostart();
        },
        'thank you': () => {
          console.log('thank you')
          addUserMessage ("/restart");
          handleNewUserMessage("/restart")
        },
        'what is your name': () => {
          console.log('My name is ChatGPT!');
        }
      });
    }, []);

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
     
        addUserMessage (message);
        // data.push(message) // DATA STORAGE
        axios.post( api["key"]+'chatbot',{'msg':{"msg":message,"hst":history,"options":opt} })
          .then(res=>{
            console.log(res.data)
            setHistory(res.data['hist'])
            setOpt(res.data['opt'])
            data.push(res.data['msg']) // DATA STORAGE
            console.log("type of msg",typeof(res.data['msg']))
            if(typeof(res.data['msg'])!=="string")
            {
              let l=res.data['msg'].length
              for(let i=0;i<l;i++)
              {
                addResponseMessage(res.data['msg'][i])
                setMemory(res.data['msg'][i])
              }
            }
            else{
              addResponseMessage(res.data['msg'])
              setMemory(res.data['msg'])
            }
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
    const handleNewUserMessage = (newMessage) => {
        try{
          if(memory.includes("upload") && newMessage.toLowerCase()==="yes")
          {
            addResponseMessage(`File Successfully uploaded`)
          }
        }
        catch(error){
          console.log(error)
        }
        console.log({'msg':{"msg":newMessage,"hst":history,"options":opt} })
        
        console.log("his:-",history)
        // data.push(newMessage) // DATA STORAGE
        if (newMessage.includes("upload")===false)
        {
          axios.post( api["key"]+'chatbot',{'msg':{"msg":newMessage,"hst":history,"options":opt} })
          .then(res=>{
            console.log(res.data)
            setHistory(res.data['hist'])
            setOpt(res.data['opt'])
            data.push(res.data['msg']) // DATA STORAGE
            addResponseMessage(res.data['msg'])
            setMemory(res.data['msg'])
            console.log("alllllllllllllllllllll",memory)

            
            try{
                if (res.data['msg'].includes("upload") === true)
                {
                  renderCustomComponent(()=><UploadFile/>)
                  // addResponseMessage("Have you uploaded the File")
                  // setQuickButtons([{'label': 'Yes','value': 'Yes'},{'label': 'No','value': 'No'}])
                }
            }
            catch(error){
              console.log(error)
            }
            if (res.data['options'] !==[] ){
              setQuickButtons(res.data['options'])
            }
          })
          .catch(err=>{
            console.log(err);
          });
        }
        else{
          renderCustomComponent(()=><UploadFile/>)
        }
        console.log(data)
      };
      console.log("options:-",opt)
      // console.log("options:-",opt)
      // setQuickButtons([{'label': 'Yes','value': 'Yes'},{'label': 'No','value': 'No'}])

      // renderCustomComponent(()=><Card/>)
      return (
        <Widget
        handleNewUserMessage={handleNewUserMessage}
        title="Medi"
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