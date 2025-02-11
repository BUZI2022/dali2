function Header() {
    return React.createElement(
        'header',
        { 
            'data-name': 'header',
            className: 'header-container'
        },
        React.createElement('div', { className: 'header-overlay' }),
        React.createElement(
            'div',
            { className: 'header-content' },
            React.createElement(
                'h1',
                {
                    'data-name': 'header-title',
                    className: 'header-title'
                },
                '大理'
            ),
            React.createElement(
                'p',
                {
                    'data-name': 'header-subtitle',
                    className: 'header-subtitle'
                },
                '2025.02'
            )
        )
    );
}

window.Header = Header;
