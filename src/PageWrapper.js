
import React from "react";
import Header from "./Header.js";
import './App.css';

function PageWrapper(props) {
    return (
        <>
            <Header
                signOut={props.signOut}
            />
            <div className='homepage bg-dark'>
                {props.page}
            </div>
        </>
    );
}

export default PageWrapper;