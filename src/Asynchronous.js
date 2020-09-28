import React from "react";
import { selector, useRecoilValue } from "recoil";

const fetchUserName = () => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve('guotingjie')
        }, 3000)
    })
}

const currentUserNameFromAsyn = selector({
    key: 'CurrentUserName',
    get: async ({ get }) => {
        const userName = await fetchUserName()
        return userName
    }
})

function CurrentUserName() {
    const userName = useRecoilValue(currentUserNameFromAsyn)
    return <div>{userName}</div>
}
export default CurrentUserName