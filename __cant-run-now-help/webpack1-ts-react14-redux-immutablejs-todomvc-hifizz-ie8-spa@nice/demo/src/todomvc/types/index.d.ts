import { OrderedMap } from "immutable";
export declare type ITodoUUID = string;
export declare type TUUID = string;
export declare type uuid = string;
export interface ITodo {
    id: ITodoUUID;
    title: string;
    completed: boolean;
}
export interface ITodoApp {
    todos: ITodoList;
    nowShowing: string;
}
export declare type ITodoList = OrderedMap<uuid, ITodo>;
