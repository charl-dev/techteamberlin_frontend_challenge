import React, { Component } from "react";
import {Redirect} from 'react-router-dom'

import {connect} from "react-redux"
import { getLaunches } from "../actions/launchActions";
import Pagination from "./Pagination";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      currentLaunches: [],
      currentPage: null,
      totalPages: null,
      urlPageNumber: null,
      searchResults: null
    };

    props.dispatch(getLaunches())
  }

  componentDidMount() {
    let queryString = new URLSearchParams(this.props.location.search)
    console.log('these are the props', queryString.get('term'), this.props)
  }

  onPageChanged = data => {
    const { currentPage, totalPages, currentLaunches, urlPageNumber } = data;
    this.setState({ currentPage, currentLaunches, totalPages, urlPageNumber });
  };

  // _onEnterPressed = (e) => {
  //   const {history} = this.props
  //   if (e.key === 'Enter') {
  //     history.push({pathname:'/search', search:'?term='+e.target.value})
  //     console.log('do validate... here is the value', e.target.value, this.props );
  //   }
  // }

  render() {
    const {launches} = this.props
    const {currentPage, currentLaunches, totalPages, urlPageNumber} = this.state

    console.log("current page.....", currentPage)
    console.log("total pages.....", totalPages)

    return (
            <div>
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
                descrText={`${currentPage+1} of ${totalPages} Pages`}
                limit={5}/>
              </div>
            }

            {!launches.inProgress && (urlPageNumber > totalPages) &&
              <Redirect to='/404' />
            }

            {launches.inProgress && 
              <p className="text-center">Loading...</p>
            }
          </div>
    );
  }
}

const mapStateToProps = (state) => ({
  launches: state.launches
})

export default connect(mapStateToProps)(App);
