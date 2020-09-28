import React from "react";
import CurrentUserName from './Asynchronous'

import "./styles.css";

export default function App() {

    return (
        <div className="App">
            <React.Suspense fallback={<div>loading...</div>}>
                <CurrentUserName />
            </React.Suspense>
        </div>
    );
}
