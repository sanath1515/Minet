import React from 'react';

export interface MuiIconProps {
    src?: string;
    alt?: string;
    style?: React.CSSProperties | object;
    onClick?: React.MouseEventHandler<HTMLDivElement>;
}

const MuiIcon = ({ style, ...props }: MuiIconProps) => {
    return <img {...props} style={{ cursor: 'pointer', ...style }} />;
};

export default MuiIcon;
