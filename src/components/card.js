import { jsx as _jsx } from "react/jsx-runtime";
export const Card = ({ children, className = "" }) => {
    return (_jsx("div", { className: `bg-white rounded-2xl shadow p-4 ${className}`, children: children }));
};
