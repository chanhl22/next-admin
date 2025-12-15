import { confirmDialog } from 'primereact/confirmdialog';

export const ComAlert = ({
                             event = null,
                             msgJsx,
                             acceptLabel = '확인',
                             acceptFnc = null
                         }) => {

    confirmDialog({
        trigger: (event ? event.currentTarget : null),
        message: msgJsx,
        acceptLabel,
        rejectClassName: 'hidden',
        closeOnEscape: false, // ESC키 비활성화
        accept: () => {
            if (acceptFnc != null) acceptFnc();
        },
        pt: {
            closeButton: {className: 'hidden'},
            content: {className: 'flex justify-content-center text-center'},
            footer: {className: 'flex justify-content-center'},
        },
    });
};

export const ComConfirm = ({
                               event = null,
                               msgJsx,
                               acceptLabel = '확인',
                               rejectLabel = '취소',
                               acceptFnc = null,
                               rejectFnc = null
                           }) => {

    confirmDialog({
        trigger: (event ? event.currentTarget : null),
        message: msgJsx,
        acceptLabel,
        rejectLabel,
        closeOnEscape: false, // ESC키 비활성화
        accept: () => {
            if (acceptFnc != null) acceptFnc();
        },
        reject: () => {
            if (rejectFnc != null) rejectFnc();
        },
        pt: {
            closeButton: {className: 'hidden'},
            content: {className: 'flex justify-content-center text-center'},
            footer: {className: 'flex justify-content-center'},
        },
    });
};