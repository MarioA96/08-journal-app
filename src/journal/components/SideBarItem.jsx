import { useMemo } from 'react';

import { useDispatch } from 'react-redux';
import { setActiveNote } from '../../store/journal';

import { 
    ListItem, 
    ListItemButton, 
    ListItemIcon,
    ListItemText,
    Grid 
} from '@mui/material';
import { TurnedInNot } from '@mui/icons-material';


export const SideBarItem = ({ title = '', body, id, date, imageUrls = [] }) => {

    const newTitle = useMemo( () => {
        return title.length > 17
            ? title.substring( 0, 17 ) + '...'
            : title;
    }, [ title ] );

    const dispatch = useDispatch();

    const onClickNote = () => {
        dispatch( setActiveNote({ id, title, body, date, imageUrls }) );
    };

    return (
        <ListItem disablePadding>
            <ListItemButton
                onClick={ onClickNote }
            >
                <ListItemIcon>
                    <TurnedInNot />
                </ListItemIcon>
                <Grid container>
                    <ListItemText primary={ newTitle } />
                    <ListItemText secondary={ body } />
                </Grid>
            </ListItemButton>
        </ListItem>
    )
};

