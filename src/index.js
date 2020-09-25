import React from "react";
import ReactDOM from "react-dom";
import { RecoilRoot } from "recoil";

import CharacterCounter from "./CharacterCounter";

const rootElement = document.getElementById("root");
ReactDOM.render(
    <React.StrictMode>
        <RecoilRoot>
            <CharacterCounter />
        </RecoilRoot>
    </React.StrictMode>,
    rootElement
);
