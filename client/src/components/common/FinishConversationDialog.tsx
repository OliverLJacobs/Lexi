import { useExperimentId } from '@hooks/useExperimentId';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    useMediaQuery,
} from '@mui/material';
import theme from '@root/Theme';
import { useState } from 'react';
import { finishConversation } from '../../DAL/server-requests/conversations';
import useActiveUser from '../../hooks/useActiveUser';
import { useConversationId } from '../../hooks/useConversationId';
import { ConversationForm } from '../forms/conversation-form/ConversationForm';

const FinishConversationDialog = ({ open, setIsOpen, questionnaireLink, form }) => {
    const [page, setPage] = useState(1);
    const { activeUser } = useActiveUser();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const experimentId = useExperimentId();
    const conversationId = useConversationId();
    // const navigate = useNavigate();

    const handleYes = () => {
        if (form) {
            setPage(2);
        } else if (questionnaireLink) {
            setPage(3);
        } else {
            handleDone();
        }
    };

    const handleNo = () => setIsOpen(false);

    const handleDone = () => {
        // navigate(`${Pages.EXPERIMENT.replace(':experimentId', experimentId)}`);
        // setIsOpen(false);
        console.log('Finish Conversation');
    };

    const handleDoneSurvey = async () => {
        if (questionnaireLink) {
            setPage(3);
        } else {
            handleDone();
        }
        try {
            await finishConversation(conversationId, experimentId, activeUser.isAdmin);
        } catch (error) {
            console.error('Failed to finish conversation');
        }
    };

    return (
        <Dialog open={open} maxWidth={'lg'} fullScreen={isMobile && page > 1}>
            {page === 1 ? (
                <>
                    <DialogContent>
                        <DialogContentText color={'black'}>
                            Are you sure you want to finish the conversation?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleNo}>No</Button>
                        <Button onClick={handleYes} autoFocus>
                            Yes
                        </Button>
                    </DialogActions>
                </>
            ) : page === 2 && form ? (
                <ConversationForm form={form} isPreConversation={false} handleDone={handleDoneSurvey} />
            ) : page === 3 || (!form && questionnaireLink) ? (
                <>
                    <DialogTitle>Thank you for completing the conversation</DialogTitle>
                    <DialogContent>
                        <DialogContentText color={'black'}>
                            Your username is <b>{activeUser.username}</b>, continue with it in the rest of the
                            study.
                        </DialogContentText>
                        {/* <a href={questionnaireLink} target="_blank" rel="noopener noreferrer">
                            {questionnaireLink}
                        </a> */}
                    </DialogContent>
                    {/* <DialogActions>
                        <Button onClick={handleDone}>Done</Button>
                    </DialogActions> */}
                </>
            ) : null}
        </Dialog>
    );
};

export default FinishConversationDialog;
