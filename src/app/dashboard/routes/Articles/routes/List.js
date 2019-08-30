import React from 'react';
import { connect } from 'react-redux';
import ArticlesDataTable from '../../../../../components/ArticlesDataTable';

const List = (props) => {
    return (
        <div>
            <ArticlesDataTable />
        </div>
    );
}

const mapStateToProps = ({articlesReducer}) => {
    return {articles: articlesReducer.articles}
}
export default connect(mapStateToProps)(List);