import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import SideBar from '../../components/SideBar'
import { Switch, Route, Redirect } from 'react-router-dom';
import {AsyncError404, AsyncArticles} from '../../components/AsyncComponent';


class Dashboard extends Component {
    render() {
        const { match } = this.props;
        return (
            <div>
                <SideBar>
                    <Switch>
                        <Redirect exact from={`${match.url}/`} to={`${(match.url + (match.url[match.url.length - 1] === '/'?'':'/'))}articles`}/>
                        <Route
                            path={`${match.url}/articles`}
                            component={AsyncArticles}
                        />
                        <Route component={AsyncError404}/>
                    </Switch>
                </SideBar>
            </div>
        )
    }
}

export default Dashboard;