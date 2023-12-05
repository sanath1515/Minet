import React from 'react';
import {
    Avatar as MuiAvatar,
    AvatarProps as MuiAvatarProps
} from '@mui/material';

export interface AvatarProps extends MuiAvatarProps {
    src?: string;
}

export const Avatar = ({ src, ...props }: AvatarProps) => {
    return <MuiAvatar src={src} {...props} />;
};

