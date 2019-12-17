import React from 'react';

import Aux from './../../hoc/Auxility';
import './Layout.css';
import Toolbar from '../UI/Navigation/Toolbar/Toolbar';

const layout = ( props ) => (
    <Aux>
    <Toolbar />
    <main className="Content">
        {props.children}
    </main>
    </Aux>
);

export default layout;