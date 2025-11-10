// 全局变量存储图表状态
let currentChartStates = {
    bookChart: {
        region1: [1200, 2400, 1800, 2200, 1600],
        region2: [1050, 2100, 1300, 1600, 1340],
        colors: ['#FFCC00', '#B0C4DE']
    },
    exchangeChart: {
        style: 'solid',
        animation: false
    },
    salesChart: {
        marker: 'diamond',
        color: '#1f77b4'
    },
    temperatureChart: {
        fontStyle: 'normal',
        fontSize: 12
    },
    snowflakeChart: {
        iterations: 2,
        color: '#ff6b6b'
    }
};

// 页面加载完成后初始化所有图表
document.addEventListener('DOMContentLoaded', function() {
    initializeAllCharts();
    setupEventListeners();
});

// 初始化所有图表
function initializeAllCharts() {
    createBookChart();
    createExchangeChart();
    createSalesChart();
    createTemperatureChart();
    createSnowflakeChart();
}

// 设置事件监听器
function setupEventListeners() {
    // 汇率图表动画速度控制
    document.getElementById('animation-speed').addEventListener('input', function(e) {
        updateExchangeAnimation();
    });

    // 温度图表字体大小控制
    document.getElementById('font-size').addEventListener('input', function(e) {
        currentChartStates.temperatureChart.fontSize = parseInt(e.target.value);
        updateTemperatureChart();
    });

    // 雪花图表迭代次数控制
    document.getElementById('iteration-slider').addEventListener('input', function(e) {
        currentChartStates.snowflakeChart.iterations = parseInt(e.target.value);
        updateSnowflakeChart();
    });

    // 图表卡片点击效果
    document.querySelectorAll('.chart-card').forEach(card => {
        card.addEventListener('click', function() {
            document.querySelectorAll('.chart-card').forEach(c => c.classList.remove('active'));
            this.classList.add('active');
        });
    });
}

// 实例1：图书采购情况图表
function createBookChart() {
    const categories = ['家庭', '小说', '心理', '科技', '儿童'];
    const data = [
        {
            x: categories,
            y: currentChartStates.bookChart.region1,
            type: 'bar',
            name: '地区1',
            marker: { color: currentChartStates.bookChart.colors[0] }
        },
        {
            x: categories,
            y: currentChartStates.bookChart.region2,
            type: 'bar',
            name: '地区2',
            marker: { color: currentChartStates.bookChart.colors[1] }
        }
    ];

    const layout = {
        title: '图书采购情况对比',
        xaxis: { title: '图书种类' },
        yaxis: { title: '采购数量(本)' },
        barmode: 'group'
    };

    Plotly.newPlot('book-chart', data, layout, { responsive: true });
}

// 更新图书采购图表
function updateBookChart(type) {
    if (type === 'region1') {
        currentChartStates.bookChart.region1 = currentChartStates.bookChart.region1.map(val => val * 1.1);
    } else if (type === 'region2') {
        currentChartStates.bookChart.region2 = currentChartStates.bookChart.region2.map(val => val * 1.1);
    }
    createBookChart();
}

// 重置图书采购图表
function resetBookChart() {
    currentChartStates.bookChart.region1 = [1200, 2400, 1800, 2200, 1600];
    currentChartStates.bookChart.region2 = [1050, 2100, 1300, 1600, 1340];
    createBookChart();
}

// 应用自定义数据
function updateCustomData() {
    const region1Input = document.getElementById('region1-data').value;
    const region2Input = document.getElementById('region2-data').value;
    
    try {
        currentChartStates.bookChart.region1 = region1Input.split(',').map(Number);
        currentChartStates.bookChart.region2 = region2Input.split(',').map(Number);
        createBookChart();
    } catch (error) {
        alert('请输入有效的数字数据，用逗号分隔');
    }
}

