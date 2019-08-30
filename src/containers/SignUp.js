import React, {Component} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Link as RouterLink } from 'react-router-dom';
import {connect} from "react-redux";
import validator from 'validator';

import {signupUserAction} from '../actions/AuthActions'

const styles = theme => ({
    '@global': {
        body: {
            backgroundColor: theme.palette.common.white,
        },
    },
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    }
});
  
class SignUp extends Component {

    state = {
        firstName: '',
        lastName: '',
		email: '',
		password: ''
    }

    onUserSignUp = (e) => {
        e.preventDefault();
        const user = this.vaildateUserData();
        if (user) {
			this.props.signupUserAction(user, this.props.history);
		}
    }

    handleChange = ({target}) => {
        this.setState({
            [target.name]: target.value
        });
    }
    vaildateUserData() {
        const { firstName, lastName, email, password } = this.state;
        this.clearErrorMessages();

        let isValid = true;
        if (validator.isEmpty(email)) {
            isValid = false;
            this.setState(() => ({ emailError: 'Email is required' }));
        } else if (!validator.isEmail(email)) {
            isValid = false;
            this.setState(() => ({ emailError: 'Please enter a valid email' }));
        }

        if (validator.isEmpty(password)) {
            isValid = false;
            this.setState(() => ({ passwordError: 'Password is required' }));
        }

        if (validator.isEmpty(firstName)) {
            isValid = false;
            this.setState(() => ({ firstNameError: 'First name is required' }));
        }

        if (validator.isEmpty(lastName)) {
            isValid = false;
            this.setState(() => ({ lastNameError: 'Last name is required' }));
        }
        
        if (isValid) {
            return { email, password, firstName, lastName };
        }
    }

    clearErrorMessages= () => {
        this.setState(() => ({ 
            emailError: '',
            passwordError: '',
            firstNameError: '',
            lastNameError: ''
        }));
    }

    render() {
        const {classes} = this.props; 
        const {firstName, lastName, email, password} = this.state;
		const { emailError, passwordError, firstNameError, lastNameError } = this.state;

        return (
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                    Sign up
                    </Typography>
                    <form className={classes.form} noValidate onSubmit={(e) => this.onUserSignUp(e)}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                        <TextField
                            autoComplete="fname"
                            name="firstName"
                            variant="outlined"
                            required
                            fullWidth
                            id="firstName"
                            label="First Name"
                            autoFocus
                            value={firstName}
                            onChange={this.handleChange}
                            error={firstNameError}
                            helperText={firstNameError}
                        />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            id="lastName"
                            label="Last Name"
                            name="lastName"
                            value={lastName}
                            autoComplete="lname"
                            onChange={this.handleChange}
                            error={lastNameError}
                            helperText={lastNameError}
                        />
                        </Grid>
                        <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            value={email}
                            autoComplete="email"
                            onChange={this.handleChange}
                            error={emailError}
                            helperText={emailError}
                        />
                        </Grid>
                        <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            value={password}
                            autoComplete="current-password"
                            onChange={this.handleChange}
                            error={passwordError}
                            helperText={passwordError}
                        />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Sign Up
                    </Button>
                    <Grid container justify="flex-end">
                        <Grid item>
                        <Link component={RouterLink} to="/signin" variant="body2">
                            Already have an account? Sign in
                        </Link>
                        </Grid>
                    </Grid>
                    </form>
                </div>
            </Container>
        )
    }
}
SignUp.propTypes = {
    classes: PropTypes.object.isRequired,
};


function mapStateToProps({authUser}) {
    const { user, loading } = authUser;
	return { user, loading }
}
export default withStyles(styles)(connect(mapStateToProps, {
    signupUserAction
})(SignUp));