const locations = window.tripData?.locations || [];

function TripMap() {
    const mapContainerRef = React.useRef(null);
    const [isLoading, setIsLoading] = React.useState(true);
    const mapRef = React.useRef(null);

    React.useEffect(() => {
        if (!window.L) {
            console.error('Leaflet is not loaded');
            return;
        }

        const map = L.map(mapContainerRef.current);
        
        // 使用 OpenStreetMap 瓦片图层
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: ' OpenStreetMap contributors'
        }).addTo(map);

        // 收集所有坐标点以计算边界
        const bounds = L.latLngBounds(locations.map(loc => [loc.coordinates[1], loc.coordinates[0]]));
        map.fitBounds(bounds, {
            padding: [50, 50] // 添加一些内边距确保所有点都可见
        });

        // 添加标记点
        const markers = [];
        locations.forEach(location => {
            // 创建自定义标记点
            const markerIcon = L.divIcon({
                className: 'custom-marker',
                html: '<div class="marker-dot"></div>',
                iconSize: [20, 20],       // 增大图标尺寸
                iconAnchor: [10, 10],     // 调整锚点到中心
                popupAnchor: [0, -15]     // 调整弹出框位置
            });

            // 创建标记点
            const marker = L.marker([location.coordinates[1], location.coordinates[0]], {
                icon: markerIcon,
                zIndexOffset: 1000        // 确保标记点显示在线条上方
            }).addTo(map);

            markers.push({
                name: location.name,
                marker: marker,
                latlng: [location.coordinates[1], location.coordinates[0]]
            });

            // 创建弹出窗口
            const popupContent = `
                <div class="map-popup">
                    <img src="${location.previewImage}" 
                         alt="${location.name}" 
                         style="width: 280px; height: 180px; object-fit: cover; border-radius: 8px;" />
                    <h3>${location.name}</h3>
                </div>
            `;

            const popup = L.popup({
                maxWidth: 300,
                className: 'custom-popup',
                closeButton: false,
                offset: [0, -10],
                autoPan: false,
                keepInView: false
            }).setContent(popupContent);

            // 鼠标悬停时显示弹出窗口
            marker.on('mouseover', function() {
                this.bindPopup(popup).openPopup();
            });

            // 鼠标移出时关闭弹出窗口
            marker.on('mouseout', function() {
                this.closePopup();
            });
        });

        // 定义连线顺序
        const routeOrder = [
            "感通索道",
            "大理古城",
            "崇邑村",
            "洱海龙湾",
            "理想邦"
        ];

        // 添加按顺序连接的线条
        for (let i = 0; i < routeOrder.length - 1; i++) {
            const currentMarker = markers.find(m => m.name === routeOrder[i]);
            const nextMarker = markers.find(m => m.name === routeOrder[i + 1]);
            
            if (currentMarker && nextMarker) {
                L.polyline([
                    currentMarker.latlng,
                    nextMarker.latlng
                ], {
                    color: '#2196F3',
                    weight: 3,            // 增加线条宽度
                    opacity: 0.8,         // 略微降低不透明度
                    dashArray: '8, 12',   // 调整虚线间距
                    smoothFactor: 1,
                    zIndex: 1             // 确保线条在标记点下方
                }).addTo(map);
            }
        }

        // 添加CSS样式
        const style = document.createElement('style');
        style.textContent = `
            .marker-dot {
                width: 20px;
                height: 20px;
                background-color: #2196F3;
                border: 3px solid white;
                border-radius: 50%;
                box-shadow: 0 0 6px rgba(0,0,0,0.4);
                position: relative;
                z-index: 1000;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            .custom-marker {
                background: none !important;
                border: none !important;
            }
            .leaflet-div-icon {
                background: none !important;
                border: none !important;
            }
            .leaflet-marker-icon {
                background: none !important;
                border: none !important;
            }
            .leaflet-popup {
                margin-bottom: 5px;
            }
        `;
        document.head.appendChild(style);

        mapRef.current = map;
        setIsLoading(false);

        return () => {
            map.remove();
        };
    }, []);

    return React.createElement(
        'section',
        {
            className: 'my-12'
        },
        React.createElement(
            'h2',
            {
                className: 'section-title',
            },
            '足迹图'
        ),
        React.createElement(
            'div',
            {
                className: 'relative my-8 mx-auto map-container',
                style: {
                    height: '700px',
                    width: '85%',
                    maxWidth: '1400px',
                    borderRadius: '12px',
                    overflow: 'hidden'
                }
            },
            React.createElement(
                'div',
                {
                    ref: mapContainerRef,
                    className: 'absolute inset-0'
                }
            ),
            isLoading && React.createElement(
                'div',
                {
                    className: 'absolute inset-0 flex items-center justify-center bg-white bg-opacity-75 z-[1000]'
                },
                React.createElement(
                    'div',
                    {
                        className: 'text-gray-600'
                    },
                    '加载地图中...'
                )
            )
        )
    );
}

window.TripMap = TripMap;
