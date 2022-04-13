
import React from "react";
import Header from "./Header.js";
import './App.css';


function PageWrapper(props) {


    return (
        <>
            <Header
                signedIn={props.signedIn}
                updateSignedIn={props.updateSignedIn}
                getToken={props.getToken}
            />
            <div className='homepage bg-dark'>
                {props.page}
            </div>
        </>
    );
}
export default PageWrapper;