import React from "react";
import ReactDOM from "react-dom";
import { RecoilRoot } from "recoil";

import TodoList from "./TodoList";

const rootElement = document.getElementById("root");
ReactDOM.render(
    <React.StrictMode>
        <RecoilRoot>
            <TodoList />
        </RecoilRoot>
    </React.StrictMode>,
    rootElement
);
