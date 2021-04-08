import React from 'react';
import {
    BrowserRouter as Router,
    Switch
} from "react-router-dom";

import ToolBar from './views/ToolBar/ToolBar';
import SetView from './views/SetView/SetView';
import Console from './views/Console/Console';

function App() {

    return (
        <Router>
            <div>
                <Switch>
                    <ToolBar />
                </Switch>
                <Switch>
                    <SetView />
                </Switch>
                <Console />
            </div>
        </Router>
    );
}

export default App;