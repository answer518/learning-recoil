import React from "react";
import { atom, selector, useRecoilState, useRecoilValue } from "recoil";
import "./styles.css";

const count = atom({
    key: "count",
    default: 0
});

const isEvenCount = selector({
    key: "evenCount",
    get: ({ get }) => {
        const state = get(count);
        return state % 2 === 0;
    }
});

export default function App() {
    const [countState, setCount] = useRecoilState(count);
    const value = useRecoilValue(isEvenCount);

    return (
        <div className="App">
            <h1>{countState}</h1>
            <button onClick={() => setCount(c => c + 1)}>Increase count</button>
            <p>{`Is  even count: ${value}`}</p>
        </div>
    );
}
