import { Hono } from 'hono'
import { cors } from 'hono/cors'

const app = new Hono()

// CORS for API
app.use('/api/*', cors())

// API route to get server time
app.get('/api/time', (c) => {
  const serverTime = new Date()
  return c.json({ 
    utc: serverTime.toISOString(),
    timestamp: serverTime.getTime(),
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    formatted: {
      local: serverTime.toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai' }),
      utc: serverTime.toUTCString(),
      iso: serverTime.toISOString()
    }
  })
})

// Main page
app.get('/', (c) => {
  return c.html(`
    <!DOCTYPE html>
    <html lang="zh-CN">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>服务器时间显示</title>
        <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
        <style>
            /* 服务器时间显示样式 */
            body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            }

            /* 数字时钟字体 */
            .font-mono {
                font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
            }

            /* 动画效果 */
            @keyframes pulse {
                0%, 100% { opacity: 1; }
                50% { opacity: 0.5; }
            }

            .animate-pulse {
                animation: pulse 2s infinite;
            }

            /* 响应式调整 */
            @media (max-width: 768px) {
                .text-3xl {
                    font-size: 1.5rem;
                }
                
                .text-4xl {
                    font-size: 2rem;
                }
            }

            /* 玻璃效果增强 */
            .backdrop-blur-lg {
                backdrop-filter: blur(20px);
            }

            .backdrop-blur-sm {
                backdrop-filter: blur(8px);
            }

            /* 渐变背景 */
            .bg-gradient-to-br {
                background: linear-gradient(to bottom right, #1e3a8a, #7c3aed);
            }

            /* 加载动画 */
            .loading {
                animation: fadeIn 0.5s ease-in-out;
            }

            @keyframes fadeIn {
                from { opacity: 0; transform: translateY(20px); }
                to { opacity: 1; transform: translateY(0); }
            }

            /* 卡片悬停效果 */
            .bg-white\\/20:hover {
                background-color: rgba(255, 255, 255, 0.25);
                transition: background-color 0.3s ease;
            }

            /* 按钮样式 */
            button {
                transition: all 0.2s ease;
            }

            button:hover {
                transform: translateY(-1px);
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            }
        </style>
    </head>
    <body class="bg-gradient-to-br from-blue-900 to-purple-900 min-h-screen flex items-center justify-center">
        <div class="bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-2xl max-w-2xl w-full mx-4">
            <div class="text-center mb-8">
                <h1 class="text-4xl font-bold text-white mb-2">
                    <i class="fas fa-clock mr-3 text-blue-300"></i>
                    服务器时间
                </h1>
                <p class="text-blue-200">实时显示服务器时间信息</p>
            </div>
            
            <div id="time-display" class="space-y-6">
                <div class="loading text-center text-white">
                    <i class="fas fa-spinner fa-spin text-3xl"></i>
                    <p class="mt-2">正在获取时间...</p>
                </div>
            </div>
        </div>
        
        <script src="https://cdn.jsdelivr.net/npm/axios@1.6.0/dist/axios.min.js"></script>
        <script>
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
                    
                    this.timeDisplay.innerHTML = \`
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <!-- 主时间显示 -->
                            <div class="bg-white/20 rounded-2xl p-6 backdrop-blur-sm">
                                <div class="text-center">
                                    <div class="text-sm text-blue-200 mb-2">服务器时间</div>
                                    <div class="text-3xl font-mono font-bold text-white mb-2" id="server-time">
                                        \${this.formatTime(serverTime)}
                                    </div>
                                    <div class="text-sm text-blue-200">
                                        \${this.formatDate(serverTime)}
                                    </div>
                                </div>
                            </div>

                            <!-- 本地时间对比 -->
                            <div class="bg-white/20 rounded-2xl p-6 backdrop-blur-sm">
                                <div class="text-center">
                                    <div class="text-sm text-blue-200 mb-2">本地时间</div>
                                    <div class="text-3xl font-mono font-bold text-white mb-2" id="local-time">
                                        \${this.formatTime(now)}
                                    </div>
                                    <div class="text-sm text-blue-200">
                                        \${this.formatDate(now)}
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
                                    <div class="text-white font-mono">\${timeData.formatted.utc}</div>
                                </div>
                                <div>
                                    <div class="text-blue-200">ISO 格式:</div>
                                    <div class="text-white font-mono text-xs">\${timeData.formatted.iso}</div>
                                </div>
                                <div>
                                    <div class="text-blue-200">时间戳:</div>
                                    <div class="text-white font-mono">\${timeData.timestamp}</div>
                                </div>
                                <div>
                                    <div class="text-blue-200">时差:</div>
                                    <div class="text-white font-mono \${timeDiff > 1000 ? 'text-yellow-300' : 'text-green-300'}">
                                        \${timeDiff < 1000 ? '同步' : \`\${Math.round(timeDiff / 1000)}秒\`}
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
                                最后更新: <span id="last-update">\${this.formatTime(new Date())}</span>
                            </div>
                        </div>
                    \`;
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
                    this.timeDisplay.innerHTML = \`
                        <div class="text-center text-red-300">
                            <i class="fas fa-exclamation-triangle text-4xl mb-4"></i>
                            <p class="text-xl">\${message}</p>
                            <button onclick="location.reload()" class="mt-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition-colors">
                                <i class="fas fa-redo mr-2"></i>
                                重试
                            </button>
                        </div>
                    \`;
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
        </script>
    </body>
    </html>
  `)
})

export default app
