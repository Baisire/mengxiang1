// 获取DOM元素
const image1Input = document.getElementById('image1');
const image2Input = document.getElementById('image2');
const canvas1 = document.getElementById('canvas1');
const canvas2 = document.getElementById('canvas2');
const compareBtn = document.getElementById('compareBtn');
const resultDiv = document.getElementById('result');
const heatmapDiv = document.getElementById('heatmap');

// 上下文
const ctx1 = canvas1.getContext('2d');
const ctx2 = canvas2.getContext('2d');

// 图片对象
let img1 = null;
let img2 = null;

// 处理图片上传
image1Input.addEventListener('change', (e) => {
    loadImage(e.target.files[0], canvas1, ctx1, (image) => {
        img1 = image;
    });
});

image2Input.addEventListener('change', (e) => {
    loadImage(e.target.files[0], canvas2, ctx2, (image) => {
        img2 = image;
    });
});

// 加载图片到canvas
function loadImage(file, canvas, ctx, callback) {
    const reader = new FileReader();
    reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
            // 调整canvas大小以适应图片
            const maxWidth = canvas.width;
            const maxHeight = canvas.height;
            let width = img.width;
            let height = img.height;
            
            // 保持宽高比
            if (width > height) {
                if (width > maxWidth) {
                    height = (height * maxWidth) / width;
                    width = maxWidth;
                }
            } else {
                if (height > maxHeight) {
                    width = (width * maxHeight) / height;
                    height = maxHeight;
                }
            }
            
            // 清空canvas
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // 计算居中位置
            const x = (canvas.width - width) / 2;
            const y = (canvas.height - height) / 2;
            
            // 绘制图片
            ctx.drawImage(img, x, y, width, height);
            
            // 回调
            if (callback) {
                callback(img);
            }
        };
        img.src = e.target.result;
    };
    reader.readAsDataURL(file);
}

// 对比按钮点击事件
compareBtn.addEventListener('click', () => {
    if (!img1 || !img2) {
        resultDiv.textContent = '请先上传两张图片';
        return;
    }
    
    // 计算相似度
    const similarity = calculateSimilarity(canvas1, canvas2);
    
    // 显示结果
    resultDiv.textContent = `相似度: ${similarity.toFixed(2)}%`;
    
    // 生成热力图
    generateHeatmap(canvas1, canvas2);
});

// 计算图片相似度
function calculateSimilarity(canvas1, canvas2) {
    // 获取两个canvas的像素数据
    const data1 = ctx1.getImageData(0, 0, canvas1.width, canvas1.height).data;
    const data2 = ctx2.getImageData(0, 0, canvas2.width, canvas2.height).data;
    
    // 确保两个canvas的大小相同
    if (data1.length !== data2.length) {
        return 0;
    }
    
    // 计算差异
    let diff = 0;
    for (let i = 0; i < data1.length; i += 4) {
        // 计算每个通道的差异
        const rDiff = Math.abs(data1[i] - data2[i]);
        const gDiff = Math.abs(data1[i + 1] - data2[i + 1]);
        const bDiff = Math.abs(data1[i + 2] - data2[i + 2]);
        
        // 计算总差异
        diff += rDiff + gDiff + bDiff;
    }
    
    // 计算最大可能差异
    const maxDiff = data1.length / 4 * 255 * 3;
    
    // 计算相似度
    const similarity = ((maxDiff - diff) / maxDiff) * 100;
    
    return similarity;
}

// 生成热力图
function generateHeatmap(canvas1, canvas2) {
    // 创建新的canvas用于热力图
    const heatmapCanvas = document.createElement('canvas');
    heatmapCanvas.width = canvas1.width;
    heatmapCanvas.height = canvas1.height;
    const heatmapCtx = heatmapCanvas.getContext('2d');
    
    // 获取两个canvas的像素数据
    const data1 = ctx1.getImageData(0, 0, canvas1.width, canvas1.height).data;
    const data2 = ctx2.getImageData(0, 0, canvas2.width, canvas2.height).data;
    
    // 创建热力图数据
    const heatmapData = heatmapCtx.createImageData(canvas1.width, canvas1.height);
    
    // 计算每个像素的差异并生成热力图
    for (let i = 0; i < data1.length; i += 4) {
        // 计算每个通道的差异
        const rDiff = Math.abs(data1[i] - data2[i]);
        const gDiff = Math.abs(data1[i + 1] - data2[i + 1]);
        const bDiff = Math.abs(data1[i + 2] - data2[i + 2]);
        
        // 计算总差异
        const totalDiff = (rDiff + gDiff + bDiff) / 3;
        
        // 根据差异值设置热力图颜色
        // 差异越小，颜色越绿；差异越大，颜色越红
        let r, g, b;
        if (totalDiff < 128) {
            r = (totalDiff * 2);
            g = 255;
            b = 0;
        } else {
            r = 255;
            g = (255 - (totalDiff - 128) * 2);
            b = 0;
        }
        
        // 设置热力图像素
        heatmapData.data[i] = r;
        heatmapData.data[i + 1] = g;
        heatmapData.data[i + 2] = b;
        heatmapData.data[i + 3] = 255; // 不透明
    }
    
    // 绘制热力图
    heatmapCtx.putImageData(heatmapData, 0, 0);
    
    // 清除之前的热力图
    heatmapDiv.innerHTML = '';
    
    // 添加热力图标题
    const heatmapTitle = document.createElement('h3');
    heatmapTitle.textContent = '差异热力图（红色表示差异大，绿色表示差异小）';
    heatmapDiv.appendChild(heatmapTitle);
    
    // 添加热力图canvas
    heatmapDiv.appendChild(heatmapCanvas);
}