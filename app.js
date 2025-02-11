function App() {
    return React.createElement(
        'div',
        {
            'data-name': 'app',
            className: 'min-h-screen bg-white'
        },
        React.createElement(Header),
        React.createElement(
            'main',
            { className: 'container mx-auto px-4' },
            React.createElement(PhotoGallery),
            React.createElement(TripMap)
        )
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(React.createElement(App));
