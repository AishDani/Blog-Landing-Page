// App.js
import React, { useEffect, useState } from "react";
import "./App.css";
import Section from "./components/Section";
import { getEntries } from "./services/stack";
import services from "./services/index";
import parse from "html-react-parser"; // If you're parsing HTML content
import { jsonToHtml } from "@contentstack/json-rte-serializer";
import { Button ,TextInput, Textarea,Notification, InfiniteScrollTable,TableComponent} from "@contentstack/venus-components";
import '@contentstack/venus-components/build/main.css'

const App = () => {
  const [content, setContent] = useState(null);
  const contentType = "blog_landing_page";
  const [name,setName] = useState();
  const [comment,setComment] = useState();

  useEffect(() => {
    getEntries(contentType)
      .then((res) => {
        setContent(res);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const htmlBody = content?.body ? jsonToHtml(content.body) : "";
  // const handleButtonClick = async () => {
  //   const call = await services?.makeAnApiCall("http://localhost:5000/user", {
  //     users: ["gojo", "satoru"],
  //   });
  //   console.info("call>>>", call);
  // };
  let   entry =  {
    title:'Sample Entry',
    url:'/sampleEntry'
  } 
  const handleClick =  async(name,comment)=>{
    console.log("in handle click");
    const obj = {
          name: name,
          comment: comment,

    }
    const call = await services?.makeAnApiCall("http://localhost:3000/user",obj );
    console.info("call>>>", call);
    if(call.status === 200){
    return (
      Notification({
        notificationContent: { text: 'Comment submitted successfully' },
        type: 'success'
      })
    )
  }
}

  const handleOnChangeName = (e)=>{
    setName(e.target.value)
  }

  const handleOnChangeComment = (e)=>{
    setComment(e.target.value)
  }


  return (
    <>
      <Section />
      <div className="blog-content">
        <h1>{content?.title}</h1>
        <div>
          <Button
            buttonType="secondary"
            icon="Star"
            size="small"
            version="v1"
          >
            makeAnApiCall
          </Button>
        </div>
        <div
          className="blog-body"
          dangerouslySetInnerHTML={{ __html: htmlBody }}
        ></div>

        <div className="form">

        <div style={{paddingBottom:'10px' }}>
        <TextInput
        value={name}
          placeholder="Type name"
          type="text"
          version="v2"
          width="medium"
          willBlurOnEsc
          onChange={handleOnChangeName}
        />
        </div>
        <div style={{paddingBottom:'10px'}}>
        <Textarea
        value={comment}
        version="v2"
        width="medium"
        placeholder="Type suggestion"
        rows="2"
        onChange={handleOnChangeComment}
        />

        </div>
         <Button version="v2" onClick={()=>handleClick(name,comment)}>Send</Button>
        </div>
        
      
        
      </div>
    </>
  );
};

export default App;
