// 部署一个在线平台，模仿 deepseek
<!-- * 要部署在线平台，一般需要 **内网穿透** -->
<!-- * 这里我们使用免费的云端部署实现 -->
<!--项目预览： https://chatbot2py-jdgzkkgneqhjgs7my5td99.streamlit.app/ -->
> 本项目前后端不分离
## node.js
- 可以执行 js 代码的环境

- **npm 是 node.js 的包管理器** 
1. node 仓库里记录了全人类上传的，封装好的方法
2. 要从 node 仓库下载第三方的包，就用 npm install 包名
## python3
- python 的运行环境

- **pip 是 python 的包管理器**
1. 要从 pip 仓库下载第三方的包，就用 pip install 包名
2. pip 的仓库也在国外，下载较慢，可以使用国内镜像源

<!-- ### 清华大学源（最稳定，首推）
pip config set global.index-url https://pypi.tuna.tsinghua.edu.cn/simple/
pip config set global.trusted-host pypi.tuna.tsinghua.edu.cn

#### 阿里云源（备用）
 pip config set global.index-url https://mirrors.aliyun.com/pypi/simple/

### 豆瓣源（备用，可能不稳定）
 pip config set global.index-url https://pypi.doubanio.com/simple/

### 验证
pip config list -->

### 必要环境部署

1. 给 pip 换源
2. 创建一个 .env 环境文件，放 APIKEY
3. 创建 .gitignore ，放入 .env
4. 创建一个 chatbox.py
4. 装一个 dotenv  pip install python-dotenv
5. pip install openai streamlit