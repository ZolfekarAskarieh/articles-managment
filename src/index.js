import React from 'react';
import ReactDom from 'react-dom';

import MainApp from './MainApp';

const rootEl = document.getElementById('root');

ReactDom.render(
    <MainApp />,
    rootEl
);