// 实例2：汇率走势图表
function createExchangeChart() {
    const dates = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 17, 18, 19, 24, 25, 26, 31];
    const eurcny2017 = [6.8007, 6.8007, 6.8015, 6.8015, 6.8060, 6.8060, 6.8060, 6.8036, 6.8025, 6.7877, 6.7835, 6.7758, 6.7700, 6.7463, 6.7519, 6.7511, 6.7511, 6.7539, 6.7265];
    const eurcny2019 = [6.8640, 6.8705, 6.8697, 6.8697, 6.8697, 6.8881, 6.8853, 6.8856, 6.8677, 6.8662, 6.8662, 6.8662, 6.8827, 6.8761, 6.8635, 6.8860, 6.8737, 6.8796, 6.8841];

    const lineStyle = currentChartStates.exchangeChart.style;
    
    const data = [
        {
            x: dates,
            y: eurcny2017,
            type: 'scatter',
            mode: 'lines+markers',
            name: '2017年7月',
            line: { 
                color: '#006374',
                dash: lineStyle === 'solid' ? 'solid' : lineStyle === 'dashed' ? 'dash' : 'dot',
                width: 2
            }
        },
        {
            x: dates,
            y: eurcny2019,
            type: 'scatter',
            mode: 'lines+markers',
            name: '2019年7月',
            line: { 
                color: '#8a2e76',
                dash: lineStyle === 'solid' ? 'solid' : lineStyle === 'dashed' ? 'dash' : 'dot',
                width: 2
            }
        }
    ];

    const layout = {
        title: '美元/人民币汇率走势',
        xaxis: { title: '日期' },
        yaxis: { title: '汇率' }
    };

    Plotly.newPlot('exchange-chart', data, layout, { responsive: true });
}

// 更新线型
function updateLineStyle(style) {
    currentChartStates.exchangeChart.style = style;
    createExchangeChart();
}

// 切换动画
function toggleAnimation() {
    currentChartStates.exchangeChart.animation = !currentChartStates.exchangeChart.animation;
    updateExchangeAnimation();
}

// 更新汇率动画
function updateExchangeAnimation() {
    if (currentChartStates.exchangeChart.animation) {
        const speed = document.getElementById('animation-speed').value;
        animateExchangeChart(speed);
    }
}

// 汇率图表动画
function animateExchangeChart(speed) {
    // 简化的动画效果
    Plotly.animate('exchange-chart', {
        data: [{ y: [6.8007, 6.8007, 6.8015, 6.8015, 6.8060, 6.8060, 6.8060, 6.8036, 6.8025, 6.7877, 6.7835, 6.7758, 6.7700, 6.7463, 6.7519, 6.7511, 6.7511, 6.7539, 6.7265] }],
        traces: [0]
    }, {
        transition: {
            duration: 1000 / speed,
            easing: 'cubic-in-out'
        }
    });
}

// 实例3：产品销售图表
function createSalesChart() {
    const quarters = ['第1季度', '第2季度', '第3季度', '第4季度'];
    const saleA = [2144, 4617, 7674, 6666];
    const saleB = [853, 1214, 2414, 4409];
    const saleC = [153, 155, 292, 680];

    const markerType = currentChartStates.salesChart.marker;
    
    const data = [
        {
            x: quarters,
            y: saleA,
            type: 'scatter',
            mode: 'lines+markers',
            name: '产品A',
            marker: { 
                symbol: markerType,
                size: 10,
                color: currentChartStates.salesChart.color
            }
        },
        {
            x: quarters,
            y: saleB,
            type: 'scatter',
            mode: 'lines+markers',
            name: '产品B',
            marker: { 
                symbol: markerType,
                size: 10,
                color: '#ff7f0e'
            }
        },
        {
            x: quarters,
            y: saleC,
            type: 'scatter',
            mode: 'lines+markers',
            name: '产品C',
            marker: { 
                symbol: markerType,
                size: 10,
                color: '#2ca02c'
            }
        }
    ];

    const layout = {
        title: '产品销售季度分析',
        xaxis: { title: '季度' },
        yaxis: { title: '销售额(万元)' }
    };

    Plotly.newPlot('sales-chart', data, layout, { responsive: true });
}

// 更新标记样式
function updateMarkers(marker) {
    currentChartStates.salesChart.marker = marker;
    createSalesChart();
}

// 设置颜色
function setColor(color) {
    currentChartStates.salesChart.color = color;
    document.querySelectorAll('.color-option').forEach(option => option.classList.remove('active'));
    event.target.classList.add('active');
    createSalesChart();
}

// 实例4：温度走势图表
function createTemperatureChart() {
    const days = Array.from({length: 15}, (_, i) => i + 4);
    const yMax = [32, 33, 34, 34, 33, 31, 30, 29, 30, 29, 26, 23, 21, 25, 31];
    const yMin = [19, 19, 20, 22, 22, 21, 22, 16, 18, 18, 17, 14, 15, 16, 16];

    const fontSize = currentChartStates.temperatureChart.fontSize;
    
    const data = [
        {
            x: days,
            y: yMax,
            type: 'scatter',
            mode: 'lines+markers+text',
            name: '最高温度',
            text: yMax.map(val => val + '°C'),
            textposition: 'top center',
            textfont: { 
                size: fontSize,
                family: 'SimHei'
            }
        },
        {
            x: days,
            y: yMin,
            type: 'scatter',
            mode: 'lines+markers+text',
            name: '最低温度',
            text: yMin.map(val => val + '°C'),
            textposition: 'bottom center',
            textfont: { 
                size: fontSize,
                family: 'SimHei'
            }
        }
    ];

    const layout = {
        title: '未来15天温度走势',
        xaxis: { title: '日期' },
        yaxis: { title: '温度(°C)', range: [0, 40] }
    };

    Plotly.newPlot('temperature-chart', data, layout, { responsive: true });
}

