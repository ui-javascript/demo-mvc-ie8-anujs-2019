import { Action } from "redux";
import { ITodo, TUUID, uuid } from "../types";
import {
  ALL_TODOS,
  COMPLETED_TODOS,
  ACTIVE_TODOS,
  ADD_TODO,
  TOGGLE_COMPLETED_TODO,
  CLEAR_COMPLETED_TODO,
  EDIT_TODO,
  DELETE_TODO,
  CHANGENOWSHOWINGFILTER,
  TOGGLE_ALL_TODO
} from "../constance/index";

export interface ITodo {
  id: string;
  text: string;
  completed: boolean;
}

export interface ITodoAction extends Action {
  title: string;
  completed: boolean;
}
export function addTodo(title: string): ITodoAction {
  return { type: ADD_TODO, title, completed: false };
}

export interface ICompleteTodoAction extends Action {
  id: string;
}
export function completeTodo(id: TUUID): ICompleteTodoAction {
  return { type: TOGGLE_COMPLETED_TODO, id };
}

export function clearCompletedTodo(): Action {
  return { type: CLEAR_COMPLETED_TODO };
}

export interface IDeleteTodo extends Action {
  id: uuid;
}
export function deleteTodo(id: uuid): IDeleteTodo {
  return { type: DELETE_TODO, id };
}

export interface IEditTodo extends Action {
  id: uuid;
  title: string;
}
export function editTodo(id: uuid, title: string): IEditTodo {
  return { type: EDIT_TODO, id, title };
}

export function changeNowShowing(nowShowing: string) {
  return { type: CHANGENOWSHOWINGFILTER, nowShowing };
}

export interface IToggleAll extends Action {
  checked: boolean;
}
export function toggleAll(checked: boolean): IToggleAll {
  return { type: TOGGLE_ALL_TODO, checked };
}
