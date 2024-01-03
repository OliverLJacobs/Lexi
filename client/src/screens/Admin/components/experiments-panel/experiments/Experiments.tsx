import { getExperiments, updateExperimentsStatus } from '@DAL/server-requests/experiments';
import { SnackbarStatus, useSnackbar } from '@contexts/SnackbarProvider';
import useEffectAsync from '@hooks/useEffectAsync';
import { ExperimentType, ModelType } from '@models/AppModels';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import { Dialog, Typography } from '@mui/material';
import { useState } from 'react';
import ExperimentForm from '../ExperimentForm';
import ExperimentsList from '../experiments-list/ExperimentsList';
import { FlexContainer, IconButtonStyled, MainContainerStyled, PointerDiv } from './Experiments.s';

export const Experiments = ({ models }) => {
    const { openSnackbar } = useSnackbar();
    const [experiments, setExperiments] = useState<ExperimentType[]>([]);
    const [isEditMode, setIsEditMode] = useState(false);
    const [isLoadingStatusChange, setIsLoadingStatusChange] = useState(false);
    const [isLoadingExperiments, setIsLoadingExperiments] = useState(true);
    const [tempExperiments, setTempExperiments] = useState<ExperimentType[]>([]);
    const [modifiedExperiments, setModifiedExperiments] = useState<Record<string, ExperimentType>>({});
    const [openExperimentFormDialog, setOpenExperimentFormDialog] = useState(false);
    const [editExperiment, setEditExperiment] = useState<ModelType | undefined>(null);

    useEffectAsync(async () => {
        setIsLoadingExperiments(true);
        try {
            const res = await getExperiments();
            setExperiments(res);
            setTempExperiments(res);
        } catch (error) {
            openSnackbar('Failed to load experiments', SnackbarStatus.ERROR);
            setExperiments([]);
            setTempExperiments([]);
        }
        setIsLoadingExperiments(false);
    }, []);

    const closeDialog = () => {
        setOpenExperimentFormDialog(false);
        if (editExperiment) {
            setEditExperiment(null);
            setIsEditMode(false);
        }
    };

    const handleStatusChange = (id, newStatus) => {
        setTempExperiments((prev) => prev.map((exp) => (exp._id === id ? { ...exp, isActive: newStatus } : exp)));
        setModifiedExperiments((prev) => {
            const originalStatus = experiments.find((exp) => exp._id === id)?.isActive;
            if (originalStatus === newStatus) {
                const updated = { ...prev };
                delete updated[id];
                return updated;
            } else {
                return { ...prev, [id]: { ...prev[id], id, isActive: newStatus } };
            }
        });
    };

    const handleSaveChanges = async () => {
        setIsLoadingStatusChange(true);
        const updatedExperiments = Object.values(modifiedExperiments);
        try {
            await updateExperimentsStatus(updatedExperiments);
            setExperiments(tempExperiments);
            setModifiedExperiments({});
        } catch {
            openSnackbar('Failed to update experiments status', SnackbarStatus.ERROR);
            setTempExperiments(experiments);
            setModifiedExperiments({});
        }
        setIsLoadingStatusChange(false);
    };

    const handleCancelChanges = () => {
        setTempExperiments(experiments);
        setModifiedExperiments({});
    };

    return (
        <MainContainerStyled>
            <FlexContainer>
                <Typography variant="h4" gutterBottom>
                    Experiments
                </Typography>
                <PointerDiv onClick={() => setOpenExperimentFormDialog(true)}>
                    <AddIcon />
                </PointerDiv>
            </FlexContainer>
            <ExperimentsList
                experiments={tempExperiments}
                modifiedExperiments={modifiedExperiments}
                handleStatusChange={handleStatusChange}
                handleSaveChanges={handleSaveChanges}
                handleCancelChanges={handleCancelChanges}
                isLoadingStatusChange={isLoadingStatusChange}
                setEditExperiment={setEditExperiment}
                setOpenExperimentFormDialog={setOpenExperimentFormDialog}
                setIsEditMode={setIsEditMode}
                isLoadingExperiments={isLoadingExperiments}
            />
            <Dialog open={openExperimentFormDialog} fullWidth>
                <IconButtonStyled aria-label="close" onClick={closeDialog}>
                    <CloseIcon />
                </IconButtonStyled>
                <ExperimentForm
                    editExperiment={editExperiment}
                    tempExperiments={tempExperiments}
                    setTempExperiments={setTempExperiments}
                    models={models}
                    experiments={experiments}
                    setExperiments={setExperiments}
                    closeDialog={closeDialog}
                    isEditMode={isEditMode}
                />
            </Dialog>
        </MainContainerStyled>
    );
};
