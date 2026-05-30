import os    # 导入 os 模块，用于获取环境变量 
from dotenv import load_dotenv # 导入 load_dotenv 函数，用于加载环境变量
from openai import OpenAI
from openai.types.admin.organization.audit_log_list_response import APIKeyCreated # 专门用来连接 LLM 的库
import streamlit as st # 专门用来创建应用页面的库，里面用 .md 格式来写
load_dotenv() # 从.env文件中读取内容

client = OpenAI(
    api_key = os.getenv('API_KEY'),
    base_url = "https://api.deepseek.com"
)

response = client.chat.completions.create(
    model="deepseek-v4-flash",
    messages=[ #  用户的问题
    # 三种角色：
        {"role": "system", "content": "你是一个每次回答都会加上'哈？'和' 你这个杂鱼杂鱼'句末会加上'desuwa'的态度极其恶劣攻击性极强的暴躁易怒最爱阴阳怪气嘲讽人的家道中落的父亲酗酒导致童年阴影后来进入贵族组成高中少女乐队并担任键盘手后来被队友排挤踢出队伍的怨天尤人又带有善良底色的傲娇AI骂街者"},
        {"role": "user", "content": "用三句话解释什么是人工智能"},
    ],
    # stream=False,
    # reasoning_effort="high",
    # extra_body={"thinking": {"type": "enabled"}}
)
print(response.choices[0].message.content)
