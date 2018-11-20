import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import BootstrapTable from "react-bootstrap-table-next";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import axios from "axios";

const api_uri =
  "https://api.spacexdata.com/v3/launches?launch_year=2018&order=desc&limit=20";
const { SearchBar } = Search;

class App extends Component {
  constructor() {
    super();
    this.state = {
      launches: [],
      loading: true
    };
  }

  componentDidMount() {
    // make a request to the spacex api
    axios
      .get(api_uri)
      .then(({ data }) => {
        this.setState({
          launches: data,
          loading: false
        });
      })
      .catch(err => {
        alert("Something is wrong, please refresh the page!");
      });
  }

  render() {
    // define the columns that need to be displayed
    const columns = [
      {
        dataField: "flight_number",
        text: "Flight Number",
        sort: true,
        searchable: false
      },
      {
        dataField: "mission_name",
        text: "Mission Name",
        sort: true
      },
      {
        dataField: "rocket.rocket_name",
        text: "Rocket Name",
        searchable: false
      }
    ];

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
            <ToolkitProvider
              keyField="flight_number"
              data={this.state.launches}
              columns={columns}
              bootstrap4
              search
            >
              {props => (
                <div>
                  <div className="row">
                    <div className="col-2">
                      <p className="lead">Search:</p>
                    </div>
                    <div className="col-10">
                      <SearchBar
                        {...props.searchProps}
                        placeholder="Search Mission Name"
                      />
                    </div>
                  </div>
                  <hr />
                  <BootstrapTable
                    {...props.baseProps}
                    striped
                    hover
                    bordered={false}
                    condensed
                    noDataIndication={
                      this.state.loading ? "Loading..." : "No launches found"
                    }
                  />
                </div>
              )}
            </ToolkitProvider>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
