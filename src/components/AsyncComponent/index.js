/**
 * AsyncComponent
 * Code Splitting Component
 */
import React from 'react';
import Loadable from 'react-loadable';

// rct page loader
import RctPageLoader from '../RctPageLoader';

// Articles
const AsyncArticles = Loadable({
	loader: () => import("../../app/dashboard/routes/Articles"),
	loading: () => <RctPageLoader />,
});
const AsyncArticlesList = Loadable({
	loader: () => import("../../app/dashboard/routes/Articles/routes/List"),
	loading: () => <RctPageLoader />,
});
const AsyncArticlesCreate = Loadable({
	loader: () => import("../../app/dashboard/routes/Articles/routes/Create"),
	loading: () => <RctPageLoader />,
});
const AsyncArticlesEdit = Loadable({
	loader: () => import("../../app/dashboard/routes/Articles/routes/Edit"),
	loading: () => <RctPageLoader />,
});

// Error 404 component
const AsyncError404 = Loadable({
	loader: () => import("../Error404"),
	loading: () => <RctPageLoader />,
});

export {
	AsyncArticles,
	AsyncArticlesList,
	AsyncArticlesCreate,
	AsyncArticlesEdit,
	AsyncError404
};
