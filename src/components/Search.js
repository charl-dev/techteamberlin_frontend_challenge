import React, { Component } from 'react';
import {connect} from 'react-redux';
import { getLaunches } from '../actions/launchActions';

import { Redirect, Link } from 'react-router-dom';
import getSearchTerm from '../helpers/GetUrlQuery'


class Search extends Component {
    constructor(props){
        super(props);
        this.state = {
            searchTerm : getSearchTerm(props.location),
            searchResults : []
        }

        if(props.launches.all_launches === undefined){
            props.dispatch(getLaunches())
        }
    }
    componentDidMount() {
        const {all_launches} = this.props.launches
        if(this.state.searchTerm !== null && all_launches !== undefined){
            this._getSearchResults(all_launches, this.state.searchTerm)
        }
        console.log('these are the props', this.state.searchResults)
    }

    componentDidUpdate(prevProps, prevState) {

        //when a search is perfomed on home page or pasted in the url...
        const {all_launches} = this.props.launches
        if ((prevProps.launches !== this.props.launches)) {
            if(all_launches !== undefined){
                this._getSearchResults(all_launches, getSearchTerm(this.props.location))
            }
        }

        //when a search is perfomed on search results page...
        if(prevProps.location !== this.props.location){
            
            this._getSearchResults(all_launches, getSearchTerm(this.props.location))
        }
    }


    //get filter results
    _getSearchResults(launches, term){
        const searchResults = launches.filter((launch) => {
            // filter from mission name
            return launch.mission_name.toLowerCase().indexOf(term.toLowerCase()) > -1;
        })
        this.setState({searchResults})
    }
    render() {
        const { searchResults, searchTerm} = this.state
        console.log('ok',searchResults, searchTerm);
        return (
            <div>

                {!this.props.launches.inProgress &&
                    <h2>Search Results | <small>{searchResults.length} results found</small></h2>
                }
                <p />
                {!this.props.launches.inProgress && searchTerm && searchResults.length === 0 &&
                    <p className="text-center">No results found</p>
                }
                {this.props.launches.inProgress &&
                    <p className="text-center">Searching please wait...</p>
                }
            
                {(searchTerm && searchResults.length > 0) &&
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
                        searchResults.map((result, index) => (
                            <tr key={index}>
                            <td>{result.flight_number}</td>
                            <td>{result.mission_name}</td>
                            <td>{result.rocket.rocket_name}</td>
                            </tr>
                        ))
                        }
                    </tbody>
                    </table>

                    <hr />
                    <p className="text-center"><Link to='/'>Go to Home </Link> </p>
                    </div>
                }
                {(!searchTerm )&&
                    <Redirect to='/' />
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    launches: state.launches
})

export default connect(mapStateToProps)(Search)

