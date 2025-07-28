// 服务器时间显示应用
class ServerTimeDisplay {
    constructor() {
        this.timeDisplay = document.getElementById('time-display');
        this.updateInterval = null;
        this.init();
    }

    async init() {
        try {
            await this.fetchServerTime();
            this.startAutoUpdate();
        } catch (error) {
            this.showError('无法获取服务器时间');
        }
    }

    async fetchServerTime() {
        try {
            const response = await axios.get('/api/time');
            const timeData = response.data;
            this.displayTime(timeData);
        } catch (error) {
            console.error('获取服务器时间失败:', error);
            throw error;
        }
    }

    displayTime(timeData) {
        const now = new Date();
        const serverTime = new Date(timeData.utc);
        const timeDiff = Math.abs(now.getTime() - serverTime.getTime());
        
        this.timeDisplay.innerHTML = `
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <!-- 主时间显示 -->
                <div class="bg-white/20 rounded-2xl p-6 backdrop-blur-sm">
                    <div class="text-center">
                        <div class="text-sm text-blue-200 mb-2">服务器时间</div>
                        <div class="text-3xl font-mono font-bold text-white mb-2" id="server-time">
                            ${this.formatTime(serverTime)}
                        </div>
                        <div class="text-sm text-blue-200">
                            ${this.formatDate(serverTime)}
                        </div>
                    </div>
                </div>

                <!-- 本地时间对比 -->
                <div class="bg-white/20 rounded-2xl p-6 backdrop-blur-sm">
                    <div class="text-center">
                        <div class="text-sm text-blue-200 mb-2">本地时间</div>
                        <div class="text-3xl font-mono font-bold text-white mb-2" id="local-time">
                            ${this.formatTime(now)}
                        </div>
                        <div class="text-sm text-blue-200">
                            ${this.formatDate(now)}
                        </div>
                    </div>
                </div>
            </div>

            <!-- 详细信息 -->
            <div class="mt-6 bg-white/20 rounded-2xl p-6 backdrop-blur-sm">
                <h3 class="text-lg font-semibold text-white mb-4 flex items-center">
                    <i class="fas fa-info-circle mr-2"></i>
                    详细信息
                </h3>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                        <div class="text-blue-200">UTC 时间:</div>
                        <div class="text-white font-mono">${timeData.formatted.utc}</div>
                    </div>
                    <div>
                        <div class="text-blue-200">ISO 格式:</div>
                        <div class="text-white font-mono text-xs">${timeData.formatted.iso}</div>
                    </div>
                    <div>
                        <div class="text-blue-200">时间戳:</div>
                        <div class="text-white font-mono">${timeData.timestamp}</div>
                    </div>
                    <div>
                        <div class="text-blue-200">时差:</div>
                        <div class="text-white font-mono ${timeDiff > 1000 ? 'text-yellow-300' : 'text-green-300'}">
                            ${timeDiff < 1000 ? '同步' : `${Math.round(timeDiff / 1000)}秒`}
                        </div>
                    </div>
                </div>
            </div>

            <!-- 状态指示 -->
            <div class="mt-4 flex items-center justify-center space-x-4 text-sm text-blue-200">
                <div class="flex items-center">
                    <div class="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                    实时更新中
                </div>
                <div class="flex items-center">
                    <i class="fas fa-sync-alt mr-2"></i>
                    最后更新: <span id="last-update">${this.formatTime(new Date())}</span>
                </div>
            </div>
        `;
    }

    formatTime(date) {
        return date.toLocaleTimeString('zh-CN', {
            hour12: false,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
    }

    formatDate(date) {
        return date.toLocaleDateString('zh-CN', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            weekday: 'long'
        });
    }

    startAutoUpdate() {
        this.updateInterval = setInterval(() => {
            this.fetchServerTime();
        }, 1000);
    }

    showError(message) {
        this.timeDisplay.innerHTML = `
            <div class="text-center text-red-300">
                <i class="fas fa-exclamation-triangle text-4xl mb-4"></i>
                <p class="text-xl">${message}</p>
                <button onclick="location.reload()" class="mt-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition-colors">
                    <i class="fas fa-redo mr-2"></i>
                    重试
                </button>
            </div>
        `;
    }

    destroy() {
        if (this.updateInterval) {
            clearInterval(this.updateInterval);
        }
    }
}

// 页面加载后初始化
document.addEventListener('DOMContentLoaded', () => {
    window.timeDisplay = new ServerTimeDisplay();
});

// 页面关闭时清理
window.addEventListener('beforeunload', () => {
    if (window.timeDisplay) {
        window.timeDisplay.destroy();
    }
});