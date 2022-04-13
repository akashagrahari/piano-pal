import React, { useEffect } from 'react';
import {
    Form,
    Button,
    Container,
} from 'react-bootstrap'


function MainApp(props) {

    return (
        <div class='piano-wrapper' >
            {/* <p>Main App {props.getToken()}</p> */}
            <ul id="piano">
                <li><div class="white"></div></li>
                <li><div class="white"></div><div class="black"></div></li>
                <li><div class="white"></div><div class="black"></div></li>
                <li><div class="white"></div></li>
                <li><div class="white"></div><div class="black"></div></li>
                <li><div class="white"></div><div class="black"></div></li>
                <li><div class="white"></div><div class="black"></div></li>


                <li><div class="white"></div></li>
                <li><div class="white"></div><div class="black"></div></li>
                <li><div class="white"></div><div class="black"></div></li>
                <li><div class="white"></div></li>
                <li><div class="white"></div><div class="black"></div></li>
                <li><div class="white"></div><div class="black"></div></li>
                <li><div class="white"></div><div class="black"></div></li>


                <li><div class="white"></div></li>
                <li><div class="white"></div><div class="black"></div></li>
                <li><div class="white"></div><div class="black"></div></li>
                <li><div class="white"></div></li>
                <li><div class="white"></div><div class="black"></div></li>
                <li><div class="white"></div><div class="black"></div></li>
                <li><div class="white"></div><div class="black"></div></li>


                <li><div class="white"></div></li>
                <li><div class="white"></div><div class="black"></div></li>
                <li><div class="white"></div><div class="black"></div></li>
                <li><div class="white"></div></li>
                <li><div class="white"></div><div class="black"></div></li>
                <li><div class="white"></div><div class="black"></div></li>
                <li><div class="white"></div><div class="black"></div></li>
                <li><div class="white"></div></li>
                <li><div class="white"></div><div class="black"></div></li>
                <li><div class="white"></div><div class="black"></div></li>
                <li><div class="white"></div></li>
            </ul>
        </div>
    )
};


export default MainApp;