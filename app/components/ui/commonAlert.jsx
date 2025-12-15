'use client';

import { confirmDialog } from 'primereact/confirmdialog';
import React from 'react';

export const showAlert = ({
                              message,
                              acceptLabel = '확인',
                              onAccept,
                              afterClose,
                              afterConfirm,
                          }) => {
    const processedMessage = message
        .split(/\n|<br\s*\/?>/i)
        .map((line, idx) => (
            <React.Fragment key={idx}>
                {line}
                <br />
            </React.Fragment>
        ));

    confirmDialog({
        message: <span>{processedMessage}</span>,
        acceptLabel,
        rejectClassName: 'hidden',
        accept: () => {
            if (onAccept) onAccept();
            if (afterClose) afterClose();
            if (afterConfirm) afterConfirm();
        },
        pt: {
            closeButton: { className: 'hidden' },
            content: { className: 'flex justify-content-center text-center' },
            footer: { className: 'flex justify-content-center' },
        },
    });
};
