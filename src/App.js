import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import {Link} from 'react-router-dom'

import {connect} from "react-redux"
import { getLaunches } from "./actions/launchActions";
import Pagination from "./components/Pagination";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      currentLaunches: [],
      currentPage: null,
      totalPages: null,
      urlPageNumber: null
    };

    props.dispatch(getLaunches())
  }

  componentDidMount() {
    console.log('these are the props', this.props)
  }

  onPageChanged = data => {
    const { currentPage, totalPages, currentLaunches, urlPageNumber } = data;
    this.setState({ currentPage, currentLaunches, totalPages, urlPageNumber });
  };

  render() {
    const {launches} = this.props
    const {currentPage, currentLaunches, totalPages, urlPageNumber} = this.state

    console.log("current page.....", currentPage)
    console.log("total pages.....", totalPages)

    return (
      <div className="container">
        <div className="row justify-content-md-center">
          <div
            className="col-8 shadow rounded"
            style={{ marginTop: 64, marginBottom: 64 }}
          >
            <h4 style={{ marginTop: 20 }}>
              <img
                src={require("./logo.png")}
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
                <input type="text" className="form-control float-right"/>
              </div>
            </div>
            
            {!launches.inProgress && (urlPageNumber <= totalPages) &&
              <div>
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Flight Number</th>
                    <th scope="col">Mission Name</th>
                    <th scope="col">Rocket Name</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    currentLaunches.map((launch, index) => (
                      <tr key={index}>
                        <td>{launch.flight_number}</td>
                        <td>{launch.mission_name}</td>
                        <td>{launch.rocket.rocket_name}</td>
                      </tr>
                    ))
                  }
                </tbody>
              </table>
              <Pagination 
                all_launches={launches.all_launches} 
                onPageChanged={this.onPageChanged} 
                location={this.props.location}
                limit={5}/>
              </div>
            }

            {!launches.inProgress && (urlPageNumber > totalPages) &&
              <div className="text-center">
                <hr />
              <p>404 page {urlPageNumber} not found </p>
              <Link to='/'>Go to List</Link>
              </div>
            }

            {launches.inProgress && 
              <p className="text-center">Loading...</p>
            }

          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  launches: state.launches
})

export default connect(mapStateToProps)(App);
