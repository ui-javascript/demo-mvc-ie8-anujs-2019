import * as React from "react";
import { connect, Dispatch } from "react-redux";
import Footer from "../Footer";
import { TodoItem } from "../TodoItem";
import * as style from "./style/index.scss";
import {
  addTodo,
  changeNowShowing,
  clearCompletedTodo,
  completeTodo,
  deleteTodo,
  editTodo,
  toggleAll
} from "../../actions";
import { ACTIVE_TODOS, ALL_TODOS, COMPLETED_TODOS } from "../../constance/index";
import { ITodo, ITodoApp, ITodoList, uuid } from "../../types";

interface IAppComponentStateProps {
  todos: ITodoList;
  nowShowing: string;
}

interface IAppComponentDispatchProps {
  onAddTodo: (title: string) => void;
  onDeleteTodo: (id: uuid) => void;
  onTodoEdit: (id: uuid, title: string) => void;
  toggleTodoCompleted: (id: uuid) => void;
  onClearCompleted: () => void;
  onChangeNowShowing: (nowShowing: string) => void;
  onToggleAll: (event: any) => void;
}

type IAppComponentProps = IAppComponentStateProps & IAppComponentDispatchProps;

interface IAppComponentState {
  nowShowing: string;
}

const mapStateToProps = (state: ITodoApp): IAppComponentStateProps => {
  return {
    nowShowing: state.nowShowing,
    todos: state.todos
  };
};

const mapDispatchToProps = (dispatch: Dispatch<any>): IAppComponentDispatchProps => {
  return {
    onAddTodo: (title: string) => {
      dispatch(addTodo(title));
    },
    onClearCompleted: () => {
      dispatch(clearCompletedTodo());
    },
    onChangeNowShowing: (nowShowing: string) => {
      dispatch(changeNowShowing(nowShowing));
    },
    onDeleteTodo: (id: uuid) => {
      dispatch(deleteTodo(id));
    },
    onTodoEdit: (id: uuid, title: string) => {
      dispatch(editTodo(id, title));
    },
    onToggleAll: (event: any) => {
      const checked = event.target.checked;
      dispatch(toggleAll(checked));
    },
    toggleTodoCompleted: (id: uuid) => {
      dispatch(completeTodo(id));
    }
  };
};

class AppComponent extends React.Component<IAppComponentProps, IAppComponentState> {
  constructor(props: IAppComponentProps) {
    super(props);
    this.state = {
      nowShowing: ALL_TODOS
    };
  }

  public render(): JSX.Element {
    const {
      todos,
      toggleTodoCompleted,
      onDeleteTodo,
      onTodoEdit,
      onClearCompleted,
      onToggleAll
    } = this.props;

    let main = null;
    const todoItems: Array<{}> = [];
    let footer = null;
    let completedCount: number;
    let activeCount: number;
    let shownTodos;

    activeCount = todos.reduce<number>((accum: number, todo: ITodo) => {
      console.log(todo);
      return (todo.completed ? accum : accum + 1) as number;
    }, 0);

    completedCount = todos.size - activeCount;

    // 得到过滤后的 todos 数组
    shownTodos = todos.filter((todo: ITodo) => {
      switch (this.state.nowShowing) {
        case ALL_TODOS:
          return true;
        case COMPLETED_TODOS:
          return todo.completed;
        case ACTIVE_TODOS:
          return !todo.completed;
        default:
          return true;
      }
    });

    shownTodos.forEach((todo: ITodo) => {
      todoItems.push(
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggleCompleted={toggleTodoCompleted}
          onDelete={onDeleteTodo}
          onEdit={onTodoEdit}
        />
      );
    });

    if (todos.size > 0) {
      main = (
        <div className={style.main}>
          <input
            type="checkbox"
            className={style.toggleAll}
            checked={activeCount <= 0}
            onChange={onToggleAll}
          />
          <ul className={style.list}>{todoItems}</ul>
        </div>
      );
    }

    if (activeCount || completedCount) {
      footer = (
        <Footer
          nowShowing={this.state.nowShowing}
          activeCount={activeCount}
          completedCount={completedCount}
          onClearCompleted={onClearCompleted}
          onChangeNowShowing={this.onChangeNowShowing}
        />
      );
    }

    return (
      <div className={style.wrap}>
        <div className={style.header}>
          <input
            className={style.todoInput}
            ref="todoInput"
            type="text"
            placeholder="What needs to be done? "
            onKeyPress={this.onEnterKey}
          />
        </div>
        {main}
        {footer}
      </div>
    );
  }

  public onChangeNowShowing = (nowShowing: string): void => {
    this.setState({
      nowShowing
    });
  };

  public enter = (event: React.MouseEvent<{}>) => {
    event.preventDefault();
    const todoInput: any = this.refs.todoInput;
    const value = todoInput.value;
    if (value) {
      this.props.onAddTodo(value);
      alert(value);
      todoInput.value = "";
    }
  };

  public onEnterKey = (event: React.KeyboardEvent<{}>) => {
    if (event.which === 13) {
      event.preventDefault();
      const todoInput: any = this.refs.todoInput;
      const value = todoInput.value;
      if (value) {
        this.props.onAddTodo(value);
        todoInput.value = "";
      }
    }
  };
}

// 这里可以理解为暴露一个不带任何属性的组件
export default connect(mapStateToProps, mapDispatchToProps)(AppComponent) as any;
