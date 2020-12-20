import {createContext} from 'react'

const noop = () => {}

export const ListContext = createContext({
    list: [],
    onValue: noop,
})