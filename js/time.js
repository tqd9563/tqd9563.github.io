// 在一起计时
// 初始化目标时间
var targetDate = new Date(Date.UTC(2022, 12, 24, 21, 15, 0)); // 注意月份是从0开始的，所以0代表一月

function updateTimer() {
    var now = new Date(); // 获取当前时间
    var diff = now - targetDate; // 计算时间差(ms)

    if (diff >= 0) {
        // 将时间差转换为年月日时分秒
        diff = Math.floor(diff / 1000); // 秒
        var seconds = diff % 60;
        diff = Math.floor(diff / 60); // 分
        var minutes = diff % 60;
        diff = Math.floor(diff / 60); // 时
        var hours = diff % 24;
        var daysTotal = Math.floor(diff / 24); // 总日
        
        // 计算年月日（折算成天数）
        var years = Math.floor(daysTotal / 365.25); // 闰年考虑
        var months = Math.floor((daysTotal % 365.25) / 30);  // 一个简单的月平均
        var days = Math.floor((daysTotal % 365.25) % 30);  // 剩余的天数

        // 更新页面元素
        var timerElement = document.getElementById('timer');
        timerElement.innerHTML = years + '年 ' + months + '月 ' + days + '天 ' +
                                 hours + '小时 ' + minutes + '分钟 ' + seconds + '秒';
    }
}

// 在页面加载完成后开始计时
window.onload = function() {
    updateTimer(); // 立即更新一次计时
    setInterval(updateTimer, 1000); // 每秒更新计时
}