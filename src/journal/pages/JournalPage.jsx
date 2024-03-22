// import { Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import { IconButton } from '@mui/material';
import { AddOutlined } from '@mui/icons-material';

import { JournalLayout } from '../layout/JournalLayout';
import { NothingSelectedView, NoteView } from '../views';
import { startNewNote } from '../../store/journal/thunks';

export const JournalPage = () => {

    const dispatch = useDispatch();

    const onClickNewNote = () => {
        
        dispatch( startNewNote() );

    };

    const { isSaving, active } = useSelector( state => state.journal );

    return (
        <JournalLayout>

            {/* No tenemos ninguna nota activa */}
            {/* <NothingSelectedView /> */}
            {/* Si tenemos alguna nota activa */}
            {/* <NoteView /> */}
            {
                (!!active) 
                    ? <NoteView /> 
                    : <NothingSelectedView />
            }

            <IconButton
                disabled={ isSaving }
                onClick={ onClickNewNote }
                size='large'
                sx={{
                    color: 'white',
                    backgroundColor: 'error.main',
                    ':hover': { backgroundColor: 'error.main', opacity: 0.7 },
                    position: 'fixed',
                    right: 50,
                    bottom: 50,
                }}
            >
                <AddOutlined sx={{ fontSize: 30 }}/>
            </IconButton>

        </JournalLayout>
    )
};
