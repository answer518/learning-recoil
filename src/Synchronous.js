import React from "react";
import { atom, useRecoilValue } from "recoil";

const currentUserName = atom({
    key: "currentUserName",
    default: 'guotingjie'
});

function CurrentUserName() {
    const userName = useRecoilValue(currentUserName)
    return <div>{userName}</div>
}

export default CurrentUserName