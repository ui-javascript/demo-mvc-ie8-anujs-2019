/**
 * @Component Footer
 * @author < stack fizz ---- huangchaolin@xylink.com >
 */
import * as React from "react";
import { ACTIVE_TODOS, ALL_TODOS, COMPLETED_TODOS } from "../../constance/index";
import { Util } from "../../util";
import * as classNames from "classnames";
import * as style from "./style/index.scss";

export interface IFooterProps {
  activeCount: number;
  completedCount: number;
  nowShowing: string;
  onClearCompleted: () => void;
  onChangeNowShowing: (nowShowing: string) => void;
}

class Footer extends React.Component<IFooterProps, {}> {
  public render() {
    const { completedCount, activeCount, nowShowing } = this.props;
    const buttonAllClass = classNames(nowShowing === ALL_TODOS ? style.active : "");
    const buttonActiveClass = classNames(nowShowing === ACTIVE_TODOS ? style.active : "");
    const buttonCompletedClass = classNames(nowShowing === COMPLETED_TODOS ? style.active : "");

    return (
      <div className={style.footer}>
        <span className={style.count}>
          {activeCount} {Util.pluralize(activeCount, "item")} left
        </span>
        <div className={style.filters}>
          <a
            onClick={() => {
              this.props.onChangeNowShowing(ALL_TODOS);
            }}
            className={buttonAllClass}
          >
            All
          </a>
          <a
            onClick={() => {
              this.props.onChangeNowShowing(ACTIVE_TODOS);
            }}
            className={buttonActiveClass}
          >
            Active
          </a>
          <a
            onClick={() => {
              this.props.onChangeNowShowing(COMPLETED_TODOS);
            }}
            className={buttonCompletedClass}
          >
            Completed
          </a>
        </div>
        {completedCount > 0 && (
          <button className={style.clear} onClick={this.props.onClearCompleted}>
            Clear completed
          </button>
        )}
      </div>
    );
  }
}

export default Footer;
