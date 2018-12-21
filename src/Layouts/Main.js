import React, { Component } from "react";
import {withRouter, Route, BrowserRouter as Router} from 'react-router-dom'

import {connect} from "react-redux"
import { getLaunches } from "../actions/launchActions";
// import Pagination from "./components/Pagination";
import App from "../components/Home";
import NotFound from "../components/NotFound";
import Search from "../components/Search";
import getSearchTerm from "../helpers/GetUrlQuery";

class Main extends Component {

    constructor(props) {
        super(props);
        this.state = {
            searchTerm:getSearchTerm(props.location) || ""
        }
    }
  
  _onEnterPressed = (e) => {
    const {history} = this.props
    if (e.key === 'Enter') {
        history.push({pathname:'/search', search:'?term='+e.target.value.trim()})
        console.log('do validate... here is the value', e.target.value, this.props );
    }
  }

  _handleOnChange = (e) => {
      this.setState({searchTerm:e.target.value})
  }

  render() {
      
      return(
          
            <div className="container">
                <div className="row justify-content-md-center">
                <div
                    className="col-8 shadow rounded"
                    style={{ marginTop: 64, marginBottom: 64 }}
                >
                    <h4 style={{ marginTop: 20 }}>
                    <img
                        src={require("../logo.png")}
                        className="responsive-img"
                        alt="SpaceX Logo"
                        width={150}
                    />
                    <small className="text-muted"> | Top 20 launches of 2018</small>
                    </h4>
                    <hr />

                    <div className= "form-group row">
                    <label className="col-sm-2 col-form-label">Search</label>
                    <div className="col-sm-10">
                        <input type="text" value={this.state.searchTerm} onChange={this._handleOnChange} className="form-control float-right" onKeyPress={this._onEnterPressed}/>
                    </div>
                    </div>
                    

                    <Route exact path="/" component={App} />
                    <Route path="/404" component={NotFound} />
                    <Route path="/search" component={Search} />

                </div>
                </div>
            </div>
        
      )
    
  }
}


export default withRouter(Main)