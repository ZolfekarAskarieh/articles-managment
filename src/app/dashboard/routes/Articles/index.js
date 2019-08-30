import React, {Component} from 'react';
import {AsyncError404, AsyncArticlesList, AsyncArticlesCreate, AsyncArticlesEdit} from '../../../../components/AsyncComponent';
import { Switch, Route } from 'react-router-dom';

class Articles extends Component {
    render() {
        const { match } = this.props;
        return (
            <Switch>
                <Route exact
                    path={`${match.url}`}
                    component={AsyncArticlesList}
                />
                <Route
                    path={`${match.url}/create`}
                    component={AsyncArticlesCreate}
                />
                <Route
                    path={`${match.url}/edit/:id`}
                    component={AsyncArticlesEdit}
                />
                <Route component={AsyncError404}/>
            </Switch>
        )
    }
}

export default Articles;