import { memo } from "react";

export const withReactMemo = (Component) =>
  memo((props) => {
    return <Component {...props} />;
  });
