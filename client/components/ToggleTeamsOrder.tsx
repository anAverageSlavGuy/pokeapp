import * as React from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';


type Props = {
    callBack: (state: string) => void;
}

export default function ToggleTeamsOrder({ callBack }: Props) {
    const [order, setOrder] = React.useState<string>('desc');

    const handleAlignment = (
        event: React.MouseEvent<HTMLElement>,
        newOrder: string,
    ) => {
        console.log(newOrder)
        newOrder && callBack(newOrder);
        setOrder(newOrder);
    };

    return (
        <ToggleButtonGroup
            value={order}
            exclusive
            onChange={handleAlignment}
            aria-label="team order"
            sx={{margin: '8px'}}
        >
            <ToggleButton value="desc" aria-label="desc">
                <ExpandLessIcon />
            </ToggleButton>
            <ToggleButton value="asc" aria-label="asc">
                <ExpandMoreIcon />
            </ToggleButton>
        </ToggleButtonGroup>
    );
}
