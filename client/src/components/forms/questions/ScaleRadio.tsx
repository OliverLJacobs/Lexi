import { FormControlLabel, Grid, Radio, RadioGroup, Typography, useMediaQuery } from '@mui/material';
import { Box } from '@mui/system';
import theme from '@root/Theme';
import { getFormErrorMessage } from '@utils/commonFunctions';
import { Control, Controller, FieldErrors, FieldValues } from 'react-hook-form';

interface ScaleRadioProps {
    label?: string;
    left: string;
    right: string;
    range: number;
    field: string;
    gap: string;
    control: Control<FieldValues>;
    errors: FieldErrors;
}

const ScaleRadio: React.FC<ScaleRadioProps> = ({
    label,
    left,
    right,
    range,
    field,
    gap = '16px',
    control,
    errors,
}) => {
    const valuesArray = Array.from({ length: range }, (_, i) => i + 1);
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const mobileRadioBtnStyle = {
        padding: '3px',
        '& .MuiSvgIcon-root': {
            padding: 0,
            margin: 0,
            fontSize: '1rem',
        },
    };

    return (
        <Box>
            <Typography style={{ color: 'grey', marginBottom: '8px', borderBottom: '1px solid grey' }}>
                {label}
            </Typography>
            <Box key={left} style={{ display: 'flex' }}>
                <Grid item xs={2} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Typography textAlign={'left'} color={'grey'}>
                        {left}
                    </Typography>
                </Grid>
                <Grid
                    item
                    xs={8}
                    style={{
                        borderLeft: '1px solid #D3D3D3',
                        borderRight: '1px solid #D3D3D3',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <Controller
                        name={field}
                        control={control}
                        rules={{ required: 'This field is required' }}
                        render={({ field: { onChange, value } }) => (
                            <RadioGroup
                                row
                                value={value}
                                onChange={onChange}
                                aria-label={field}
                                name={field}
                                sx={{ gap }}
                            >
                                {valuesArray.map((val) => (
                                    <FormControlLabel
                                        key={val}
                                        value={String(val)}
                                        sx={{ margin: 0 }}
                                        control={<Radio size="small" sx={isMobile && mobileRadioBtnStyle} />}
                                        label=""
                                    />
                                ))}
                            </RadioGroup>
                        )}
                    />
                </Grid>
                <Grid item xs={2} display={'flex'} justifyContent={'center'} alignItems={'center'}>
                    <Typography textAlign={'right'} color={'grey'}>
                        {right}
                    </Typography>
                </Grid>
            </Box>
            {errors[field] && (
                <Typography color="error" variant="caption">
                    {getFormErrorMessage(errors[field])}
                </Typography>
            )}
        </Box>
    );
};

export default ScaleRadio;
