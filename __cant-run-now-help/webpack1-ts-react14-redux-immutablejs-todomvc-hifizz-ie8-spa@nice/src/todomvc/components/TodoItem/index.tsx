/**
 * @Component Todo
 * @author < stack fizz ---- huangchaolin@xylink.com >
 */
import * as React from "react";
import * as classNames from "classnames";
import { uuid } from "../../types";
import * as style from "./style/index.scss";

export interface ITodoProps {
  key?: any;
  todo: any; // 用来优化这个item
  onToggleCompleted: (id: uuid) => void;
  onDelete: (id: uuid) => void;
  onEdit?: (id: uuid, title: string) => void;
}

export class TodoItem extends React.Component<ITodoProps, {}> {
  // public shouldComponentUpdate = (nextProps: ITodoProps, nextState: {}): boolean => {
  // const todo = this.props.todo;
  // const same = todo === nextProps.todo;
  // console.log("diff", same);
  // return !same;
  // };

  public onDelete = () => {
    this.props.onDelete(this.props.todo.id);
  };

  public onToggleCompleted = () => {
    this.props.onToggleCompleted(this.props.todo.id);
  };

  public render() {
    const { title, completed } = this.props.todo;
    const itemClass = classNames(style.item, completed && style.completed);
    console.log("render todo", completed);

    return (
      <li className={style.wrap}>
        <div className={itemClass}>
          <input
            type="checkbox"
            checked={completed}
            onClick={this.onToggleCompleted}
            className={style.toggle}
          />
          <div className={style.main}>{title}</div>
          <button className={style.del} onClick={this.onDelete} />
        </div>
        <input type="text" className={style.edit} />
      </li>
    );
  }
}
