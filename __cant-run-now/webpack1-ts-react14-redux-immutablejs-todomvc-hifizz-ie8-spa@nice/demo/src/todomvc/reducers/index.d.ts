import { ITodo, ITodoList } from "../types";
import { Action, Reducer } from "redux";
import { OrderedMap } from "immutable";
import { ICompleteTodoAction, IDeleteTodo, ITodoAction } from "../actions/index";
export declare function todos(state: OrderedMap<string, ITodo> | undefined, action: ITodoAction | IDeleteTodo | ICompleteTodoAction): ITodoList;
export declare function nowShowing(state: string | undefined, action: Action): string;
declare const _default: Reducer<{}>;
export default _default;
