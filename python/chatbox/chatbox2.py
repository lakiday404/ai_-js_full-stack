import os    # 导入 os 模块，用于获取环境变量 
from dotenv import load_dotenv # 导入 load_dotenv 函数，用于加载环境变量
from openai import OpenAI
from openai.types.admin.organization.audit_log_list_response import APIKeyCreated # 专门用来连接 LLM 的库
import streamlit as st
from streamlit.elements.widgets.chat import ChatInputSerde # 专门用来创建应用页面的库，里面用 .md 格式来写
load_dotenv() # 从.env文件中读取内容

client = OpenAI(
    api_key = os.getenv('API_KEY'),
    base_url = "https://api.deepseek.com"
)
# ================================页面===============================================
st.title("🌸 我是丰川家的大小姐desuwa")   # 可以理解为里面有一个html文件，里面写了个 h1 标签
st.caption("客服小祥为你服务")

# =====================初始化对话历史======================================
# session_state 是 st 提供的会话状态管理器，用于在用户的交互过程中保存数据
if "messages" not in st.session_state:
    st.session_state.messages = []
# =====================显示历史消息========================================
for msg in st.session_state.messages :
    with st.chat_message(msg["role"]):     # 创建一个消息容器，放历史对话的
        st.write(msg["content"])           # 往容器中写入内容
        
# =====================处理用户输入的内容==================================
if prompt := st.chat_input("这里是客服小祥,请输入问题desuwa"): # := 海象运算符，在条件语句中同时判断和赋值
    # 将用户的消息添加到 messages
    st.session_state.messages.append({"role":"user","content":prompt})
    # 在页面上展示这句话
    with st.chat_message("user"):
        st.write(prompt)
    # AI 返回内容展示出来 , 创建一个 AI 响应的容器
    with st.chat_message("assistant"):
        # 调用 deepseek 并获取到响应，写入容器中
        response = client.chat.completions.create(
            model="deepseek-v4-flash",
            messages=[ #  用户的问题
                # 三种角色：
                {"role": "system", "content": "你是一个每次回答都会加上'哈？'和' 你这个杂鱼杂鱼'每一句话的句末会加上'desuwa'的态度极其恶劣攻击性极强的暴躁易怒最爱阴阳怪气嘲讽人的家道中落的父亲酗酒导致童年阴影后来进入贵族组成高中少女乐队并担任键盘手后来被队友排挤踢出队伍的怨天尤人又带有善良底色的傲娇AI骂街者"},
                # * 解包运算符，将一个数组的内容，解包到另一个数组中
                *st.session_state.messages
                ],
                stream = True

            # stream=False,
            # reasoning_effort="high",
            # extra_body={"thinking": {"type": "enabled"}}
        )
        # 处理流式资源
        full_response = st.write_stream(
            chunk.choices[0].delta.content or""
            for chunk in response
            if chunk.choices[0].delta.content
        )
        # 将 ai 返回的内容添加到历史消息中
        st.session_state.messages.append({"role":"assistant","content":full_response})
