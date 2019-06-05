import { ITodo, uuid, ITodoList, ITodoApp } from "../types";
import { combineReducers, Action, Reducer } from "redux";
import { OrderedMap } from "immutable";
import { Util } from "../util";
import { ICompleteTodoAction, IDeleteTodo, ITodoAction } from "../actions/index";
import {
  ACTIVE_TODOS,
  ADD_TODO,
  ALL_TODOS,
  CLEAR_COMPLETED_TODO,
  COMPLETED_TODOS,
  DELETE_TODO,
  TOGGLE_COMPLETED_TODO,
  TOGGLE_ALL_TODO
} from "../constance/index";

const TodoOrderedMap = OrderedMap<uuid, ITodo>();

export function todos(
  state: ITodoList = TodoOrderedMap,
  action: ITodoAction | IDeleteTodo | ICompleteTodoAction
): ITodoList {
  switch (action.type) {
    case ADD_TODO:
      const newTodoID: uuid = Util.uuid();
      const newTodo: ITodo = {
        id: newTodoID,
        title: (action as ITodoAction).title,
        completed: (action as ITodoAction).completed
      };
      return state.set(newTodoID, newTodo);

    case TOGGLE_COMPLETED_TODO:
      return state.update((action as ICompleteTodoAction).id, (item: ITodo): ITodo => {
        const completed = item.completed;
        return {
          id: item.id,
          title: item.title,
          completed: !completed
        };
      });

    case TOGGLE_ALL_TODO:
      const checked: boolean = (action as any).checked;
      const result: any = state.map((item: ITodo): ITodo => {
        item.completed = checked;
        return item;
      }) as ITodoList;
      console.log(result.values().next());
      return result;

    case DELETE_TODO:
      return state.remove((action as ICompleteTodoAction).id);

    case CLEAR_COMPLETED_TODO:
      return state.filter((item: ITodo): boolean => {
        return item.completed !== true;
      }) as ITodoList;
    default:
      return state;
  }
}

export function nowShowing(state: string = ALL_TODOS, action: Action) {
  switch (action.type) {
    case ALL_TODOS:
      return (state = ALL_TODOS);
    case COMPLETED_TODOS:
      return (state = COMPLETED_TODOS);
    case ACTIVE_TODOS:
      return (state = ACTIVE_TODOS);
    default:
      return state;
  }
}

export default combineReducers({
  todos,
  nowShowing
});
