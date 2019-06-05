import { OrderedMap } from "immutable";

export type ITodoUUID = string;
export type TUUID = string;

export type uuid = string;

export interface ITodo {
  id: ITodoUUID;
  title: string;
  completed: boolean;
}

export interface ITodoApp {
  todos: ITodoList;
  nowShowing: string;
}

export type ITodoList = OrderedMap<uuid, ITodo>;
