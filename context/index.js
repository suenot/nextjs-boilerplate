import React from 'react'



export function contextInit(this_) {
	return {
		removeTodo: () => {
			return 'removeTodo'
		},
		toggleTodo: () => {
			return 'toggleTodo'
		},
	}
}


export const Context = React.createContext()
export default () => {
	return true;
}
