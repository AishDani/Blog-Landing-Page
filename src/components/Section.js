// Section.js
import React, { useEffect, useState } from "react";
import { getEntries } from "../services/stack";
import './Section.css'; // Assuming you have a CSS file for styling

const Section = () => {
    const [content, setContent] = useState();
    const contentType = 'hero_banner';

    useEffect(() => {
        getEntries(contentType)
            .then((res) => {
                setContent(res);
            })
            .catch((err) => {
                console.error(err);
            });
    }, [contentType]);
    


    const bannerStyle = {
        backgroundColor: content?.background_color.hex,
        color: content?.text_color.hex,
        textAlign: content?.content_title_alignment.toLowerCase(),
    };

    return (
        <div className="hero-banner" style={bannerStyle}>
          <h1 style={{color:'white'}}>{content?.title}</h1>
        </div>
    );
};

export default Section;