// 更新字体样式
function updateFontStyle(style) {
    currentChartStates.temperatureChart.fontStyle = style;
    updateTemperatureChart();
}

// 更新温度图表
function updateTemperatureChart() {
    createTemperatureChart();
}

// 实例5：科赫雪花分形图表
function createSnowflakeChart() {
    const iterations = currentChartStates.snowflakeChart.iterations;
    const points = generateKochSnowflake(iterations);
    
    const data = [{
        x: points.x,
        y: points.y,
        type: 'scatter',
        mode: 'lines',
        fill: 'toself',
        line: { 
            color: currentChartStates.snowflakeChart.color,
            width: 3
        },
        fillcolor: currentChartStates.snowflakeChart.color.replace(')', ', 0.3)').replace('rgb', 'rgba')
    }];

    const layout = {
        title: `科赫雪花 (迭代次数: ${iterations})`,
        xaxis: { showgrid: false, zeroline: false, showticklabels: false },
        yaxis: { showgrid: false, zeroline: false, showticklabels: false, scaleanchor: 'x' }
    };

    Plotly.newPlot('snowflake-chart', data, layout, { responsive: true });
}

// 生成科赫雪花分形
function generateKochSnowflake(order) {
    function kochSnowflakeComplex(order) {
        if (order === 0) {
            // 初始三角形
            const angles = [0, 120, 240].map(deg => deg + 90);
            return angles.map(angle => {
                const scale = 10 / Math.sqrt(3);
                const x = scale * Math.cos(angle * Math.PI / 180);
                const y = scale * Math.sin(angle * Math.PI / 180);
                return {x, y};
            });
        } else {
            const previousPoints = kochSnowflakeComplex(order - 1);
            const newPoints = [];
            
            for (let i = 0; i < previousPoints.length; i++) {
                const p1 = previousPoints[i];
                const p2 = previousPoints[(i + 1) % previousPoints.length];
                
                const dx = p2.x - p1.x;
                const dy = p2.y - p1.y;
                
                // 三等分点
                const p3 = { x: p1.x + dx/3, y: p1.y + dy/3 };
                const p5 = { x: p1.x + 2*dx/3, y: p1.y + 2*dy/3 };
                
                // 计算凸起点的坐标
                const angle = Math.atan2(dy, dx);
                const length = Math.sqrt(dx*dx + dy*dy) / 3;
                const p4 = {
                    x: p1.x + dx/2 - length * Math.sin(angle),
                    y: p1.y + dy/2 + length * Math.cos(angle)
                };
                
                newPoints.push(p1, p3, p4, p5);
            }
            return newPoints;
        }
    }
    
    const points = kochSnowflakeComplex(order);
    return {
        x: points.map(p => p.x),
        y: points.map(p => p.y)
    };
}

// 更新雪花图表
function updateSnowflakeChart() {
    createSnowflakeChart();
}

// 设置雪花颜色
function setSnowflakeColor(color) {
    currentChartStates.snowflakeChart.color = color;
    document.querySelectorAll('#chart5 .color-option').forEach(option => option.classList.remove('active'));
    event.target.classList.add('active');
    createSnowflakeChart();
}

// 响应式调整
window.addEventListener('resize', function() {
    // 重新绘制所有图表以适应新尺寸
    Plotly.Plots.resize('book-chart');
    Plotly.Plots.resize('exchange-chart');
    Plotly.Plots.resize('sales-chart');
    Plotly.Plots.resize('temperature-chart');
    Plotly.Plots.resize('snowflake-chart');
});

// 触摸设备优化
if ('ontouchstart' in window) {
    document.body.classList.add('touch-device');
    
    // 增加触摸按钮的点击区域
    document.querySelectorAll('.control-btn, .color-option').forEach(element => {
        element.style.minHeight = '44px';
        element.style.minWidth = '44px';
    });
}

// 性能优化：防抖函数
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// 应用防抖到窗口调整事件
const debouncedResize = debounce(function() {
    Plotly.Plots.resize('book-chart');
    Plotly.Plots.resize('exchange-chart');
    Plotly.Plots.resize('sales-chart');
    Plotly.Plots.resize('temperature-chart');
    Plotly.Plots.resize('snowflake-chart');
}, 250);

window.addEventListener('resize', debouncedResize);