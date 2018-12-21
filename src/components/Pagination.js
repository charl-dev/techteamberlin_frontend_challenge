import React, { Component, Fragment } from "react";
import {Link} from 'react-router-dom';
import {chunk, sortBy} from 'lodash';
import { getUrlQuery } from "../helpers/helperFunctions";

class Pagination extends Component {
  constructor(props) {
    super(props);
    this.pageLimit = props.limit
    this.totalRecords = props.all_launches

    const inChunks = chunk(props.all_launches, this.pageLimit)
    this.totalPages = inChunks.length
    
    let pages = [];
    chunk(props.all_launches, this.pageLimit).map((item, index) => {
      return pages.push(index)
    })

    this.state = { 
      currentPage: 1,
      inChunks: inChunks,
      pages : pages
    };
    
  }

  componentDidMount() {
    // check params

    let currentPage = 0;


    if(getUrlQuery('page', this.props.location)){
      currentPage = parseInt(getUrlQuery('page', this.props.location), 10)-1
    }
    
    this.gotoPage(currentPage);
  }

  gotoPage = page => {
    const { onPageChanged = f => f } = this.props;

    const currentPage = Math.max(0, Math.min(page, this.totalPages));
    let currentLaunches = this.state.inChunks[page]

    if(getUrlQuery('sort', this.props.location) || getUrlQuery('column', this.props.location)){
      let sortType =  getUrlQuery('sort', this.props.location) === 'desc' ? true : false
      let column =  getUrlQuery('column', this.props.location) === 'mission-name' ? 2 : 1
      // console.log("Helllooooooo", currentLaunches, getUrlQuery('column', this.props.location));
      currentLaunches = this._handleSort(currentLaunches, sortType, column)
    }
    
    const urlPageNumber = page

    //this data will be passed to the parent
    const paginationData = {
      currentPage,
      currentLaunches,
      urlPageNumber,
      totalPages: this.totalPages,
      pageLimit: this.pageLimit,
      totalRecords: this.totalRecords,
    };

    this.setState({ currentPage }, () => onPageChanged(paginationData));
  };

  //hand sorting on the page
  _handleSort = (data, isDesc, column) => {
    let clickedColumn = column === 1 ? 'flight_number' : 'mission_name'
    return isDesc ? sortBy(data, [clickedColumn]).reverse() : sortBy(data, [clickedColumn])
  }

  handleClick = (page, evt) => {
    this.gotoPage(page);
  };

  render() {
    if (!this.totalRecords) return null;

    if (this.totalPages === 1) return null;

    const {pages, currentPage} = this.state

    return (
      <Fragment>
        <hr />
        <nav aria-label="pagination for launches">
          <p className="float-left">{this.props.descrText}</p>
          <ul className="pagination justify-content-end">
            {pages.map(page => 
            
              <li 
              className={`page-item${currentPage === page ? " active" : ""}`} 
              key={page}>
                <Link to={{pathname: '/', search: '?page='+(parseInt(page, 10)+1)}} className="page-link" href="#" onClick={e => this.handleClick(page, e)}>{page+1}</Link></li>
            )}
          </ul>
        </nav>
      </Fragment>
    );
  }
}

export default Pagination;