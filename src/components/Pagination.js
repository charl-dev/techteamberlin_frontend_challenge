import React, { Component, Fragment } from "react";
import {Link} from 'react-router-dom';
import {chunk} from 'lodash';

class Pagination extends Component {
  constructor(props) {
    super(props);
    // const { totalRecords = null, pageLimit = 30, pageNeighbours = 0 } = props;

    // this.pageLimit = typeof pageLimit === "number" ? pageLimit : 30;
    // this.totalRecords = typeof totalRecords === "number" ? totalRecords : 0;

    // this.pageNeighbours =
    //   typeof pageNeighbours === "number"
    //     ? Math.max(0, Math.min(pageNeighbours, 2))
    //     : 0;

    // this.totalPages = Math.ceil(this.totalRecords / this.pageLimit);
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
    if(this.props.location.search){
      let params = new URLSearchParams(this.props.location.search); // requires modern browsers
      currentPage = parseInt(params.get('page'), 10)-1
    }

    // console.log('here is the param', parseInt(params.get('page'), 10));
    
    this.gotoPage(currentPage);
  }

  gotoPage = page => {
    const { onPageChanged = f => f } = this.props;

    const currentPage = Math.max(0, Math.min(page, this.totalPages));
    const currentLaunches = this.state.inChunks[page]
    const urlPageNumber = page

    const paginationData = {
      currentPage,
      currentLaunches,
      urlPageNumber,
      totalPages: this.totalPages,
      pageLimit: this.pageLimit,
      totalRecords: this.totalRecords
    };

    this.setState({ currentPage }, () => onPageChanged(paginationData));
  };

  handleClick = (page, evt) => {
    // evt.preventDefault();
    // const {history} = this.props

    // let location = {
    //   pathname: '/',
    //   search: '?page='+page
    // }

    console.log("current location", this.props);
    

    // history.replace(location)

    this.gotoPage(page);
  };

  // handleMoveLeft = evt => {
  //   evt.preventDefault();
  //   this.gotoPage(this.state.currentPage - this.pageNeighbours * 2 - 1);
  // };

  // handleMoveRight = evt => {
  //   evt.preventDefault();
  //   this.gotoPage(this.state.currentPage + this.pageNeighbours * 2 + 1);
  // };

  render() {
    if (!this.totalRecords) return null;

    if (this.totalPages === 1) return null;


    // console.log(this.state)
    const {pages, currentPage} = this.state

    return (
      <Fragment>
        <hr />
        <nav aria-label="pagination for launches">
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