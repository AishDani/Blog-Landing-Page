// App.js
import React, { useEffect, useState } from 'react';
import './App.css';
import Section from './components/Section';
import { getEntries } from './services/stack';
import parse from 'html-react-parser'; // If you're parsing HTML content
import { jsonToHtml } from "@contentstack/json-rte-serializer";


const App = () => {
    const [content, setContent] = useState(null);
    const contentType = 'blog_landing_page';

    useEffect(() => {
        getEntries(contentType)
            .then((res) => {
                setContent(res);
            })
            .catch((err) => {
                console.error(err);
            });
    }, []);

    const htmlBody = content?.body ? jsonToHtml(content.body) : '';

    return (
        <>
            <Section /> 
            <div className="blog-content">
                <h1>{content?.title}</h1>
                <div className="blog-body" dangerouslySetInnerHTML={{__html:htmlBody}}></div>
            </div>
        </>
    );
};

export default App;
