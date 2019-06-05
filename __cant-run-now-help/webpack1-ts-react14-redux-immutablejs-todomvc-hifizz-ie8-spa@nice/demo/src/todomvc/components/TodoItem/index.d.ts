/// <reference types="react" />
/**
 * @Component Todo
 * @author < stack fizz ---- huangchaolin@xylink.com >
 */
import * as React from "react";
import { uuid } from "../../types";
export interface ITodoProps {
    key?: any;
    todo: any;
    onToggleCompleted: (id: uuid) => void;
    onDelete: (id: uuid) => void;
    onEdit?: (id: uuid, title: string) => void;
}
export declare class TodoItem extends React.Component<ITodoProps, {}> {
    onDelete: () => void;
    onToggleCompleted: () => void;
    render(): JSX.Element;
}
