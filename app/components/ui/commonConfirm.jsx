'use client';

import { confirmDialog } from 'primereact/confirmdialog';
import React from 'react';

export const showConfirm = ({
                                message,
                                acceptLabel = '확인',
                                rejectLabel = '취소',
                                target,
                                router,
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
        rejectLabel,
        accept: async () => {
            try {
                if (typeof target === 'function') {
                    await target();
                }

                else if (typeof target === 'string') {
                    await router?.push(target);
                }

                if (afterConfirm) {
                    afterConfirm();
                }
            } catch (err) {
                console.error('확인 처리 중 오류:', err);
            }
        },
        reject: () => {
        },
        pt: {
            closeButton: { className: 'hidden' },
            content: { className: 'flex justify-content-center text-center' },
            footer: { className: 'flex justify-content-center' },
        },
    });
};
