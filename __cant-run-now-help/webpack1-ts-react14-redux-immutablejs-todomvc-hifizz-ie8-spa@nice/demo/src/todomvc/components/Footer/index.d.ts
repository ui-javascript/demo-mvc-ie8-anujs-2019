/// <reference types="react" />
/**
 * @Component Footer
 * @author < stack fizz ---- huangchaolin@xylink.com >
 */
import * as React from "react";
export interface IFooterProps {
    activeCount: number;
    completedCount: number;
    nowShowing: string;
    onClearCompleted: () => void;
    onChangeNowShowing: (nowShowing: string) => void;
}
declare class Footer extends React.Component<IFooterProps, {}> {
    render(): JSX.Element;
}
export default Footer;
