import React from 'react';
import { ContextualSaveBar } from '@shopify/app-bridge-react';

const CommonSaveBar = ({ visible, loading, handleSave, handleDiscard }) => {
    return (
        <ContextualSaveBar saveAction={{ loading, onAction: () => handleSave() }} discardAction={{ onAction: () => handleDiscard() }} visible={visible} id="my-save-bar">
        </ContextualSaveBar>
    );
};

export default CommonSaveBar;
