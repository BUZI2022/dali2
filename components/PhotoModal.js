function PhotoModal({ isOpen, onClose, currentPhoto, onPrev, onNext }) {
    if (!isOpen) return null;

    const modalStyle = {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
    };

    const imageContainerStyle = {
        position: 'relative',
        maxWidth: '90vw',
        maxHeight: '90vh',
        margin: '0 auto',
    };

    const imageStyle = {
        maxWidth: '100%',
        maxHeight: '90vh',
        objectFit: 'contain',
    };

    const buttonBaseStyle = {
        position: 'fixed',
        top: '50%',
        transform: 'translateY(-50%)',
        background: 'transparent',
        border: 'none',
        color: 'white',
        fontSize: '2rem',
        cursor: 'pointer',
        padding: '20px',
        transition: 'all 0.3s ease',
        width: '80px',
        height: '80px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    };

    const prevButtonStyle = {
        ...buttonBaseStyle,
        left: '5%',
    };

    const nextButtonStyle = {
        ...buttonBaseStyle,
        right: '5%',
    };

    const closeButtonStyle = {
        position: 'fixed',
        top: '20px',
        right: '20px',
        background: 'transparent',
        border: 'none',
        color: 'white',
        fontSize: '2rem',
        cursor: 'pointer',
        padding: '10px',
        zIndex: 1001,
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Escape') onClose();
        if (e.key === 'ArrowLeft') onPrev(e);
        if (e.key === 'ArrowRight') onNext(e);
    };

    React.useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    return React.createElement(
        'div',
        {
            style: modalStyle,
            onClick: onClose
        },
        [
            React.createElement(
                'button',
                {
                    key: 'close',
                    style: closeButtonStyle,
                    onClick: onClose,
                    'aria-label': '关闭'
                },
                '×'
            ),
            React.createElement(
                'button',
                {
                    key: 'prev',
                    style: prevButtonStyle,
                    onClick: (e) => {
                        e.stopPropagation();
                        onPrev(e);
                    },
                    'aria-label': '上一张'
                },
                React.createElement('i', { className: 'fas fa-chevron-left' })
            ),
            React.createElement(
                'div',
                {
                    key: 'image-container',
                    style: imageContainerStyle,
                    onClick: (e) => e.stopPropagation()
                },
                React.createElement('img', {
                    src: currentPhoto.fullImage || currentPhoto.thumbnail,
                    alt: currentPhoto.name,
                    style: imageStyle
                })
            ),
            React.createElement(
                'button',
                {
                    key: 'next',
                    style: nextButtonStyle,
                    onClick: (e) => {
                        e.stopPropagation();
                        onNext(e);
                    },
                    'aria-label': '下一张'
                },
                React.createElement('i', { className: 'fas fa-chevron-right' })
            )
        ]
    );
}

window.PhotoModal = PhotoModal;
