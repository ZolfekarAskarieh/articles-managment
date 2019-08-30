import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';

import DashboardApp from '../app/dashboard/index';
import FrontendApp from '../app/frontend/index';
import SignIn from './SignIn';
import SignUp from './SignUp';
import { AsyncError404 } from '../components/AsyncComponent';
import { NotificationContainer } from 'react-notifications';

import 'react-notifications/lib/notifications.css';


const RestrictedRoute = ({component: Component, authUser, ...rest}) =>
    <Route
        {...rest}
        render={props =>
            authUser
                ? <Component {...props} />
                : <Redirect
                    to={{
                        pathname: '/signin',
                        state: {from: props.location}
                    }}
                />}
    />;


class App extends Component {

    render() {
        const { location, match, user } = this.props;
        if (location.pathname === '/') {
			if (user === null) {
				return (<Redirect to={'/home'} />);
			} else {
				return (<Redirect to={'/dashboard'} />);
			}
        }
        if (location.pathname === '/signin' || location.pathname === '/signup') {
            if (user) {
				return (<Redirect to={'/dashboard'} />);
			}
        }
        return (
            <div className="app-main">
            <NotificationContainer />
                <Switch>
                    <RestrictedRoute path={'/dashboard'} authUser={user} component={DashboardApp}/>
                    <Route path='/home' component={FrontendApp}/>
                    <Route path='/signin' component={SignIn}/>
                    <Route path='/signup' component={SignUp}/>
                    <Route component={AsyncError404}/>
                </Switch>
            </div>
        )
    }
}


// map state to props
const mapStateToProps = ({ authUser }) => {
	const { user } = authUser;
	return { user };
};

export default connect(mapStateToProps)(App);