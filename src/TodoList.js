import React, { useState } from "react";
import { atom, selector, useSetRecoilState, useRecoilState, useRecoilValue } from "recoil";

const todoListState = atom({
    key: 'todoListState',
    default: [],
});

const todoListFilterState = atom({
    key: 'todoListFilterState',
    default: 'Show All',
});

const filteredTodoListState = selector({
    key: 'filteredTodoListState',
    get: ({ get }) => {
        const filter = get(todoListFilterState);
        const list = get(todoListState);

        switch (filter) {
            case 'Show Completed':
                return list.filter((item) => item.isComplete);
            case 'Show Uncompleted':
                return list.filter((item) => !item.isComplete);
            default:
                return list;
        }
    },
});

let id = 0;

const getId = () => id ++

function Creator() {
    const [inputValue, setInputValue] = useState('')
    const setTodoList = useSetRecoilState(todoListState)

    const addItem = () => {
        setTodoList((oldTodoList) => [
            ...oldTodoList,
            {
                id: getId(),
                text: inputValue,
                isComplete: false,
            },
        ])
        setInputValue('')
    }

    const onChange = (e) => {
        setInputValue(e.target.value)
    }

    return (
        <div>
            <input type="text" value={inputValue} onChange={onChange} />
            <button onClick={addItem}>Add</button>
        </div>
    )
}

function TodoListFilters() {
    const [filter, setFilter] = useRecoilState(todoListFilterState)
    const updateFilter = (e) => {
        setFilter(e.target.value)
    }

    return (
        <>
            Filter:
            <select value={filter} onChange={updateFilter}>
                <option value="Show All">All</option>
                <option value="Show Completed">Completed</option>
                <option value="Show Uncompleted">Uncompleted</option>
            </select>
        </>
    )
}

function TodoItem({ item }) {
    const [todoList, setTodoList] = useRecoilState(todoListState)
    const index = todoList.findIndex(_item => _item === item)

    const editItemText = (e) => {
        const newList = replaceItemAtIndex(todoList, index, {
            ...item,
            text: e.target.value,
        });

        setTodoList(newList);
    };

    const toggleItemCompletion = () => {
        const newList = replaceItemAtIndex(todoList, index, {
            ...item,
            isComplete: !item.isComplete,
        })

        setTodoList(newList)
    }

    const deleteItem = () => {
        const newList = removeItemAtIndex(todoList, index)

        setTodoList(newList)
    }

    return (
        <div>
            <input type="text" value={item.text} onChange={editItemText} />
            <input
                type="checkbox"
                checked={item.isComplete}
                onChange={toggleItemCompletion}
            />
            <button onClick={deleteItem}>X</button>
        </div>
    )
}

function replaceItemAtIndex(arr, index, newValue) {
    return [...arr.slice(0, index), newValue, ...arr.slice(index + 1)];
}

function removeItemAtIndex(arr, index) {
    return [...arr.slice(0, index), ...arr.slice(index + 1)];
}

export default function TodoList() {
    const todoList = useRecoilValue(filteredTodoListState)
    return (
        <>
            <Creator />
            <TodoListFilters />
            {todoList.map((todoItem) => (
                <TodoItem key={todoItem.id} item={todoItem} />
            ))}
        </>
    )
}