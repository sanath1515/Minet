import React from 'react';
import Typography from '../../atoms/typography';
import theme from '../../../theme';
import { Card } from '../card';
import { Box, TypographyProps } from '@mui/material';

export interface PortFolioValueProps {
    text: string;
    value: string;
    variant: TypographyProps['variant'];
    src?: string;
    alt?: string;
    percentValue?: string;
    bool: boolean;
    textColor?:string;
}

export const PortFolioValue = ({
    text,
    value,
    variant,
    src,
    alt,
    percentValue,
    bool,
    textColor
}: PortFolioValueProps) => {
    const renderTypography = (
        text: string,
        variant: TypographyProps['variant'],
        color?: string
    ) => {
        return (
            <Typography variant={variant} color={color}>
                {text}
            </Typography>
        );
    };
    const hignEmphasis = theme.palette.minetText.highEmphasis;
    const mediumEmphasis = theme.palette.minetText.mediumEmphasis;
    return (
        <>
            {bool ? (
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: theme.spacing(2)
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            gap: theme.spacing(2.5)
                        }}
                    >
                        {renderTypography(text, 'caption1', mediumEmphasis)}

                        <Card
                            src={src}
                            alt={alt}
                            mainText={percentValue}
                            layout={'iconText'}
                            sx={{ mainText: textColor}}
                            mainVariant="overline"
                        />
                    </Box>
                    {renderTypography(value, variant, hignEmphasis)}
                </Box>
            ) : (
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: theme.spacing(1.2)
                    }}
                >
                    {renderTypography(text, 'caption1', mediumEmphasis)}
                    {renderTypography(value, variant, hignEmphasis)}
                </Box>
            )}
        </>
    );
};
