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

const todoListStatsState = selector({
    key: 'todoListStatsState',
    get: ({ get }) => {
        const todoList = get(todoListState)
        const total = todoList.length
        const completedNum = todoList.filter((item) => item.isComplete).length;
        const uncompletedNum = total - completedNum;
        const percentCompleted = total === 0 ? 0 : completedNum / total;

        return {
            total,
            completedNum,
            uncompletedNum,
            percentCompleted,
        };
    },
})

let id = 0;

const getId = () => id++

function TodoListStats() {
    const {
        total,
        completedNum,
        uncompletedNum,
        percentCompleted,
    } = useRecoilValue(todoListStatsState);

    const formattedPercentCompleted = Math.round(percentCompleted * 100);

    return (
        <ul>
            <li>Total items: {total}</li>
            <li>Items completed: {completedNum}</li>
            <li>Items not completed: {uncompletedNum}</li>
            <li>Percent completed: {formattedPercentCompleted}</li>
        </ul>
    );
}

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
            <TodoListStats />
            <Creator />
            <TodoListFilters />
            {todoList.map((todoItem) => (
                <TodoItem key={todoItem.id} item={todoItem} />
            ))}
        </>
    )
}