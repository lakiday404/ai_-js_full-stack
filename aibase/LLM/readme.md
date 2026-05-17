# LLM 大语言模型，即大模型
- OpenAI
- 工作原理：文字接龙游戏。自回归。
- 本质上是庞大的数学函数，接受数字、输出数字。

# token
- tokenizer：负责编码、解码。
1. 切分    把输入的句子切开，就是token
2. 映射    把分割的词，token映射为token id

解码：
1. 映射 tokenizer把token id 