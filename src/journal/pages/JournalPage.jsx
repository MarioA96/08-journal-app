// import { Typography } from '@mui/material';
import { IconButton } from '@mui/material';
import { AddOutlined } from '@mui/icons-material';

import { JournalLayout } from '../layout/JournalLayout';
import { NothingSelectedView, NoteView } from '../views';

export const JournalPage = () => {
    return (
        <JournalLayout>

            {/* <Typography>In consectetur ex sit consequat laborum pariatur. Laboris duis elit Lorem magna. Est nulla laboris ex incididunt excepteur anim exercitation mollit irure. Elit id cillum ex eu amet. Consequat est deserunt dolor sit laborum eu aliqua ea eiusmod esse reprehenderit anim. Quis ex enim eu dolor culpa pariatur. Anim tempor laboris Lorem laborum est reprehenderit eiusmod cillum.</Typography> */}
        
            <NothingSelectedView />

            {/* <NoteView /> */}

            <IconButton
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
