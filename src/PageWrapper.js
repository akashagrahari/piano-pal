
import React from "react";
import Header from "./Header.js";
import './App.css';


class PageWrapper extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <>
                <Header
                    signedIn={this.props.signedIn}
                    getToken={this.props.getToken}
                    logout={this.props.logout}
                />
                <div className='homepage bg-dark'>
                    {this.props.page}
                </div>
            </>
        );
    }
}
// function PageWrapper(props) {
//     return (
//         <>
//             <Header
//                 getToken={this.props.getToken}
//                 logout={this.props.logout}
//             />
//             <div className='homepage bg-dark'>
//                 {props.page}
//             </div>
//         </>
//     );
// }

export default PageWrapper;