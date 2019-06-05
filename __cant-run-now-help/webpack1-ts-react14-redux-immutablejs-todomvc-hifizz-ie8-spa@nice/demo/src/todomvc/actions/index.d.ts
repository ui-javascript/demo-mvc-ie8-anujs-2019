import { Action } from "redux";
import { TUUID, uuid } from "../types";
export interface ITodo {
    id: string;
    text: string;
    completed: boolean;
}
export interface ITodoAction extends Action {
    title: string;
    completed: boolean;
}
export declare function addTodo(title: string): ITodoAction;
export interface ICompleteTodoAction extends Action {
    id: string;
}
export declare function completeTodo(id: TUUID): ICompleteTodoAction;
export declare function clearCompletedTodo(): Action;
export interface IDeleteTodo extends Action {
    id: uuid;
}
export declare function deleteTodo(id: uuid): IDeleteTodo;
export interface IEditTodo extends Action {
    id: uuid;
    title: string;
}
export declare function editTodo(id: uuid, title: string): IEditTodo;
export declare function changeNowShowing(nowShowing: string): {
    type: string;
    nowShowing: string;
};
export interface IToggleAll extends Action {
    checked: boolean;
}
export declare function toggleAll(checked: boolean): IToggleAll;
