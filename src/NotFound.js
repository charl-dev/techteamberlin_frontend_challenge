import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class NotFound extends Component {
    render() {
        return (
            <div className="container">
                <div className="row justify-content-md-center">
                    <div className="col-8 shadow rounded" style={{ marginTop: 64, marginBottom: 64 }}>
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
                        <div className="text-center">
                            <p>404 - page not found </p>
                            <p><Link to='/?page=1'>Go to List</Link></p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}