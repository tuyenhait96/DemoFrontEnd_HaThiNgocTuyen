import React, { Component } from 'react';
import {
    Route,
} from "react-router-dom";
import News from '../Components/News';
import Home from '../Components/Home';
import Detail from '../Components/Detail';
import Contact from '../Components/Contact';

class NavigateURL extends Component {
    render() {
        return (
            <div>
                <Route exact path="/" component={Home} />
                <Route exact path="/home" component={Home} />
                <Route exact path="/new" component={News} />
                <Route exact path="/detail/:slug.:id.html" component={Detail} />
                <Route exact path="/contact" component={Contact} />
            </div>
        );
    }
}

export default NavigateURL;