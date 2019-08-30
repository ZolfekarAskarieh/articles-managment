import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import { Container } from '@material-ui/core';
import './style.css';
export default class NotFound extends Component {
  render() {
    return (
        <Container fixed>
            <p className="error404">404 Error, Page Not Found</p>
            <Button component={Link} to="/" variant="raised" className="btn-light btn-lg">Go To Home Page</Button>
        </Container>
    );
  }
}
