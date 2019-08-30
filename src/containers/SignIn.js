import React, {Component} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Link as RouterLink } from 'react-router-dom';
import {connect} from "react-redux";
import validator from 'validator';

import {signinUserAction} from '../actions/AuthActions'

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
  
class SignIn extends Component {

	state = {
		email: '',
        password: ''
    }
    
    /**
	 * On User Login
	 */
	onUserLogin(e) {
        e.preventDefault();
        const user = this.vaildateUserData();
		if (user) {
			this.props.signinUserAction(user, this.props.history);
		}
    }
    
    
    handleChange = ({target}) => {
        this.setState({
            [target.name]: target.type === 'checkbox' ? target.checked : target.value
        });
    }

    
    vaildateUserData() {
        const { email, password } = this.state;
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
        
        if (isValid) {
            return { email, password };
        }
    }

    clearErrorMessages= () => {
        this.setState(() => ({ 
            emailError: '',
            passwordError: ''
        }));
    }

    render() {
		const { email, password, remember } = this.state;
		const { emailError, passwordError } = this.state;
        const {classes} = this.props;
        return (
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                    Sign in
                    </Typography>
                    <form className={classes.form} onSubmit={(e) => this.onUserLogin(e)} noValidate>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        value={email}
                        onChange={this.handleChange}
                        error={emailError}
                        helperText={emailError}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
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
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Sign In
                    </Button>
                    <Grid container>
                        <Grid item>
                            <Link component={RouterLink} to="/signup" variant="body2">
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                    </form>
                </div>
            </Container>
        )
    }
}
SignIn.propTypes = {
    classes: PropTypes.object.isRequired,
};

function mapStateToProps({authUser}) {
    const { user, loading } = authUser;
	return { user, loading }
}
export default withStyles(styles)(connect(mapStateToProps, {
    signinUserAction
})(SignIn));