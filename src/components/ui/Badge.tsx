import React from "react";
type TBadgeProps = {
  children: React.ReactNode;
};
function Badge({ children }: TBadgeProps) {
  return <div className="badge">{children}</div>;
}

export default Badge;
