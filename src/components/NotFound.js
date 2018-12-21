import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class NotFound extends Component {
    render() {
        return (
            <div className="text-center">
                <hr />
                <p><i className="fa fa-exclamation-triangle"/> 404 - page not found </p>
                <p><Link to='/?page=1'>Go to page 1</Link></p>
            </div>
        );
    }
}