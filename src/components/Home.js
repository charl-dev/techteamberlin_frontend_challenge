import React, { Component } from "react";
import {Redirect} from 'react-router-dom'

import {connect} from "react-redux"
import { getLaunches } from "../actions/launchActions";
import Pagination from "./Pagination";

import {sortBy} from 'lodash'
import { getUrlQuery } from "../helpers/helperFunctions";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      currentLaunches: [],
      currentPage: null,
      totalPages: null,
      urlPageNumber: null,
      searchResults: null,
      isDesc: false,
      arrFl: false,
      arrMn: false
    };

    props.dispatch(getLaunches())
  }

  componentDidMount() {
    if(getUrlQuery('sort', this.props.location)){
      this.setState({isDesc: getUrlQuery('sort', this.props.location) === 'desc' ? false : true})
    }

    // to show the sorting arrows
    if(getUrlQuery('sort', this.props.location)){
      this.setState({
        arrFl: getUrlQuery('column', this.props.location) === 'flight-number' ? true : false,
        arrMn: getUrlQuery('column', this.props.location) === 'mission-name' ? true : false,
      })
    }
  }

  onPageChanged = data => {
    const { currentPage, totalPages, currentLaunches, urlPageNumber } = data;
    this.setState({ currentPage, currentLaunches, totalPages, urlPageNumber });
  };

  //called when table header is clicked
  _handleSort = (data, sortType, column) => {
    const {history, location} = this.props

    let clickedColumn = column === 1 ? 'flight_number' : 'mission_name'

    this.setState({
      arrFl: column === 1 ? true: false,
      arrMn: column === 2 ? true: false,
      isDesc: !sortType,
      currentLaunches: this.state.isDesc ? sortBy(data, [clickedColumn]).reverse() : sortBy(data, [clickedColumn])
    })
    let pageQuery = getUrlQuery('page', location)
    let hasSearch=pageQuery?'page='+pageQuery+'&':'?';

    history.replace({
      pathname:location.path,
      search: hasSearch+'column='+(column===1?'flight-number':'mission-name')+'&sort='+(this.state.isDesc?'desc':'asc')
    })

  }

  render() {
    const {launches} = this.props
    const {currentPage, currentLaunches, totalPages, urlPageNumber, isDesc, arrFl, arrMn} = this.state
    return (
            <div>
            {!launches.inProgress && (urlPageNumber <= totalPages) &&
              <div>
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col" onClick={this._handleSort.bind(this,currentLaunches, isDesc, 1)}>
                      Flight Number {arrFl && <i className={`fa fa-long-arrow-alt-${isDesc ? 'up':'down'}`}/>}
                    </th>
                    <th scope="col" onClick={this._handleSort.bind(this,currentLaunches, isDesc, 2)}>
                      Mission Name {arrMn && <i className={`fa fa-long-arrow-alt-${isDesc ? 'up':'down'}`}/>}
                    </th>
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
                descrText={`${currentPage+1} of ${totalPages} Pages - (10 items per page)`}
                limit={10}/>
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
