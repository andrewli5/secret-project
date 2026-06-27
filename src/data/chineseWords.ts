export type ChineseSentence = {
  simplified: string;
  pinyin: string;
  english: string;
};

export type ChineseWord = {
  simplified: string;
  pinyin: string;
  english: string;
  sentence: ChineseSentence;
};

export const chineseWords: ChineseWord[] = [
  {
    simplified: '你好',
    pinyin: 'nǐ hǎo',
    english: 'hello',
    sentence: {
      simplified: '你好，很高兴认识你。',
      pinyin: 'nǐ hǎo, hěn gāo xìng rèn shi nǐ.',
      english: 'Hello, nice to meet you.',
    },
  },
  {
    simplified: '谢谢',
    pinyin: 'xiè xie',
    english: 'thank you',
    sentence: {
      simplified: '谢谢你的帮助。',
      pinyin: 'xiè xie nǐ de bāng zhù.',
      english: 'Thank you for your help.',
    },
  },
  {
    simplified: '对不起',
    pinyin: 'duì bu qǐ',
    english: 'sorry',
    sentence: {
      simplified: '对不起，我迟到了。',
      pinyin: 'duì bu qǐ, wǒ chí dào le.',
      english: "Sorry, I'm late.",
    },
  },
  {
    simplified: '没关系',
    pinyin: 'méi guān xi',
    english: "it's okay",
    sentence: {
      simplified: '没关系，别担心。',
      pinyin: 'méi guān xi, bié dān xīn.',
      english: "It's okay, don't worry.",
    },
  },
  {
    simplified: '再见',
    pinyin: 'zài jiàn',
    english: 'goodbye',
    sentence: {
      simplified: '再见，明天见。',
      pinyin: 'zài jiàn, míng tiān jiàn.',
      english: 'Goodbye, see you tomorrow.',
    },
  },
  {
    simplified: '请',
    pinyin: 'qǐng',
    english: 'please',
    sentence: { simplified: '请坐。', pinyin: 'qǐng zuò.', english: 'Please sit down.' },
  },
  {
    simplified: '不客气',
    pinyin: 'bú kè qi',
    english: "you're welcome",
    sentence: {
      simplified: '不客气，这是我应该做的。',
      pinyin: 'bú kè qi, zhè shì wǒ yīng gāi zuò de.',
      english: "You're welcome, it's the least I could do.",
    },
  },
  {
    simplified: '早上好',
    pinyin: 'zǎo shang hǎo',
    english: 'good morning',
    sentence: {
      simplified: '早上好，今天天气不错。',
      pinyin: 'zǎo shang hǎo, jīn tiān tiān qì bú cuò.',
      english: 'Good morning, the weather is nice today.',
    },
  },
  {
    simplified: '晚上好',
    pinyin: 'wǎn shang hǎo',
    english: 'good evening',
    sentence: {
      simplified: '晚上好，欢迎来我家。',
      pinyin: 'wǎn shang hǎo, huān yíng lái wǒ jiā.',
      english: 'Good evening, welcome to my home.',
    },
  },
  {
    simplified: '晚安',
    pinyin: 'wǎn ān',
    english: 'good night',
    sentence: {
      simplified: '晚安，做个好梦。',
      pinyin: 'wǎn ān, zuò ge hǎo mèng.',
      english: 'Good night, sweet dreams.',
    },
  },
  {
    simplified: '欢迎',
    pinyin: 'huān yíng',
    english: 'welcome',
    sentence: {
      simplified: '欢迎你们来中国。',
      pinyin: 'huān yíng nǐ men lái zhōng guó.',
      english: 'Welcome to China.',
    },
  },
  {
    simplified: '你好吗',
    pinyin: 'nǐ hǎo ma',
    english: 'how are you?',
    sentence: {
      simplified: '好久不见，你好吗？',
      pinyin: 'hǎo jiǔ bú jiàn, nǐ hǎo ma?',
      english: 'Long time no see, how are you?',
    },
  },
  {
    simplified: '很好',
    pinyin: 'hěn hǎo',
    english: 'very good',
    sentence: {
      simplified: '我今天过得很好。',
      pinyin: 'wǒ jīn tiān guò de hěn hǎo.',
      english: 'I had a very good day today.',
    },
  },
  {
    simplified: '是',
    pinyin: 'shì',
    english: 'yes / is',
    sentence: {
      simplified: '他是我的老师。',
      pinyin: 'tā shì wǒ de lǎo shī.',
      english: 'He is my teacher.',
    },
  },
  {
    simplified: '不是',
    pinyin: 'bú shì',
    english: 'no / is not',
    sentence: {
      simplified: '这不是我的书。',
      pinyin: 'zhè bú shì wǒ de shū.',
      english: 'This is not my book.',
    },
  },

  {
    simplified: '我',
    pinyin: 'wǒ',
    english: 'I / me',
    sentence: { simplified: '我是学生。', pinyin: 'wǒ shì xué shēng.', english: 'I am a student.' },
  },
  {
    simplified: '你',
    pinyin: 'nǐ',
    english: 'you',
    sentence: {
      simplified: '你叫什么名字？',
      pinyin: 'nǐ jiào shén me míng zi?',
      english: "What's your name?",
    },
  },
  {
    simplified: '他',
    pinyin: 'tā',
    english: 'he / him',
    sentence: {
      simplified: '他在看书。',
      pinyin: 'tā zài kàn shū.',
      english: 'He is reading a book.',
    },
  },
  {
    simplified: '她',
    pinyin: 'tā',
    english: 'she / her',
    sentence: {
      simplified: '她是我的朋友。',
      pinyin: 'tā shì wǒ de péng you.',
      english: 'She is my friend.',
    },
  },
  {
    simplified: '我们',
    pinyin: 'wǒ men',
    english: 'we / us',
    sentence: {
      simplified: '我们一起去吃饭吧。',
      pinyin: 'wǒ men yì qǐ qù chī fàn ba.',
      english: "Let's go eat together.",
    },
  },
  {
    simplified: '你们',
    pinyin: 'nǐ men',
    english: 'you (plural)',
    sentence: {
      simplified: '你们想喝什么？',
      pinyin: 'nǐ men xiǎng hē shén me?',
      english: 'What do you all want to drink?',
    },
  },
  {
    simplified: '他们',
    pinyin: 'tā men',
    english: 'they / them',
    sentence: {
      simplified: '他们都是中国人。',
      pinyin: 'tā men dōu shì zhōng guó rén.',
      english: 'They are all Chinese.',
    },
  },
  {
    simplified: '这',
    pinyin: 'zhè',
    english: 'this',
    sentence: {
      simplified: '这是我的家。',
      pinyin: 'zhè shì wǒ de jiā.',
      english: 'This is my home.',
    },
  },
  {
    simplified: '那',
    pinyin: 'nà',
    english: 'that',
    sentence: { simplified: '那是什么？', pinyin: 'nà shì shén me?', english: 'What is that?' },
  },
  {
    simplified: '谁',
    pinyin: 'shéi',
    english: 'who',
    sentence: { simplified: '他是谁？', pinyin: 'tā shì shéi?', english: 'Who is he?' },
  },

  {
    simplified: '一',
    pinyin: 'yī',
    english: 'one',
    sentence: {
      simplified: '我有一个哥哥。',
      pinyin: 'wǒ yǒu yí ge gē ge.',
      english: 'I have one older brother.',
    },
  },
  {
    simplified: '二',
    pinyin: 'èr',
    english: 'two',
    sentence: {
      simplified: '一加一等于二。',
      pinyin: 'yī jiā yī děng yú èr.',
      english: 'One plus one equals two.',
    },
  },
  {
    simplified: '三',
    pinyin: 'sān',
    english: 'three',
    sentence: {
      simplified: '我们家有三个人。',
      pinyin: 'wǒ men jiā yǒu sān ge rén.',
      english: 'There are three people in my family.',
    },
  },
  {
    simplified: '四',
    pinyin: 'sì',
    english: 'four',
    sentence: {
      simplified: '一年有四个季节。',
      pinyin: 'yì nián yǒu sì ge jì jié.',
      english: 'A year has four seasons.',
    },
  },
  {
    simplified: '五',
    pinyin: 'wǔ',
    english: 'five',
    sentence: {
      simplified: '我每天工作五个小时。',
      pinyin: 'wǒ měi tiān gōng zuò wǔ ge xiǎo shí.',
      english: 'I work five hours every day.',
    },
  },
  {
    simplified: '六',
    pinyin: 'liù',
    english: 'six',
    sentence: {
      simplified: '我弟弟六岁了。',
      pinyin: 'wǒ dì di liù suì le.',
      english: 'My younger brother is six years old.',
    },
  },
  {
    simplified: '七',
    pinyin: 'qī',
    english: 'seven',
    sentence: {
      simplified: '一个星期有七天。',
      pinyin: 'yí ge xīng qī yǒu qī tiān.',
      english: 'A week has seven days.',
    },
  },
  {
    simplified: '八',
    pinyin: 'bā',
    english: 'eight',
    sentence: {
      simplified: '我八点上班。',
      pinyin: 'wǒ bā diǎn shàng bān.',
      english: 'I go to work at eight.',
    },
  },
  {
    simplified: '九',
    pinyin: 'jiǔ',
    english: 'nine',
    sentence: {
      simplified: '商店九点开门。',
      pinyin: 'shāng diàn jiǔ diǎn kāi mén.',
      english: 'The store opens at nine.',
    },
  },
  {
    simplified: '十',
    pinyin: 'shí',
    english: 'ten',
    sentence: {
      simplified: '这本书十块钱。',
      pinyin: 'zhè běn shū shí kuài qián.',
      english: 'This book costs ten yuan.',
    },
  },
  {
    simplified: '百',
    pinyin: 'bǎi',
    english: 'hundred',
    sentence: {
      simplified: '这件衣服一百块。',
      pinyin: 'zhè jiàn yī fu yì bǎi kuài.',
      english: 'This piece of clothing is one hundred yuan.',
    },
  },
  {
    simplified: '千',
    pinyin: 'qiān',
    english: 'thousand',
    sentence: {
      simplified: '这台电脑五千块。',
      pinyin: 'zhè tái diàn nǎo wǔ qiān kuài.',
      english: 'This computer is five thousand yuan.',
    },
  },
  {
    simplified: '万',
    pinyin: 'wàn',
    english: 'ten thousand',
    sentence: {
      simplified: '这辆车要十万块。',
      pinyin: 'zhè liàng chē yào shí wàn kuài.',
      english: 'This car costs one hundred thousand yuan.',
    },
  },
  {
    simplified: '零',
    pinyin: 'líng',
    english: 'zero',
    sentence: {
      simplified: '我的电话号码里有两个零。',
      pinyin: 'wǒ de diàn huà hào mǎ lǐ yǒu liǎng ge líng.',
      english: 'There are two zeros in my phone number.',
    },
  },
  {
    simplified: '两',
    pinyin: 'liǎng',
    english: 'two (of something)',
    sentence: {
      simplified: '我想买两个苹果。',
      pinyin: 'wǒ xiǎng mǎi liǎng ge píng guǒ.',
      english: 'I want to buy two apples.',
    },
  },

  {
    simplified: '今天',
    pinyin: 'jīn tiān',
    english: 'today',
    sentence: {
      simplified: '今天是星期五。',
      pinyin: 'jīn tiān shì xīng qī wǔ.',
      english: 'Today is Friday.',
    },
  },
  {
    simplified: '明天',
    pinyin: 'míng tiān',
    english: 'tomorrow',
    sentence: {
      simplified: '明天我要去上班。',
      pinyin: 'míng tiān wǒ yào qù shàng bān.',
      english: 'Tomorrow I have to go to work.',
    },
  },
  {
    simplified: '昨天',
    pinyin: 'zuó tiān',
    english: 'yesterday',
    sentence: {
      simplified: '昨天我没去学校。',
      pinyin: 'zuó tiān wǒ méi qù xué xiào.',
      english: "I didn't go to school yesterday.",
    },
  },
  {
    simplified: '现在',
    pinyin: 'xiàn zài',
    english: 'now',
    sentence: {
      simplified: '现在几点了？',
      pinyin: 'xiàn zài jǐ diǎn le?',
      english: 'What time is it now?',
    },
  },
  {
    simplified: '时间',
    pinyin: 'shí jiān',
    english: 'time',
    sentence: {
      simplified: '我今天没有时间。',
      pinyin: 'wǒ jīn tiān méi yǒu shí jiān.',
      english: "I don't have time today.",
    },
  },
  {
    simplified: '小时',
    pinyin: 'xiǎo shí',
    english: 'hour',
    sentence: {
      simplified: '我等了一个小时。',
      pinyin: 'wǒ děng le yí ge xiǎo shí.',
      english: 'I waited for an hour.',
    },
  },
  {
    simplified: '分钟',
    pinyin: 'fēn zhōng',
    english: 'minute',
    sentence: {
      simplified: '请等我五分钟。',
      pinyin: 'qǐng děng wǒ wǔ fēn zhōng.',
      english: 'Please wait five minutes for me.',
    },
  },
  {
    simplified: '早上',
    pinyin: 'zǎo shang',
    english: 'morning',
    sentence: {
      simplified: '我早上六点起床。',
      pinyin: 'wǒ zǎo shang liù diǎn qǐ chuáng.',
      english: 'I get up at six in the morning.',
    },
  },
  {
    simplified: '下午',
    pinyin: 'xià wǔ',
    english: 'afternoon',
    sentence: {
      simplified: '下午我们有一个会议。',
      pinyin: 'xià wǔ wǒ men yǒu yí ge huì yì.',
      english: 'We have a meeting in the afternoon.',
    },
  },
  {
    simplified: '晚上',
    pinyin: 'wǎn shang',
    english: 'evening',
    sentence: {
      simplified: '晚上我喜欢看电影。',
      pinyin: 'wǎn shang wǒ xǐ huan kàn diàn yǐng.',
      english: 'In the evening I like to watch movies.',
    },
  },
  {
    simplified: '上午',
    pinyin: 'shàng wǔ',
    english: 'late morning',
    sentence: {
      simplified: '上午我有两节课。',
      pinyin: 'shàng wǔ wǒ yǒu liǎng jié kè.',
      english: 'I have two classes in the late morning.',
    },
  },
  {
    simplified: '星期一',
    pinyin: 'xīng qī yī',
    english: 'Monday',
    sentence: {
      simplified: '星期一我要开会。',
      pinyin: 'xīng qī yī wǒ yào kāi huì.',
      english: 'I have a meeting on Monday.',
    },
  },
  {
    simplified: '星期二',
    pinyin: 'xīng qī èr',
    english: 'Tuesday',
    sentence: {
      simplified: '星期二她去看医生。',
      pinyin: 'xīng qī èr tā qù kàn yī shēng.',
      english: 'She goes to see the doctor on Tuesday.',
    },
  },
  {
    simplified: '星期三',
    pinyin: 'xīng qī sān',
    english: 'Wednesday',
    sentence: {
      simplified: '星期三我们一起吃午饭。',
      pinyin: 'xīng qī sān wǒ men yì qǐ chī wǔ fàn.',
      english: 'We have lunch together on Wednesday.',
    },
  },
  {
    simplified: '星期四',
    pinyin: 'xīng qī sì',
    english: 'Thursday',
    sentence: {
      simplified: '星期四有一个考试。',
      pinyin: 'xīng qī sì yǒu yí ge kǎo shì.',
      english: "There's an exam on Thursday.",
    },
  },
  {
    simplified: '星期五',
    pinyin: 'xīng qī wǔ',
    english: 'Friday',
    sentence: {
      simplified: '星期五我很忙。',
      pinyin: 'xīng qī wǔ wǒ hěn máng.',
      english: "I'm very busy on Friday.",
    },
  },
  {
    simplified: '星期六',
    pinyin: 'xīng qī liù',
    english: 'Saturday',
    sentence: {
      simplified: '星期六我想去公园。',
      pinyin: 'xīng qī liù wǒ xiǎng qù gōng yuán.',
      english: 'I want to go to the park on Saturday.',
    },
  },
  {
    simplified: '星期天',
    pinyin: 'xīng qī tiān',
    english: 'Sunday',
    sentence: {
      simplified: '星期天我们去爬山。',
      pinyin: 'xīng qī tiān wǒ men qù pá shān.',
      english: 'We go hiking on Sunday.',
    },
  },
  {
    simplified: '月',
    pinyin: 'yuè',
    english: 'month',
    sentence: {
      simplified: '这个月我很忙。',
      pinyin: 'zhè ge yuè wǒ hěn máng.',
      english: "I'm very busy this month.",
    },
  },
  {
    simplified: '年',
    pinyin: 'nián',
    english: 'year',
    sentence: {
      simplified: '我在中国住了三年。',
      pinyin: 'wǒ zài zhōng guó zhù le sān nián.',
      english: 'I lived in China for three years.',
    },
  },
  {
    simplified: '后天',
    pinyin: 'hòu tiān',
    english: 'day after tomorrow',
    sentence: {
      simplified: '后天是我的生日。',
      pinyin: 'hòu tiān shì wǒ de shēng rì.',
      english: 'The day after tomorrow is my birthday.',
    },
  },
  {
    simplified: '前天',
    pinyin: 'qián tiān',
    english: 'day before yesterday',
    sentence: {
      simplified: '前天我见了一个老朋友。',
      pinyin: 'qián tiān wǒ jiàn le yí ge lǎo péng you.',
      english: 'The day before yesterday I met an old friend.',
    },
  },

  {
    simplified: '家',
    pinyin: 'jiā',
    english: 'home / family',
    sentence: {
      simplified: '我的家很大。',
      pinyin: 'wǒ de jiā hěn dà.',
      english: 'My home is very big.',
    },
  },
  {
    simplified: '爸爸',
    pinyin: 'bà ba',
    english: 'dad',
    sentence: {
      simplified: '我爸爸是医生。',
      pinyin: 'wǒ bà ba shì yī shēng.',
      english: 'My dad is a doctor.',
    },
  },
  {
    simplified: '妈妈',
    pinyin: 'mā ma',
    english: 'mom',
    sentence: {
      simplified: '我妈妈很喜欢做饭。',
      pinyin: 'wǒ mā ma hěn xǐ huan zuò fàn.',
      english: 'My mom loves cooking.',
    },
  },
  {
    simplified: '哥哥',
    pinyin: 'gē ge',
    english: 'older brother',
    sentence: {
      simplified: '我哥哥比我高。',
      pinyin: 'wǒ gē ge bǐ wǒ gāo.',
      english: 'My older brother is taller than me.',
    },
  },
  {
    simplified: '姐姐',
    pinyin: 'jiě jie',
    english: 'older sister',
    sentence: {
      simplified: '我姐姐在北京工作。',
      pinyin: 'wǒ jiě jie zài běi jīng gōng zuò.',
      english: 'My older sister works in Beijing.',
    },
  },
  {
    simplified: '弟弟',
    pinyin: 'dì di',
    english: 'younger brother',
    sentence: {
      simplified: '我弟弟喜欢踢足球。',
      pinyin: 'wǒ dì di xǐ huan tī zú qiú.',
      english: 'My younger brother likes playing soccer.',
    },
  },
  {
    simplified: '妹妹',
    pinyin: 'mèi mei',
    english: 'younger sister',
    sentence: {
      simplified: '我妹妹今年十岁。',
      pinyin: 'wǒ mèi mei jīn nián shí suì.',
      english: 'My younger sister is ten this year.',
    },
  },
  {
    simplified: '孩子',
    pinyin: 'hái zi',
    english: 'child / children',
    sentence: {
      simplified: '这个孩子很可爱。',
      pinyin: 'zhè ge hái zi hěn kě ài.',
      english: 'This child is very cute.',
    },
  },
  {
    simplified: '朋友',
    pinyin: 'péng you',
    english: 'friend',
    sentence: {
      simplified: '他是我最好的朋友。',
      pinyin: 'tā shì wǒ zuì hǎo de péng you.',
      english: 'He is my best friend.',
    },
  },
  {
    simplified: '老师',
    pinyin: 'lǎo shī',
    english: 'teacher',
    sentence: {
      simplified: '我们的老师很好。',
      pinyin: 'wǒ men de lǎo shī hěn hǎo.',
      english: 'Our teacher is very nice.',
    },
  },
  {
    simplified: '同学',
    pinyin: 'tóng xué',
    english: 'classmate',
    sentence: {
      simplified: '他是我的同学。',
      pinyin: 'tā shì wǒ de tóng xué.',
      english: 'He is my classmate.',
    },
  },
  {
    simplified: '丈夫',
    pinyin: 'zhàng fu',
    english: 'husband',
    sentence: {
      simplified: '她的丈夫是老师。',
      pinyin: 'tā de zhàng fu shì lǎo shī.',
      english: 'Her husband is a teacher.',
    },
  },
  {
    simplified: '妻子',
    pinyin: 'qī zi',
    english: 'wife',
    sentence: {
      simplified: '他的妻子很漂亮。',
      pinyin: 'tā de qī zi hěn piào liang.',
      english: 'His wife is very beautiful.',
    },
  },
  {
    simplified: '爷爷',
    pinyin: 'yé ye',
    english: 'grandpa (paternal)',
    sentence: {
      simplified: '我爷爷今年八十岁。',
      pinyin: 'wǒ yé ye jīn nián bā shí suì.',
      english: 'My grandpa is eighty this year.',
    },
  },
  {
    simplified: '奶奶',
    pinyin: 'nǎi nai',
    english: 'grandma (paternal)',
    sentence: {
      simplified: '我奶奶喜欢喝茶。',
      pinyin: 'wǒ nǎi nai xǐ huan hē chá.',
      english: 'My grandma likes drinking tea.',
    },
  },

  {
    simplified: '水',
    pinyin: 'shuǐ',
    english: 'water',
    sentence: {
      simplified: '我想喝水。',
      pinyin: 'wǒ xiǎng hē shuǐ.',
      english: 'I want to drink water.',
    },
  },
  {
    simplified: '茶',
    pinyin: 'chá',
    english: 'tea',
    sentence: {
      simplified: '中国人喜欢喝茶。',
      pinyin: 'zhōng guó rén xǐ huan hē chá.',
      english: 'Chinese people like to drink tea.',
    },
  },
  {
    simplified: '咖啡',
    pinyin: 'kā fēi',
    english: 'coffee',
    sentence: {
      simplified: '我每天早上喝一杯咖啡。',
      pinyin: 'wǒ měi tiān zǎo shang hē yì bēi kā fēi.',
      english: 'I drink a cup of coffee every morning.',
    },
  },
  {
    simplified: '米饭',
    pinyin: 'mǐ fàn',
    english: 'rice',
    sentence: {
      simplified: '我想吃一碗米饭。',
      pinyin: 'wǒ xiǎng chī yì wǎn mǐ fàn.',
      english: 'I want to eat a bowl of rice.',
    },
  },
  {
    simplified: '面条',
    pinyin: 'miàn tiáo',
    english: 'noodles',
    sentence: {
      simplified: '这家的面条很好吃。',
      pinyin: 'zhè jiā de miàn tiáo hěn hǎo chī.',
      english: 'The noodles here are delicious.',
    },
  },
  {
    simplified: '鸡蛋',
    pinyin: 'jī dàn',
    english: 'egg',
    sentence: {
      simplified: '我早饭吃了两个鸡蛋。',
      pinyin: 'wǒ zǎo fàn chī le liǎng ge jī dàn.',
      english: 'I ate two eggs for breakfast.',
    },
  },
  {
    simplified: '鸡肉',
    pinyin: 'jī ròu',
    english: 'chicken',
    sentence: {
      simplified: '我喜欢吃鸡肉。',
      pinyin: 'wǒ xǐ huan chī jī ròu.',
      english: 'I like to eat chicken.',
    },
  },
  {
    simplified: '牛肉',
    pinyin: 'niú ròu',
    english: 'beef',
    sentence: {
      simplified: '这个牛肉面很好吃。',
      pinyin: 'zhè ge niú ròu miàn hěn hǎo chī.',
      english: 'This beef noodle soup is delicious.',
    },
  },
  {
    simplified: '猪肉',
    pinyin: 'zhū ròu',
    english: 'pork',
    sentence: {
      simplified: '今天的猪肉很新鲜。',
      pinyin: 'jīn tiān de zhū ròu hěn xīn xiān.',
      english: "Today's pork is very fresh.",
    },
  },
  {
    simplified: '鱼',
    pinyin: 'yú',
    english: 'fish',
    sentence: {
      simplified: '妈妈做的鱼很好吃。',
      pinyin: 'mā ma zuò de yú hěn hǎo chī.',
      english: 'The fish mom makes is delicious.',
    },
  },
  {
    simplified: '蔬菜',
    pinyin: 'shū cài',
    english: 'vegetables',
    sentence: {
      simplified: '多吃蔬菜对身体好。',
      pinyin: 'duō chī shū cài duì shēn tǐ hǎo.',
      english: 'Eating more vegetables is good for your health.',
    },
  },
  {
    simplified: '水果',
    pinyin: 'shuǐ guǒ',
    english: 'fruit',
    sentence: {
      simplified: '我每天都吃水果。',
      pinyin: 'wǒ měi tiān dōu chī shuǐ guǒ.',
      english: 'I eat fruit every day.',
    },
  },
  {
    simplified: '苹果',
    pinyin: 'píng guǒ',
    english: 'apple',
    sentence: {
      simplified: '这个苹果很甜。',
      pinyin: 'zhè ge píng guǒ hěn tián.',
      english: 'This apple is very sweet.',
    },
  },
  {
    simplified: '面包',
    pinyin: 'miàn bāo',
    english: 'bread',
    sentence: {
      simplified: '我早上吃了面包。',
      pinyin: 'wǒ zǎo shang chī le miàn bāo.',
      english: 'I ate bread in the morning.',
    },
  },
  {
    simplified: '牛奶',
    pinyin: 'niú nǎi',
    english: 'milk',
    sentence: {
      simplified: '孩子每天喝牛奶。',
      pinyin: 'hái zi měi tiān hē niú nǎi.',
      english: 'The child drinks milk every day.',
    },
  },
  {
    simplified: '啤酒',
    pinyin: 'pí jiǔ',
    english: 'beer',
    sentence: {
      simplified: '他喜欢喝啤酒。',
      pinyin: 'tā xǐ huan hē pí jiǔ.',
      english: 'He likes drinking beer.',
    },
  },
  {
    simplified: '饺子',
    pinyin: 'jiǎo zi',
    english: 'dumplings',
    sentence: {
      simplified: '过年我们一起包饺子。',
      pinyin: 'guò nián wǒ men yì qǐ bāo jiǎo zi.',
      english: 'We make dumplings together for the New Year.',
    },
  },
  {
    simplified: '豆腐',
    pinyin: 'dòu fu',
    english: 'tofu',
    sentence: {
      simplified: '这个豆腐很嫩。',
      pinyin: 'zhè ge dòu fu hěn nèn.',
      english: 'This tofu is very tender.',
    },
  },
  {
    simplified: '汤',
    pinyin: 'tāng',
    english: 'soup',
    sentence: {
      simplified: '这个汤有点儿咸。',
      pinyin: 'zhè ge tāng yǒu diǎnr xián.',
      english: 'This soup is a bit salty.',
    },
  },
  {
    simplified: '盐',
    pinyin: 'yán',
    english: 'salt',
    sentence: {
      simplified: '请在菜里放点儿盐。',
      pinyin: 'qǐng zài cài lǐ fàng diǎnr yán.',
      english: 'Please put some salt in the dish.',
    },
  },
  {
    simplified: '糖',
    pinyin: 'táng',
    english: 'sugar',
    sentence: {
      simplified: '我喝咖啡不放糖。',
      pinyin: 'wǒ hē kā fēi bú fàng táng.',
      english: "I don't put sugar in my coffee.",
    },
  },
  {
    simplified: '辣',
    pinyin: 'là',
    english: 'spicy',
    sentence: {
      simplified: '这个菜太辣了。',
      pinyin: 'zhè ge cài tài là le.',
      english: 'This dish is too spicy.',
    },
  },
  {
    simplified: '甜',
    pinyin: 'tián',
    english: 'sweet',
    sentence: {
      simplified: '这个蛋糕很甜。',
      pinyin: 'zhè ge dàn gāo hěn tián.',
      english: 'This cake is very sweet.',
    },
  },
  {
    simplified: '酸',
    pinyin: 'suān',
    english: 'sour',
    sentence: {
      simplified: '这个柠檬很酸。',
      pinyin: 'zhè ge níng méng hěn suān.',
      english: 'This lemon is very sour.',
    },
  },
  {
    simplified: '饿',
    pinyin: 'è',
    english: 'hungry',
    sentence: {
      simplified: '我饿了，想吃饭。',
      pinyin: 'wǒ è le, xiǎng chī fàn.',
      english: "I'm hungry, I want to eat.",
    },
  },
  {
    simplified: '渴',
    pinyin: 'kě',
    english: 'thirsty',
    sentence: {
      simplified: '我很渴，想喝水。',
      pinyin: 'wǒ hěn kě, xiǎng hē shuǐ.',
      english: "I'm very thirsty, I want some water.",
    },
  },
  {
    simplified: '吃',
    pinyin: 'chī',
    english: 'to eat',
    sentence: {
      simplified: '你想吃什么？',
      pinyin: 'nǐ xiǎng chī shén me?',
      english: 'What do you want to eat?',
    },
  },
  {
    simplified: '喝',
    pinyin: 'hē',
    english: 'to drink',
    sentence: {
      simplified: '你想喝点儿什么？',
      pinyin: 'nǐ xiǎng hē diǎnr shén me?',
      english: 'What would you like to drink?',
    },
  },
  {
    simplified: '饭',
    pinyin: 'fàn',
    english: 'meal / rice',
    sentence: {
      simplified: '你吃饭了吗？',
      pinyin: 'nǐ chī fàn le ma?',
      english: 'Have you eaten?',
    },
  },
  {
    simplified: '菜',
    pinyin: 'cài',
    english: 'dish / vegetable',
    sentence: {
      simplified: '这家饭店的菜很好吃。',
      pinyin: 'zhè jiā fàn diàn de cài hěn hǎo chī.',
      english: 'The food at this restaurant is delicious.',
    },
  },

  {
    simplified: '去',
    pinyin: 'qù',
    english: 'to go',
    sentence: {
      simplified: '我要去商店。',
      pinyin: 'wǒ yào qù shāng diàn.',
      english: "I'm going to the store.",
    },
  },
  {
    simplified: '来',
    pinyin: 'lái',
    english: 'to come',
    sentence: {
      simplified: '你什么时候来？',
      pinyin: 'nǐ shén me shí hou lái?',
      english: 'When are you coming?',
    },
  },
  {
    simplified: '看',
    pinyin: 'kàn',
    english: 'to look / to watch',
    sentence: {
      simplified: '我喜欢看电影。',
      pinyin: 'wǒ xǐ huan kàn diàn yǐng.',
      english: 'I like to watch movies.',
    },
  },
  {
    simplified: '听',
    pinyin: 'tīng',
    english: 'to listen',
    sentence: {
      simplified: '我喜欢听音乐。',
      pinyin: 'wǒ xǐ huan tīng yīn yuè.',
      english: 'I like listening to music.',
    },
  },
  {
    simplified: '说',
    pinyin: 'shuō',
    english: 'to speak / to say',
    sentence: {
      simplified: '他会说中文。',
      pinyin: 'tā huì shuō zhōng wén.',
      english: 'He can speak Chinese.',
    },
  },
  {
    simplified: '读',
    pinyin: 'dú',
    english: 'to read',
    sentence: {
      simplified: '我每天读报纸。',
      pinyin: 'wǒ měi tiān dú bào zhǐ.',
      english: 'I read the newspaper every day.',
    },
  },
  {
    simplified: '写',
    pinyin: 'xiě',
    english: 'to write',
    sentence: {
      simplified: '他在写一封信。',
      pinyin: 'tā zài xiě yì fēng xìn.',
      english: 'He is writing a letter.',
    },
  },
  {
    simplified: '学',
    pinyin: 'xué',
    english: 'to learn / to study',
    sentence: {
      simplified: '我在学中文。',
      pinyin: 'wǒ zài xué zhōng wén.',
      english: "I'm learning Chinese.",
    },
  },
  {
    simplified: '做',
    pinyin: 'zuò',
    english: 'to do / to make',
    sentence: {
      simplified: '你在做什么？',
      pinyin: 'nǐ zài zuò shén me?',
      english: 'What are you doing?',
    },
  },
  {
    simplified: '工作',
    pinyin: 'gōng zuò',
    english: 'to work / work',
    sentence: {
      simplified: '他在一家公司工作。',
      pinyin: 'tā zài yì jiā gōng sī gōng zuò.',
      english: 'He works at a company.',
    },
  },
  {
    simplified: '买',
    pinyin: 'mǎi',
    english: 'to buy',
    sentence: {
      simplified: '我想买一双鞋。',
      pinyin: 'wǒ xiǎng mǎi yì shuāng xié.',
      english: 'I want to buy a pair of shoes.',
    },
  },
  {
    simplified: '卖',
    pinyin: 'mài',
    english: 'to sell',
    sentence: {
      simplified: '这家店卖水果。',
      pinyin: 'zhè jiā diàn mài shuǐ guǒ.',
      english: 'This store sells fruit.',
    },
  },
  {
    simplified: '走',
    pinyin: 'zǒu',
    english: 'to walk',
    sentence: {
      simplified: '我们走路去吧。',
      pinyin: 'wǒ men zǒu lù qù ba.',
      english: "Let's walk there.",
    },
  },
  {
    simplified: '跑',
    pinyin: 'pǎo',
    english: 'to run',
    sentence: {
      simplified: '他每天早上跑步。',
      pinyin: 'tā měi tiān zǎo shang pǎo bù.',
      english: 'He runs every morning.',
    },
  },
  {
    simplified: '睡觉',
    pinyin: 'shuì jiào',
    english: 'to sleep',
    sentence: {
      simplified: '我每天十一点睡觉。',
      pinyin: 'wǒ měi tiān shí yī diǎn shuì jiào.',
      english: 'I go to sleep at eleven every day.',
    },
  },
  {
    simplified: '起床',
    pinyin: 'qǐ chuáng',
    english: 'to get up',
    sentence: {
      simplified: '我每天七点起床。',
      pinyin: 'wǒ měi tiān qī diǎn qǐ chuáng.',
      english: 'I get up at seven every day.',
    },
  },
  {
    simplified: '洗',
    pinyin: 'xǐ',
    english: 'to wash',
    sentence: {
      simplified: '吃饭前要洗手。',
      pinyin: 'chī fàn qián yào xǐ shǒu.',
      english: 'Wash your hands before eating.',
    },
  },
  {
    simplified: '穿',
    pinyin: 'chuān',
    english: 'to wear',
    sentence: {
      simplified: '今天很冷，多穿点儿。',
      pinyin: 'jīn tiān hěn lěng, duō chuān diǎnr.',
      english: "It's cold today, wear more.",
    },
  },
  {
    simplified: '开',
    pinyin: 'kāi',
    english: 'to open / to turn on',
    sentence: { simplified: '请开门。', pinyin: 'qǐng kāi mén.', english: 'Please open the door.' },
  },
  {
    simplified: '关',
    pinyin: 'guān',
    english: 'to close / to turn off',
    sentence: {
      simplified: '走的时候请关灯。',
      pinyin: 'zǒu de shí hou qǐng guān dēng.',
      english: 'Please turn off the light when you leave.',
    },
  },
  {
    simplified: '坐',
    pinyin: 'zuò',
    english: 'to sit',
    sentence: { simplified: '请坐这里。', pinyin: 'qǐng zuò zhè lǐ.', english: 'Please sit here.' },
  },
  {
    simplified: '站',
    pinyin: 'zhàn',
    english: 'to stand',
    sentence: {
      simplified: '他站在门口。',
      pinyin: 'tā zhàn zài mén kǒu.',
      english: 'He is standing at the door.',
    },
  },
  {
    simplified: '等',
    pinyin: 'děng',
    english: 'to wait',
    sentence: {
      simplified: '请等我一下。',
      pinyin: 'qǐng děng wǒ yí xià.',
      english: 'Please wait for me a moment.',
    },
  },
  {
    simplified: '给',
    pinyin: 'gěi',
    english: 'to give',
    sentence: {
      simplified: '请把书给我。',
      pinyin: 'qǐng bǎ shū gěi wǒ.',
      english: 'Please give me the book.',
    },
  },
  {
    simplified: '用',
    pinyin: 'yòng',
    english: 'to use',
    sentence: {
      simplified: '我可以用你的电脑吗？',
      pinyin: 'wǒ kě yǐ yòng nǐ de diàn nǎo ma?',
      english: 'Can I use your computer?',
    },
  },
  {
    simplified: '找',
    pinyin: 'zhǎo',
    english: 'to look for',
    sentence: {
      simplified: '我在找我的钥匙。',
      pinyin: 'wǒ zài zhǎo wǒ de yào shi.',
      english: "I'm looking for my keys.",
    },
  },
  {
    simplified: '回',
    pinyin: 'huí',
    english: 'to return',
    sentence: {
      simplified: '我想早点儿回家。',
      pinyin: 'wǒ xiǎng zǎo diǎnr huí jiā.',
      english: 'I want to go home a bit early.',
    },
  },
  {
    simplified: '打电话',
    pinyin: 'dǎ diàn huà',
    english: 'to make a phone call',
    sentence: {
      simplified: '我给妈妈打电话。',
      pinyin: 'wǒ gěi mā ma dǎ diàn huà.',
      english: "I'm calling my mom.",
    },
  },
  {
    simplified: '帮忙',
    pinyin: 'bāng máng',
    english: 'to help',
    sentence: {
      simplified: '谢谢你来帮忙。',
      pinyin: 'xiè xie nǐ lái bāng máng.',
      english: 'Thank you for coming to help.',
    },
  },
  {
    simplified: '开始',
    pinyin: 'kāi shǐ',
    english: 'to begin',
    sentence: {
      simplified: '电影几点开始？',
      pinyin: 'diàn yǐng jǐ diǎn kāi shǐ?',
      english: 'What time does the movie start?',
    },
  },

  {
    simplified: '中国',
    pinyin: 'zhōng guó',
    english: 'China',
    sentence: {
      simplified: '我想去中国旅行。',
      pinyin: 'wǒ xiǎng qù zhōng guó lǚ xíng.',
      english: 'I want to travel to China.',
    },
  },
  {
    simplified: '美国',
    pinyin: 'měi guó',
    english: 'America',
    sentence: {
      simplified: '他来自美国。',
      pinyin: 'tā lái zì měi guó.',
      english: 'He comes from America.',
    },
  },
  {
    simplified: '学校',
    pinyin: 'xué xiào',
    english: 'school',
    sentence: {
      simplified: '我的学校离家很近。',
      pinyin: 'wǒ de xué xiào lí jiā hěn jìn.',
      english: 'My school is close to home.',
    },
  },
  {
    simplified: '医院',
    pinyin: 'yī yuàn',
    english: 'hospital',
    sentence: {
      simplified: '他去医院看病了。',
      pinyin: 'tā qù yī yuàn kàn bìng le.',
      english: 'He went to the hospital to see a doctor.',
    },
  },
  {
    simplified: '商店',
    pinyin: 'shāng diàn',
    english: 'store / shop',
    sentence: {
      simplified: '这家商店东西很多。',
      pinyin: 'zhè jiā shāng diàn dōng xi hěn duō.',
      english: 'This store has a lot of things.',
    },
  },
  {
    simplified: '饭店',
    pinyin: 'fàn diàn',
    english: 'restaurant',
    sentence: {
      simplified: '我们去饭店吃饭吧。',
      pinyin: 'wǒ men qù fàn diàn chī fàn ba.',
      english: "Let's go eat at a restaurant.",
    },
  },
  {
    simplified: '机场',
    pinyin: 'jī chǎng',
    english: 'airport',
    sentence: {
      simplified: '我去机场接朋友。',
      pinyin: 'wǒ qù jī chǎng jiē péng you.',
      english: "I'm going to the airport to pick up a friend.",
    },
  },
  {
    simplified: '火车站',
    pinyin: 'huǒ chē zhàn',
    english: 'train station',
    sentence: {
      simplified: '火车站离这里远吗？',
      pinyin: 'huǒ chē zhàn lí zhè lǐ yuǎn ma?',
      english: 'Is the train station far from here?',
    },
  },
  {
    simplified: '公园',
    pinyin: 'gōng yuán',
    english: 'park',
    sentence: {
      simplified: '我们去公园散步吧。',
      pinyin: 'wǒ men qù gōng yuán sàn bù ba.',
      english: "Let's take a walk in the park.",
    },
  },
  {
    simplified: '银行',
    pinyin: 'yín háng',
    english: 'bank',
    sentence: {
      simplified: '我要去银行取钱。',
      pinyin: 'wǒ yào qù yín háng qǔ qián.',
      english: 'I need to go to the bank to withdraw money.',
    },
  },
  {
    simplified: '超市',
    pinyin: 'chāo shì',
    english: 'supermarket',
    sentence: {
      simplified: '我去超市买东西。',
      pinyin: 'wǒ qù chāo shì mǎi dōng xi.',
      english: "I'm going to the supermarket to buy things.",
    },
  },
  {
    simplified: '图书馆',
    pinyin: 'tú shū guǎn',
    english: 'library',
    sentence: {
      simplified: '我在图书馆看书。',
      pinyin: 'wǒ zài tú shū guǎn kàn shū.',
      english: 'I read books at the library.',
    },
  },
  {
    simplified: '厕所',
    pinyin: 'cè suǒ',
    english: 'restroom',
    sentence: {
      simplified: '请问厕所在哪里？',
      pinyin: 'qǐng wèn cè suǒ zài nǎ lǐ?',
      english: 'Excuse me, where is the restroom?',
    },
  },
  {
    simplified: '地铁站',
    pinyin: 'dì tiě zhàn',
    english: 'subway station',
    sentence: {
      simplified: '地铁站就在前面。',
      pinyin: 'dì tiě zhàn jiù zài qián miàn.',
      english: 'The subway station is right ahead.',
    },
  },
  {
    simplified: '办公室',
    pinyin: 'bàn gōng shì',
    english: 'office',
    sentence: {
      simplified: '老板在办公室里。',
      pinyin: 'lǎo bǎn zài bàn gōng shì lǐ.',
      english: 'The boss is in the office.',
    },
  },

  {
    simplified: '头',
    pinyin: 'tóu',
    english: 'head',
    sentence: {
      simplified: '我今天头有点儿疼。',
      pinyin: 'wǒ jīn tiān tóu yǒu diǎnr téng.',
      english: 'My head hurts a little today.',
    },
  },
  {
    simplified: '眼睛',
    pinyin: 'yǎn jing',
    english: 'eye(s)',
    sentence: {
      simplified: '她的眼睛很漂亮。',
      pinyin: 'tā de yǎn jing hěn piào liang.',
      english: 'Her eyes are very beautiful.',
    },
  },
  {
    simplified: '耳朵',
    pinyin: 'ěr duo',
    english: 'ear(s)',
    sentence: {
      simplified: '兔子的耳朵很长。',
      pinyin: 'tù zi de ěr duo hěn cháng.',
      english: "A rabbit's ears are very long.",
    },
  },
  {
    simplified: '嘴',
    pinyin: 'zuǐ',
    english: 'mouth',
    sentence: {
      simplified: '请张开嘴。',
      pinyin: 'qǐng zhāng kāi zuǐ.',
      english: 'Please open your mouth.',
    },
  },
  {
    simplified: '手',
    pinyin: 'shǒu',
    english: 'hand',
    sentence: {
      simplified: '吃饭前要洗手。',
      pinyin: 'chī fàn qián yào xǐ shǒu.',
      english: 'Wash your hands before eating.',
    },
  },
  {
    simplified: '脚',
    pinyin: 'jiǎo',
    english: 'foot',
    sentence: {
      simplified: '我的脚很疼。',
      pinyin: 'wǒ de jiǎo hěn téng.',
      english: 'My feet hurt a lot.',
    },
  },
  {
    simplified: '身体',
    pinyin: 'shēn tǐ',
    english: 'body',
    sentence: {
      simplified: '多锻炼对身体好。',
      pinyin: 'duō duàn liàn duì shēn tǐ hǎo.',
      english: 'Exercising more is good for the body.',
    },
  },
  {
    simplified: '医生',
    pinyin: 'yī shēng',
    english: 'doctor',
    sentence: {
      simplified: '医生让我多休息。',
      pinyin: 'yī shēng ràng wǒ duō xiū xi.',
      english: 'The doctor told me to rest more.',
    },
  },
  {
    simplified: '药',
    pinyin: 'yào',
    english: 'medicine',
    sentence: {
      simplified: '你要按时吃药。',
      pinyin: 'nǐ yào àn shí chī yào.',
      english: 'You need to take your medicine on time.',
    },
  },
  {
    simplified: '病',
    pinyin: 'bìng',
    english: 'sick / illness',
    sentence: {
      simplified: '他生病了，不能来。',
      pinyin: 'tā shēng bìng le, bù néng lái.',
      english: "He is sick and can't come.",
    },
  },
  {
    simplified: '疼',
    pinyin: 'téng',
    english: 'painful / ache',
    sentence: {
      simplified: '我的牙很疼。',
      pinyin: 'wǒ de yá hěn téng.',
      english: 'My tooth hurts a lot.',
    },
  },
  {
    simplified: '舒服',
    pinyin: 'shū fu',
    english: 'comfortable',
    sentence: {
      simplified: '我今天不太舒服。',
      pinyin: 'wǒ jīn tiān bú tài shū fu.',
      english: "I don't feel very well today.",
    },
  },
  {
    simplified: '累',
    pinyin: 'lèi',
    english: 'tired',
    sentence: {
      simplified: '工作了一天，我很累。',
      pinyin: 'gōng zuò le yì tiān, wǒ hěn lèi.',
      english: "After working all day, I'm very tired.",
    },
  },
  {
    simplified: '心',
    pinyin: 'xīn',
    english: 'heart / mind',
    sentence: {
      simplified: '他是一个好心的人。',
      pinyin: 'tā shì yí ge hǎo xīn de rén.',
      english: 'He is a kind-hearted person.',
    },
  },
  {
    simplified: '牙',
    pinyin: 'yá',
    english: 'tooth',
    sentence: {
      simplified: '我每天刷两次牙。',
      pinyin: 'wǒ měi tiān shuā liǎng cì yá.',
      english: 'I brush my teeth twice a day.',
    },
  },

  {
    simplified: '天气',
    pinyin: 'tiān qì',
    english: 'weather',
    sentence: {
      simplified: '今天天气很好。',
      pinyin: 'jīn tiān tiān qì hěn hǎo.',
      english: 'The weather is nice today.',
    },
  },
  {
    simplified: '太阳',
    pinyin: 'tài yáng',
    english: 'sun',
    sentence: {
      simplified: '今天太阳很大。',
      pinyin: 'jīn tiān tài yáng hěn dà.',
      english: 'The sun is strong today.',
    },
  },
  {
    simplified: '月亮',
    pinyin: 'yuè liang',
    english: 'moon',
    sentence: {
      simplified: '今晚的月亮很圆。',
      pinyin: 'jīn wǎn de yuè liang hěn yuán.',
      english: 'The moon is very round tonight.',
    },
  },
  {
    simplified: '星星',
    pinyin: 'xīng xing',
    english: 'star(s)',
    sentence: {
      simplified: '晚上天上有很多星星。',
      pinyin: 'wǎn shang tiān shàng yǒu hěn duō xīng xing.',
      english: 'There are many stars in the sky at night.',
    },
  },
  {
    simplified: '下雨',
    pinyin: 'xià yǔ',
    english: 'to rain',
    sentence: {
      simplified: '今天下雨了，记得带伞。',
      pinyin: 'jīn tiān xià yǔ le, jì de dài sǎn.',
      english: "It's raining today, remember to bring an umbrella.",
    },
  },
  {
    simplified: '下雪',
    pinyin: 'xià xuě',
    english: 'to snow',
    sentence: {
      simplified: '冬天这里常常下雪。',
      pinyin: 'dōng tiān zhè lǐ cháng cháng xià xuě.',
      english: 'It often snows here in winter.',
    },
  },
  {
    simplified: '风',
    pinyin: 'fēng',
    english: 'wind',
    sentence: {
      simplified: '今天风很大。',
      pinyin: 'jīn tiān fēng hěn dà.',
      english: "It's very windy today.",
    },
  },
  {
    simplified: '冷',
    pinyin: 'lěng',
    english: 'cold',
    sentence: {
      simplified: '今天很冷，多穿衣服。',
      pinyin: 'jīn tiān hěn lěng, duō chuān yī fu.',
      english: "It's cold today, wear more clothes.",
    },
  },
  {
    simplified: '热',
    pinyin: 'rè',
    english: 'hot',
    sentence: {
      simplified: '夏天很热。',
      pinyin: 'xià tiān hěn rè.',
      english: 'Summer is very hot.',
    },
  },
  {
    simplified: '暖和',
    pinyin: 'nuǎn huo',
    english: 'warm',
    sentence: {
      simplified: '春天的天气很暖和。',
      pinyin: 'chūn tiān de tiān qì hěn nuǎn huo.',
      english: 'The weather in spring is warm.',
    },
  },
  {
    simplified: '花',
    pinyin: 'huā',
    english: 'flower',
    sentence: {
      simplified: '公园里的花很漂亮。',
      pinyin: 'gōng yuán lǐ de huā hěn piào liang.',
      english: 'The flowers in the park are beautiful.',
    },
  },
  {
    simplified: '树',
    pinyin: 'shù',
    english: 'tree',
    sentence: {
      simplified: '门前有一棵大树。',
      pinyin: 'mén qián yǒu yì kē dà shù.',
      english: "There's a big tree in front of the door.",
    },
  },
  {
    simplified: '山',
    pinyin: 'shān',
    english: 'mountain',
    sentence: {
      simplified: '我们周末去爬山。',
      pinyin: 'wǒ men zhōu mò qù pá shān.',
      english: 'We go mountain climbing on weekends.',
    },
  },
  {
    simplified: '河',
    pinyin: 'hé',
    english: 'river',
    sentence: {
      simplified: '这条河很长。',
      pinyin: 'zhè tiáo hé hěn cháng.',
      english: 'This river is very long.',
    },
  },
  {
    simplified: '海',
    pinyin: 'hǎi',
    english: 'sea / ocean',
    sentence: {
      simplified: '我喜欢看海。',
      pinyin: 'wǒ xǐ huan kàn hǎi.',
      english: 'I like looking at the sea.',
    },
  },

  {
    simplified: '红色',
    pinyin: 'hóng sè',
    english: 'red',
    sentence: {
      simplified: '我喜欢红色的花。',
      pinyin: 'wǒ xǐ huan hóng sè de huā.',
      english: 'I like red flowers.',
    },
  },
  {
    simplified: '蓝色',
    pinyin: 'lán sè',
    english: 'blue',
    sentence: {
      simplified: '天空是蓝色的。',
      pinyin: 'tiān kōng shì lán sè de.',
      english: 'The sky is blue.',
    },
  },
  {
    simplified: '绿色',
    pinyin: 'lǜ sè',
    english: 'green',
    sentence: {
      simplified: '树叶是绿色的。',
      pinyin: 'shù yè shì lǜ sè de.',
      english: 'The leaves are green.',
    },
  },
  {
    simplified: '黄色',
    pinyin: 'huáng sè',
    english: 'yellow',
    sentence: {
      simplified: '这朵花是黄色的。',
      pinyin: 'zhè duǒ huā shì huáng sè de.',
      english: 'This flower is yellow.',
    },
  },
  {
    simplified: '白色',
    pinyin: 'bái sè',
    english: 'white',
    sentence: {
      simplified: '他买了一件白色的衬衫。',
      pinyin: 'tā mǎi le yí jiàn bái sè de chèn shān.',
      english: 'He bought a white shirt.',
    },
  },
  {
    simplified: '黑色',
    pinyin: 'hēi sè',
    english: 'black',
    sentence: {
      simplified: '我喜欢黑色的车。',
      pinyin: 'wǒ xǐ huan hēi sè de chē.',
      english: 'I like black cars.',
    },
  },
  {
    simplified: '颜色',
    pinyin: 'yán sè',
    english: 'color',
    sentence: {
      simplified: '你最喜欢什么颜色？',
      pinyin: 'nǐ zuì xǐ huan shén me yán sè?',
      english: "What's your favorite color?",
    },
  },

  {
    simplified: '大',
    pinyin: 'dà',
    english: 'big',
    sentence: {
      simplified: '他家很大。',
      pinyin: 'tā jiā hěn dà.',
      english: 'His home is very big.',
    },
  },
  {
    simplified: '小',
    pinyin: 'xiǎo',
    english: 'small',
    sentence: {
      simplified: '这个房间太小了。',
      pinyin: 'zhè ge fáng jiān tài xiǎo le.',
      english: 'This room is too small.',
    },
  },
  {
    simplified: '多',
    pinyin: 'duō',
    english: 'many / much',
    sentence: {
      simplified: '今天人很多。',
      pinyin: 'jīn tiān rén hěn duō.',
      english: 'There are a lot of people today.',
    },
  },
  {
    simplified: '少',
    pinyin: 'shǎo',
    english: 'few / little',
    sentence: {
      simplified: '今天作业很少。',
      pinyin: 'jīn tiān zuò yè hěn shǎo.',
      english: "There's little homework today.",
    },
  },
  {
    simplified: '新',
    pinyin: 'xīn',
    english: 'new',
    sentence: {
      simplified: '我买了一辆新车。',
      pinyin: 'wǒ mǎi le yí liàng xīn chē.',
      english: 'I bought a new car.',
    },
  },
  {
    simplified: '旧',
    pinyin: 'jiù',
    english: 'old (things)',
    sentence: {
      simplified: '这本书很旧了。',
      pinyin: 'zhè běn shū hěn jiù le.',
      english: 'This book is very old.',
    },
  },
  {
    simplified: '好',
    pinyin: 'hǎo',
    english: 'good',
    sentence: {
      simplified: '这是个好主意。',
      pinyin: 'zhè shì ge hǎo zhǔ yi.',
      english: 'This is a good idea.',
    },
  },
  {
    simplified: '坏',
    pinyin: 'huài',
    english: 'bad',
    sentence: {
      simplified: '这个鸡蛋坏了。',
      pinyin: 'zhè ge jī dàn huài le.',
      english: 'This egg has gone bad.',
    },
  },
  {
    simplified: '快',
    pinyin: 'kuài',
    english: 'fast',
    sentence: {
      simplified: '他跑得很快。',
      pinyin: 'tā pǎo de hěn kuài.',
      english: 'He runs very fast.',
    },
  },
  {
    simplified: '慢',
    pinyin: 'màn',
    english: 'slow',
    sentence: {
      simplified: '请说慢一点儿。',
      pinyin: 'qǐng shuō màn yì diǎnr.',
      english: 'Please speak a little slower.',
    },
  },
  {
    simplified: '长',
    pinyin: 'cháng',
    english: 'long',
    sentence: {
      simplified: '这条路很长。',
      pinyin: 'zhè tiáo lù hěn cháng.',
      english: 'This road is very long.',
    },
  },
  {
    simplified: '短',
    pinyin: 'duǎn',
    english: 'short (length)',
    sentence: {
      simplified: '这条裙子有点儿短。',
      pinyin: 'zhè tiáo qún zi yǒu diǎnr duǎn.',
      english: 'This skirt is a bit short.',
    },
  },
  {
    simplified: '高',
    pinyin: 'gāo',
    english: 'tall / high',
    sentence: {
      simplified: '他长得很高。',
      pinyin: 'tā zhǎng de hěn gāo.',
      english: 'He is very tall.',
    },
  },
  {
    simplified: '矮',
    pinyin: 'ǎi',
    english: 'short (height)',
    sentence: {
      simplified: '我弟弟比我矮。',
      pinyin: 'wǒ dì di bǐ wǒ ǎi.',
      english: 'My younger brother is shorter than me.',
    },
  },
  {
    simplified: '漂亮',
    pinyin: 'piào liang',
    english: 'beautiful',
    sentence: {
      simplified: '这条裙子很漂亮。',
      pinyin: 'zhè tiáo qún zi hěn piào liang.',
      english: 'This dress is beautiful.',
    },
  },
  {
    simplified: '便宜',
    pinyin: 'pián yi',
    english: 'cheap',
    sentence: {
      simplified: '这件衣服很便宜。',
      pinyin: 'zhè jiàn yī fu hěn pián yi.',
      english: 'This piece of clothing is cheap.',
    },
  },
  {
    simplified: '贵',
    pinyin: 'guì',
    english: 'expensive',
    sentence: {
      simplified: '这个手机太贵了。',
      pinyin: 'zhè ge shǒu jī tài guì le.',
      english: 'This phone is too expensive.',
    },
  },
  {
    simplified: '难',
    pinyin: 'nán',
    english: 'difficult',
    sentence: {
      simplified: '中文很难，但是很有意思。',
      pinyin: 'zhōng wén hěn nán, dàn shì hěn yǒu yì si.',
      english: 'Chinese is difficult but interesting.',
    },
  },
  {
    simplified: '容易',
    pinyin: 'róng yì',
    english: 'easy',
    sentence: {
      simplified: '这个问题很容易。',
      pinyin: 'zhè ge wèn tí hěn róng yì.',
      english: 'This question is very easy.',
    },
  },
  {
    simplified: '重要',
    pinyin: 'zhòng yào',
    english: 'important',
    sentence: {
      simplified: '健康非常重要。',
      pinyin: 'jiàn kāng fēi cháng zhòng yào.',
      english: 'Health is very important.',
    },
  },
  {
    simplified: '忙',
    pinyin: 'máng',
    english: 'busy',
    sentence: {
      simplified: '我今天很忙。',
      pinyin: 'wǒ jīn tiān hěn máng.',
      english: "I'm very busy today.",
    },
  },
  {
    simplified: '远',
    pinyin: 'yuǎn',
    english: 'far',
    sentence: {
      simplified: '学校离我家很远。',
      pinyin: 'xué xiào lí wǒ jiā hěn yuǎn.',
      english: 'The school is far from my home.',
    },
  },
  {
    simplified: '近',
    pinyin: 'jìn',
    english: 'near / close',
    sentence: {
      simplified: '商店离这儿很近。',
      pinyin: 'shāng diàn lí zhèr hěn jìn.',
      english: 'The store is close to here.',
    },
  },
  {
    simplified: '干净',
    pinyin: 'gān jìng',
    english: 'clean',
    sentence: {
      simplified: '这个房间很干净。',
      pinyin: 'zhè ge fáng jiān hěn gān jìng.',
      english: 'This room is very clean.',
    },
  },
  {
    simplified: '安静',
    pinyin: 'ān jìng',
    english: 'quiet',
    sentence: {
      simplified: '图书馆里很安静。',
      pinyin: 'tú shū guǎn lǐ hěn ān jìng.',
      english: "It's very quiet in the library.",
    },
  },

  {
    simplified: '高兴',
    pinyin: 'gāo xìng',
    english: 'happy',
    sentence: {
      simplified: '见到你我很高兴。',
      pinyin: 'jiàn dào nǐ wǒ hěn gāo xìng.',
      english: "I'm very happy to see you.",
    },
  },
  {
    simplified: '难过',
    pinyin: 'nán guò',
    english: 'sad',
    sentence: {
      simplified: '听到这个消息我很难过。',
      pinyin: 'tīng dào zhè ge xiāo xi wǒ hěn nán guò.',
      english: "I'm sad to hear this news.",
    },
  },
  {
    simplified: '生气',
    pinyin: 'shēng qì',
    english: 'angry',
    sentence: {
      simplified: '他生气了，不说话。',
      pinyin: 'tā shēng qì le, bù shuō huà.',
      english: "He got angry and won't talk.",
    },
  },
  {
    simplified: '害怕',
    pinyin: 'hài pà',
    english: 'afraid',
    sentence: {
      simplified: '她一个人在家有点儿害怕。',
      pinyin: 'tā yí ge rén zài jiā yǒu diǎnr hài pà.',
      english: "She's a bit scared being home alone.",
    },
  },
  {
    simplified: '喜欢',
    pinyin: 'xǐ huan',
    english: 'to like',
    sentence: {
      simplified: '我喜欢听音乐。',
      pinyin: 'wǒ xǐ huan tīng yīn yuè.',
      english: 'I like listening to music.',
    },
  },
  {
    simplified: '爱',
    pinyin: 'ài',
    english: 'to love',
    sentence: {
      simplified: '我爱我的家人。',
      pinyin: 'wǒ ài wǒ de jiā rén.',
      english: 'I love my family.',
    },
  },
  {
    simplified: '想',
    pinyin: 'xiǎng',
    english: 'to think / to miss',
    sentence: {
      simplified: '我很想家。',
      pinyin: 'wǒ hěn xiǎng jiā.',
      english: 'I miss home a lot.',
    },
  },
  {
    simplified: '觉得',
    pinyin: 'jué de',
    english: 'to feel / to think',
    sentence: {
      simplified: '我觉得这个电影很好看。',
      pinyin: 'wǒ jué de zhè ge diàn yǐng hěn hǎo kàn.',
      english: 'I think this movie is really good.',
    },
  },
  {
    simplified: '希望',
    pinyin: 'xī wàng',
    english: 'to hope',
    sentence: {
      simplified: '我希望明天天气好。',
      pinyin: 'wǒ xī wàng míng tiān tiān qì hǎo.',
      english: 'I hope the weather is good tomorrow.',
    },
  },
  {
    simplified: '担心',
    pinyin: 'dān xīn',
    english: 'to worry',
    sentence: {
      simplified: '妈妈很担心我。',
      pinyin: 'mā ma hěn dān xīn wǒ.',
      english: 'Mom worries about me a lot.',
    },
  },
  {
    simplified: '开心',
    pinyin: 'kāi xīn',
    english: 'happy / joyful',
    sentence: {
      simplified: '今天我玩儿得很开心。',
      pinyin: 'jīn tiān wǒ wánr de hěn kāi xīn.',
      english: 'I had a really good time today.',
    },
  },
  {
    simplified: '有意思',
    pinyin: 'yǒu yì si',
    english: 'interesting',
    sentence: {
      simplified: '这本书很有意思。',
      pinyin: 'zhè běn shū hěn yǒu yì si.',
      english: 'This book is very interesting.',
    },
  },
  {
    simplified: '无聊',
    pinyin: 'wú liáo',
    english: 'bored / boring',
    sentence: {
      simplified: '今天没事做，真无聊。',
      pinyin: 'jīn tiān méi shì zuò, zhēn wú liáo.',
      english: "There's nothing to do today, so boring.",
    },
  },
  {
    simplified: '紧张',
    pinyin: 'jǐn zhāng',
    english: 'nervous',
    sentence: {
      simplified: '考试前我很紧张。',
      pinyin: 'kǎo shì qián wǒ hěn jǐn zhāng.',
      english: "I'm nervous before exams.",
    },
  },
  {
    simplified: '满意',
    pinyin: 'mǎn yì',
    english: 'satisfied',
    sentence: {
      simplified: '老板对我的工作很满意。',
      pinyin: 'lǎo bǎn duì wǒ de gōng zuò hěn mǎn yì.',
      english: 'The boss is satisfied with my work.',
    },
  },

  {
    simplified: '钱',
    pinyin: 'qián',
    english: 'money',
    sentence: {
      simplified: '我没带钱。',
      pinyin: 'wǒ méi dài qián.',
      english: "I didn't bring money.",
    },
  },
  {
    simplified: '多少钱',
    pinyin: 'duō shǎo qián',
    english: 'how much?',
    sentence: {
      simplified: '这个多少钱？',
      pinyin: 'zhè ge duō shǎo qián?',
      english: 'How much is this?',
    },
  },
  {
    simplified: '块',
    pinyin: 'kuài',
    english: 'yuan (spoken)',
    sentence: {
      simplified: '这个苹果三块钱。',
      pinyin: 'zhè ge píng guǒ sān kuài qián.',
      english: 'This apple is three yuan.',
    },
  },
  {
    simplified: '太贵了',
    pinyin: 'tài guì le',
    english: 'too expensive',
    sentence: {
      simplified: '这个太贵了，便宜点儿吧。',
      pinyin: 'zhè ge tài guì le, pián yi diǎnr ba.',
      english: 'This is too expensive, make it cheaper.',
    },
  },
  {
    simplified: '打折',
    pinyin: 'dǎ zhé',
    english: 'discount',
    sentence: {
      simplified: '这件衣服现在打折。',
      pinyin: 'zhè jiàn yī fu xiàn zài dǎ zhé.',
      english: 'This piece of clothing is on sale now.',
    },
  },
  {
    simplified: '信用卡',
    pinyin: 'xìn yòng kǎ',
    english: 'credit card',
    sentence: {
      simplified: '这里可以用信用卡吗？',
      pinyin: 'zhè lǐ kě yǐ yòng xìn yòng kǎ ma?',
      english: 'Can I use a credit card here?',
    },
  },
  {
    simplified: '付钱',
    pinyin: 'fù qián',
    english: 'to pay',
    sentence: { simplified: '我来付钱。', pinyin: 'wǒ lái fù qián.', english: "I'll pay." },
  },
  {
    simplified: '找零',
    pinyin: 'zhǎo líng',
    english: 'change (money)',
    sentence: {
      simplified: '不用找零了。',
      pinyin: 'bú yòng zhǎo líng le.',
      english: 'Keep the change.',
    },
  },
  {
    simplified: '收据',
    pinyin: 'shōu jù',
    english: 'receipt',
    sentence: {
      simplified: '请给我一张收据。',
      pinyin: 'qǐng gěi wǒ yì zhāng shōu jù.',
      english: 'Please give me a receipt.',
    },
  },
  {
    simplified: '袋子',
    pinyin: 'dài zi',
    english: 'bag',
    sentence: {
      simplified: '我需要一个袋子。',
      pinyin: 'wǒ xū yào yí ge dài zi.',
      english: 'I need a bag.',
    },
  },

  {
    simplified: '车',
    pinyin: 'chē',
    english: 'car / vehicle',
    sentence: {
      simplified: '我开车去上班。',
      pinyin: 'wǒ kāi chē qù shàng bān.',
      english: 'I drive to work.',
    },
  },
  {
    simplified: '公共汽车',
    pinyin: 'gōng gòng qì chē',
    english: 'bus',
    sentence: {
      simplified: '我坐公共汽车去学校。',
      pinyin: 'wǒ zuò gōng gòng qì chē qù xué xiào.',
      english: 'I take the bus to school.',
    },
  },
  {
    simplified: '出租车',
    pinyin: 'chū zū chē',
    english: 'taxi',
    sentence: {
      simplified: '我们打一辆出租车吧。',
      pinyin: 'wǒ men dǎ yí liàng chū zū chē ba.',
      english: "Let's take a taxi.",
    },
  },
  {
    simplified: '地铁',
    pinyin: 'dì tiě',
    english: 'subway',
    sentence: {
      simplified: '坐地铁很方便。',
      pinyin: 'zuò dì tiě hěn fāng biàn.',
      english: 'Taking the subway is convenient.',
    },
  },
  {
    simplified: '火车',
    pinyin: 'huǒ chē',
    english: 'train',
    sentence: {
      simplified: '我坐火车去北京。',
      pinyin: 'wǒ zuò huǒ chē qù běi jīng.',
      english: 'I take the train to Beijing.',
    },
  },
  {
    simplified: '飞机',
    pinyin: 'fēi jī',
    english: 'airplane',
    sentence: {
      simplified: '坐飞机比坐火车快。',
      pinyin: 'zuò fēi jī bǐ zuò huǒ chē kuài.',
      english: 'Flying is faster than taking the train.',
    },
  },
  {
    simplified: '自行车',
    pinyin: 'zì xíng chē',
    english: 'bicycle',
    sentence: {
      simplified: '我骑自行车上学。',
      pinyin: 'wǒ qí zì xíng chē shàng xué.',
      english: 'I ride a bicycle to school.',
    },
  },
  {
    simplified: '路',
    pinyin: 'lù',
    english: 'road',
    sentence: {
      simplified: '这条路很宽。',
      pinyin: 'zhè tiáo lù hěn kuān.',
      english: 'This road is very wide.',
    },
  },
  {
    simplified: '左',
    pinyin: 'zuǒ',
    english: 'left',
    sentence: {
      simplified: '往左拐就到了。',
      pinyin: 'wǎng zuǒ guǎi jiù dào le.',
      english: "Turn left and you'll be there.",
    },
  },
  {
    simplified: '右',
    pinyin: 'yòu',
    english: 'right',
    sentence: {
      simplified: '银行在你的右边。',
      pinyin: 'yín háng zài nǐ de yòu biān.',
      english: 'The bank is on your right.',
    },
  },
  {
    simplified: '前面',
    pinyin: 'qián miàn',
    english: 'in front',
    sentence: {
      simplified: '学校就在前面。',
      pinyin: 'xué xiào jiù zài qián miàn.',
      english: 'The school is right ahead.',
    },
  },
  {
    simplified: '后面',
    pinyin: 'hòu miàn',
    english: 'behind',
    sentence: {
      simplified: '厕所在房子的后面。',
      pinyin: 'cè suǒ zài fáng zi de hòu miàn.',
      english: 'The restroom is behind the house.',
    },
  },
  {
    simplified: '上面',
    pinyin: 'shàng miàn',
    english: 'above / on top',
    sentence: {
      simplified: '书在桌子上面。',
      pinyin: 'shū zài zhuō zi shàng miàn.',
      english: 'The book is on top of the table.',
    },
  },
  {
    simplified: '下面',
    pinyin: 'xià miàn',
    english: 'below / under',
    sentence: {
      simplified: '猫在桌子下面。',
      pinyin: 'māo zài zhuō zi xià miàn.',
      english: 'The cat is under the table.',
    },
  },
  {
    simplified: '旁边',
    pinyin: 'páng biān',
    english: 'beside / next to',
    sentence: {
      simplified: '银行在超市旁边。',
      pinyin: 'yín háng zài chāo shì páng biān.',
      english: 'The bank is next to the supermarket.',
    },
  },

  {
    simplified: '手机',
    pinyin: 'shǒu jī',
    english: 'cellphone',
    sentence: {
      simplified: '我的手机没电了。',
      pinyin: 'wǒ de shǒu jī méi diàn le.',
      english: 'My phone is out of battery.',
    },
  },
  {
    simplified: '电脑',
    pinyin: 'diàn nǎo',
    english: 'computer',
    sentence: {
      simplified: '我用电脑工作。',
      pinyin: 'wǒ yòng diàn nǎo gōng zuò.',
      english: 'I work on a computer.',
    },
  },
  {
    simplified: '网',
    pinyin: 'wǎng',
    english: 'internet / net',
    sentence: {
      simplified: '这里可以上网吗？',
      pinyin: 'zhè lǐ kě yǐ shàng wǎng ma?',
      english: 'Can I get online here?',
    },
  },
  {
    simplified: '密码',
    pinyin: 'mì mǎ',
    english: 'password',
    sentence: {
      simplified: '我忘了密码。',
      pinyin: 'wǒ wàng le mì mǎ.',
      english: 'I forgot my password.',
    },
  },
  {
    simplified: '照片',
    pinyin: 'zhào piàn',
    english: 'photo',
    sentence: {
      simplified: '我们一起照张照片吧。',
      pinyin: 'wǒ men yì qǐ zhào zhāng zhào piàn ba.',
      english: "Let's take a photo together.",
    },
  },
  {
    simplified: '电影',
    pinyin: 'diàn yǐng',
    english: 'movie',
    sentence: {
      simplified: '这个电影很好看。',
      pinyin: 'zhè ge diàn yǐng hěn hǎo kàn.',
      english: 'This movie is really good.',
    },
  },
  {
    simplified: '音乐',
    pinyin: 'yīn yuè',
    english: 'music',
    sentence: {
      simplified: '我喜欢听中国音乐。',
      pinyin: 'wǒ xǐ huan tīng zhōng guó yīn yuè.',
      english: 'I like listening to Chinese music.',
    },
  },
  {
    simplified: '游戏',
    pinyin: 'yóu xì',
    english: 'game',
    sentence: {
      simplified: '弟弟很喜欢玩游戏。',
      pinyin: 'dì di hěn xǐ huan wán yóu xì.',
      english: 'My brother loves playing games.',
    },
  },
  {
    simplified: '消息',
    pinyin: 'xiāo xi',
    english: 'message / news',
    sentence: {
      simplified: '我收到了一个好消息。',
      pinyin: 'wǒ shōu dào le yí ge hǎo xiāo xi.',
      english: 'I received some good news.',
    },
  },
  {
    simplified: '视频',
    pinyin: 'shì pín',
    english: 'video',
    sentence: {
      simplified: '我们一起看个视频吧。',
      pinyin: 'wǒ men yì qǐ kàn ge shì pín ba.',
      english: "Let's watch a video together.",
    },
  },

  {
    simplified: '书',
    pinyin: 'shū',
    english: 'book',
    sentence: {
      simplified: '这本书很有意思。',
      pinyin: 'zhè běn shū hěn yǒu yì si.',
      english: 'This book is very interesting.',
    },
  },
  {
    simplified: '笔',
    pinyin: 'bǐ',
    english: 'pen',
    sentence: {
      simplified: '我可以借你的笔吗？',
      pinyin: 'wǒ kě yǐ jiè nǐ de bǐ ma?',
      english: 'Can I borrow your pen?',
    },
  },
  {
    simplified: '纸',
    pinyin: 'zhǐ',
    english: 'paper',
    sentence: {
      simplified: '请给我一张纸。',
      pinyin: 'qǐng gěi wǒ yì zhāng zhǐ.',
      english: 'Please give me a piece of paper.',
    },
  },
  {
    simplified: '桌子',
    pinyin: 'zhuō zi',
    english: 'table / desk',
    sentence: {
      simplified: '书在桌子上。',
      pinyin: 'shū zài zhuō zi shàng.',
      english: 'The book is on the table.',
    },
  },
  {
    simplified: '椅子',
    pinyin: 'yǐ zi',
    english: 'chair',
    sentence: {
      simplified: '这把椅子很舒服。',
      pinyin: 'zhè bǎ yǐ zi hěn shū fu.',
      english: 'This chair is very comfortable.',
    },
  },
  {
    simplified: '门',
    pinyin: 'mén',
    english: 'door',
    sentence: {
      simplified: '请把门关上。',
      pinyin: 'qǐng bǎ mén guān shàng.',
      english: 'Please close the door.',
    },
  },
  {
    simplified: '窗户',
    pinyin: 'chuāng hu',
    english: 'window',
    sentence: {
      simplified: '请打开窗户。',
      pinyin: 'qǐng dǎ kāi chuāng hu.',
      english: 'Please open the window.',
    },
  },
  {
    simplified: '钥匙',
    pinyin: 'yào shi',
    english: 'key',
    sentence: {
      simplified: '我找不到钥匙了。',
      pinyin: 'wǒ zhǎo bú dào yào shi le.',
      english: "I can't find my keys.",
    },
  },
  {
    simplified: '衣服',
    pinyin: 'yī fu',
    english: 'clothes',
    sentence: {
      simplified: '我要去买衣服。',
      pinyin: 'wǒ yào qù mǎi yī fu.',
      english: "I'm going to buy clothes.",
    },
  },
  {
    simplified: '鞋子',
    pinyin: 'xié zi',
    english: 'shoes',
    sentence: {
      simplified: '这双鞋子很好看。',
      pinyin: 'zhè shuāng xié zi hěn hǎo kàn.',
      english: 'These shoes look great.',
    },
  },
  {
    simplified: '杯子',
    pinyin: 'bēi zi',
    english: 'cup / glass',
    sentence: {
      simplified: '桌子上有一个杯子。',
      pinyin: 'zhuō zi shàng yǒu yí ge bēi zi.',
      english: "There's a cup on the table.",
    },
  },
  {
    simplified: '碗',
    pinyin: 'wǎn',
    english: 'bowl',
    sentence: {
      simplified: '我吃了两碗饭。',
      pinyin: 'wǒ chī le liǎng wǎn fàn.',
      english: 'I ate two bowls of rice.',
    },
  },
  {
    simplified: '筷子',
    pinyin: 'kuài zi',
    english: 'chopsticks',
    sentence: {
      simplified: '我会用筷子。',
      pinyin: 'wǒ huì yòng kuài zi.',
      english: 'I know how to use chopsticks.',
    },
  },
  {
    simplified: '伞',
    pinyin: 'sǎn',
    english: 'umbrella',
    sentence: {
      simplified: '下雨了，带上伞。',
      pinyin: 'xià yǔ le, dài shàng sǎn.',
      english: "It's raining, take an umbrella.",
    },
  },
  {
    simplified: '床',
    pinyin: 'chuáng',
    english: 'bed',
    sentence: {
      simplified: '我的床很舒服。',
      pinyin: 'wǒ de chuáng hěn shū fu.',
      english: 'My bed is very comfortable.',
    },
  },

  {
    simplified: '没有',
    pinyin: 'méi yǒu',
    english: "don't have / there isn't",
    sentence: {
      simplified: '我没有钱了。',
      pinyin: 'wǒ méi yǒu qián le.',
      english: "I don't have any money left.",
    },
  },
  {
    simplified: '可以',
    pinyin: 'kě yǐ',
    english: 'can / may',
    sentence: {
      simplified: '我可以进来吗？',
      pinyin: 'wǒ kě yǐ jìn lái ma?',
      english: 'May I come in?',
    },
  },
  {
    simplified: '不行',
    pinyin: 'bù xíng',
    english: "can't / won't work",
    sentence: {
      simplified: '这样做不行。',
      pinyin: 'zhè yàng zuò bù xíng.',
      english: "Doing it this way won't work.",
    },
  },
  {
    simplified: '知道',
    pinyin: 'zhī dào',
    english: 'to know',
    sentence: {
      simplified: '我知道他的名字。',
      pinyin: 'wǒ zhī dào tā de míng zi.',
      english: 'I know his name.',
    },
  },
  {
    simplified: '不知道',
    pinyin: 'bù zhī dào',
    english: "don't know",
    sentence: {
      simplified: '我不知道他在哪里。',
      pinyin: 'wǒ bù zhī dào tā zài nǎ lǐ.',
      english: "I don't know where he is.",
    },
  },
  {
    simplified: '明白',
    pinyin: 'míng bai',
    english: 'to understand',
    sentence: {
      simplified: '我明白你的意思。',
      pinyin: 'wǒ míng bai nǐ de yì si.',
      english: 'I understand what you mean.',
    },
  },
  {
    simplified: '当然',
    pinyin: 'dāng rán',
    english: 'of course',
    sentence: {
      simplified: '当然可以。',
      pinyin: 'dāng rán kě yǐ.',
      english: 'Of course you can.',
    },
  },
  {
    simplified: '还是',
    pinyin: 'hái shì',
    english: 'or / still',
    sentence: {
      simplified: '你喝茶还是喝咖啡？',
      pinyin: 'nǐ hē chá hái shì hē kā fēi?',
      english: 'Do you want tea or coffee?',
    },
  },
  {
    simplified: '因为',
    pinyin: 'yīn wèi',
    english: 'because',
    sentence: {
      simplified: '我没去，因为我病了。',
      pinyin: 'wǒ méi qù, yīn wèi wǒ bìng le.',
      english: "I didn't go because I was sick.",
    },
  },
  {
    simplified: '所以',
    pinyin: 'suǒ yǐ',
    english: 'so / therefore',
    sentence: {
      simplified: '下雨了，所以我没出门。',
      pinyin: 'xià yǔ le, suǒ yǐ wǒ méi chū mén.',
      english: "It rained, so I didn't go out.",
    },
  },
  {
    simplified: '如果',
    pinyin: 'rú guǒ',
    english: 'if',
    sentence: {
      simplified: '如果你有空，我们一起吃饭。',
      pinyin: 'rú guǒ nǐ yǒu kòng, wǒ men yì qǐ chī fàn.',
      english: "If you have time, let's eat together.",
    },
  },
  {
    simplified: '但是',
    pinyin: 'dàn shì',
    english: 'but',
    sentence: {
      simplified: '我想去，但是没有时间。',
      pinyin: 'wǒ xiǎng qù, dàn shì méi yǒu shí jiān.',
      english: "I want to go, but I don't have time.",
    },
  },
  {
    simplified: '虽然',
    pinyin: 'suī rán',
    english: 'although',
    sentence: {
      simplified: '虽然很累，但是很开心。',
      pinyin: 'suī rán hěn lèi, dàn shì hěn kāi xīn.',
      english: "Although I'm tired, I'm happy.",
    },
  },
  {
    simplified: '已经',
    pinyin: 'yǐ jīng',
    english: 'already',
    sentence: {
      simplified: '我已经吃过饭了。',
      pinyin: 'wǒ yǐ jīng chī guò fàn le.',
      english: "I've already eaten.",
    },
  },
  {
    simplified: '一起',
    pinyin: 'yì qǐ',
    english: 'together',
    sentence: {
      simplified: '我们一起去看电影吧。',
      pinyin: 'wǒ men yì qǐ qù kàn diàn yǐng ba.',
      english: "Let's go watch a movie together.",
    },
  },
  {
    simplified: '非常',
    pinyin: 'fēi cháng',
    english: 'very / extremely',
    sentence: {
      simplified: '这个菜非常好吃。',
      pinyin: 'zhè ge cài fēi cháng hǎo chī.',
      english: 'This dish is extremely delicious.',
    },
  },
  {
    simplified: '可能',
    pinyin: 'kě néng',
    english: 'maybe / possible',
    sentence: {
      simplified: '他可能不来了。',
      pinyin: 'tā kě néng bù lái le.',
      english: 'He might not come.',
    },
  },
  {
    simplified: '应该',
    pinyin: 'yīng gāi',
    english: 'should / ought to',
    sentence: {
      simplified: '你应该多休息。',
      pinyin: 'nǐ yīng gāi duō xiū xi.',
      english: 'You should rest more.',
    },
  },
  {
    simplified: '需要',
    pinyin: 'xū yào',
    english: 'to need',
    sentence: {
      simplified: '你需要帮忙吗？',
      pinyin: 'nǐ xū yào bāng máng ma?',
      english: 'Do you need help?',
    },
  },
  {
    simplified: '必须',
    pinyin: 'bì xū',
    english: 'must',
    sentence: {
      simplified: '我们必须按时到。',
      pinyin: 'wǒ men bì xū àn shí dào.',
      english: 'We must arrive on time.',
    },
  },

  {
    simplified: '什么',
    pinyin: 'shén me',
    english: 'what',
    sentence: {
      simplified: '你叫什么名字？',
      pinyin: 'nǐ jiào shén me míng zi?',
      english: 'What is your name?',
    },
  },
  {
    simplified: '哪里',
    pinyin: 'nǎ lǐ',
    english: 'where',
    sentence: {
      simplified: '你住在哪里？',
      pinyin: 'nǐ zhù zài nǎ lǐ?',
      english: 'Where do you live?',
    },
  },
  {
    simplified: '怎么',
    pinyin: 'zěn me',
    english: 'how',
    sentence: {
      simplified: '这个字怎么写？',
      pinyin: 'zhè ge zì zěn me xiě?',
      english: 'How do you write this character?',
    },
  },
  {
    simplified: '为什么',
    pinyin: 'wèi shén me',
    english: 'why',
    sentence: {
      simplified: '你为什么迟到了？',
      pinyin: 'nǐ wèi shén me chí dào le?',
      english: 'Why are you late?',
    },
  },
  {
    simplified: '多少',
    pinyin: 'duō shǎo',
    english: 'how many / how much',
    sentence: {
      simplified: '你们班有多少学生？',
      pinyin: 'nǐ men bān yǒu duō shǎo xué shēng?',
      english: 'How many students are in your class?',
    },
  },
  {
    simplified: '几',
    pinyin: 'jǐ',
    english: 'how many (small number)',
    sentence: {
      simplified: '现在几点了？',
      pinyin: 'xiàn zài jǐ diǎn le?',
      english: 'What time is it now?',
    },
  },
  {
    simplified: '什么时候',
    pinyin: 'shén me shí hou',
    english: 'when',
    sentence: {
      simplified: '你什么时候来？',
      pinyin: 'nǐ shén me shí hou lái?',
      english: 'When are you coming?',
    },
  },
  {
    simplified: '哪个',
    pinyin: 'nǎ ge',
    english: 'which one',
    sentence: {
      simplified: '你喜欢哪个？',
      pinyin: 'nǐ xǐ huan nǎ ge?',
      english: 'Which one do you like?',
    },
  },

  {
    simplified: '刷牙',
    pinyin: 'shuā yá',
    english: 'to brush teeth',
    sentence: {
      simplified: '我每天早上刷牙。',
      pinyin: 'wǒ měi tiān zǎo shang shuā yá.',
      english: 'I brush my teeth every morning.',
    },
  },
  {
    simplified: '洗澡',
    pinyin: 'xǐ zǎo',
    english: 'to take a shower',
    sentence: {
      simplified: '我睡觉前洗澡。',
      pinyin: 'wǒ shuì jiào qián xǐ zǎo.',
      english: 'I take a shower before bed.',
    },
  },
  {
    simplified: '吃早饭',
    pinyin: 'chī zǎo fàn',
    english: 'to eat breakfast',
    sentence: {
      simplified: '我每天七点吃早饭。',
      pinyin: 'wǒ měi tiān qī diǎn chī zǎo fàn.',
      english: 'I eat breakfast at seven every day.',
    },
  },
  {
    simplified: '吃午饭',
    pinyin: 'chī wǔ fàn',
    english: 'to eat lunch',
    sentence: {
      simplified: '我们十二点吃午饭。',
      pinyin: 'wǒ men shí èr diǎn chī wǔ fàn.',
      english: 'We eat lunch at twelve.',
    },
  },
  {
    simplified: '吃晚饭',
    pinyin: 'chī wǎn fàn',
    english: 'to eat dinner',
    sentence: {
      simplified: '今晚来我家吃晚饭吧。',
      pinyin: 'jīn wǎn lái wǒ jiā chī wǎn fàn ba.',
      english: 'Come to my home for dinner tonight.',
    },
  },
  {
    simplified: '上班',
    pinyin: 'shàng bān',
    english: 'to go to work',
    sentence: {
      simplified: '我八点上班。',
      pinyin: 'wǒ bā diǎn shàng bān.',
      english: 'I go to work at eight.',
    },
  },
  {
    simplified: '下班',
    pinyin: 'xià bān',
    english: 'to get off work',
    sentence: {
      simplified: '我五点下班。',
      pinyin: 'wǒ wǔ diǎn xià bān.',
      english: 'I get off work at five.',
    },
  },
  {
    simplified: '上学',
    pinyin: 'shàng xué',
    english: 'to go to school',
    sentence: {
      simplified: '孩子们早上八点上学。',
      pinyin: 'hái zi men zǎo shang bā diǎn shàng xué.',
      english: 'The kids go to school at eight in the morning.',
    },
  },
  {
    simplified: '回家',
    pinyin: 'huí jiā',
    english: 'to go home',
    sentence: {
      simplified: '我想早点儿回家。',
      pinyin: 'wǒ xiǎng zǎo diǎnr huí jiā.',
      english: 'I want to go home a bit early.',
    },
  },
  {
    simplified: '做饭',
    pinyin: 'zuò fàn',
    english: 'to cook',
    sentence: {
      simplified: '妈妈在厨房做饭。',
      pinyin: 'mā ma zài chú fáng zuò fàn.',
      english: 'Mom is cooking in the kitchen.',
    },
  },
  {
    simplified: '打扫',
    pinyin: 'dǎ sǎo',
    english: 'to clean up',
    sentence: {
      simplified: '周末我打扫房间。',
      pinyin: 'zhōu mò wǒ dǎ sǎo fáng jiān.',
      english: 'I clean my room on weekends.',
    },
  },
  {
    simplified: '锻炼',
    pinyin: 'duàn liàn',
    english: 'to exercise',
    sentence: {
      simplified: '他每天都锻炼身体。',
      pinyin: 'tā měi tiān dōu duàn liàn shēn tǐ.',
      english: 'He exercises every day.',
    },
  },
  {
    simplified: '散步',
    pinyin: 'sàn bù',
    english: 'to take a walk',
    sentence: {
      simplified: '晚饭后我们去散步。',
      pinyin: 'wǎn fàn hòu wǒ men qù sàn bù.',
      english: 'We go for a walk after dinner.',
    },
  },
  {
    simplified: '休息',
    pinyin: 'xiū xi',
    english: 'to rest',
    sentence: {
      simplified: '你累了就休息一下。',
      pinyin: 'nǐ lèi le jiù xiū xi yí xià.',
      english: "If you're tired, take a rest.",
    },
  },
  {
    simplified: '出门',
    pinyin: 'chū mén',
    english: 'to go out',
    sentence: {
      simplified: '我出门前会检查钥匙。',
      pinyin: 'wǒ chū mén qián huì jiǎn chá yào shi.',
      english: 'I check my keys before going out.',
    },
  },

  {
    simplified: '请问',
    pinyin: 'qǐng wèn',
    english: 'excuse me (asking)',
    sentence: {
      simplified: '请问，火车站在哪里？',
      pinyin: 'qǐng wèn, huǒ chē zhàn zài nǎ lǐ?',
      english: 'Excuse me, where is the train station?',
    },
  },
  {
    simplified: '麻烦你',
    pinyin: 'má fan nǐ',
    english: 'sorry to trouble you',
    sentence: {
      simplified: '麻烦你帮我拿一下。',
      pinyin: 'má fan nǐ bāng wǒ ná yí xià.',
      english: 'Sorry to trouble you, please hold this for me.',
    },
  },
  {
    simplified: '没问题',
    pinyin: 'méi wèn tí',
    english: 'no problem',
    sentence: {
      simplified: '没问题，我来帮你。',
      pinyin: 'méi wèn tí, wǒ lái bāng nǐ.',
      english: "No problem, I'll help you.",
    },
  },
  {
    simplified: '恭喜',
    pinyin: 'gōng xǐ',
    english: 'congratulations',
    sentence: {
      simplified: '恭喜你毕业了！',
      pinyin: 'gōng xǐ nǐ bì yè le!',
      english: 'Congratulations on your graduation!',
    },
  },
  {
    simplified: '加油',
    pinyin: 'jiā yóu',
    english: 'keep it up / go for it',
    sentence: {
      simplified: '考试加油！',
      pinyin: 'kǎo shì jiā yóu!',
      english: 'Good luck on your exam!',
    },
  },
  {
    simplified: '辛苦了',
    pinyin: 'xīn kǔ le',
    english: "you've worked hard",
    sentence: {
      simplified: '大家辛苦了！',
      pinyin: 'dà jiā xīn kǔ le!',
      english: 'Thank you all for your hard work!',
    },
  },
  {
    simplified: '慢走',
    pinyin: 'màn zǒu',
    english: 'take care (leaving)',
    sentence: {
      simplified: '慢走，欢迎下次再来。',
      pinyin: 'màn zǒu, huān yíng xià cì zài lái.',
      english: 'Take care, come again next time.',
    },
  },
  {
    simplified: '随便',
    pinyin: 'suí biàn',
    english: 'whatever / as you like',
    sentence: {
      simplified: '吃什么都行，我随便。',
      pinyin: 'chī shén me dōu xíng, wǒ suí biàn.',
      english: "Anything is fine, I don't mind.",
    },
  },
  {
    simplified: '算了',
    pinyin: 'suàn le',
    english: 'forget it / never mind',
    sentence: {
      simplified: '算了，下次再说吧。',
      pinyin: 'suàn le, xià cì zài shuō ba.',
      english: "Forget it, let's talk next time.",
    },
  },
  {
    simplified: '一路平安',
    pinyin: 'yí lù píng ān',
    english: 'have a safe trip',
    sentence: {
      simplified: '祝你一路平安！',
      pinyin: 'zhù nǐ yí lù píng ān!',
      english: 'Have a safe trip!',
    },
  },

  {
    simplified: '狗',
    pinyin: 'gǒu',
    english: 'dog',
    sentence: {
      simplified: '我家有一只狗。',
      pinyin: 'wǒ jiā yǒu yì zhī gǒu.',
      english: 'We have a dog at home.',
    },
  },
  {
    simplified: '猫',
    pinyin: 'māo',
    english: 'cat',
    sentence: {
      simplified: '这只猫很可爱。',
      pinyin: 'zhè zhī māo hěn kě ài.',
      english: 'This cat is very cute.',
    },
  },
  {
    simplified: '鸟',
    pinyin: 'niǎo',
    english: 'bird',
    sentence: {
      simplified: '树上有很多鸟。',
      pinyin: 'shù shàng yǒu hěn duō niǎo.',
      english: 'There are many birds in the tree.',
    },
  },
  {
    simplified: '马',
    pinyin: 'mǎ',
    english: 'horse',
    sentence: {
      simplified: '他会骑马。',
      pinyin: 'tā huì qí mǎ.',
      english: 'He knows how to ride a horse.',
    },
  },
  {
    simplified: '牛',
    pinyin: 'niú',
    english: 'cow / ox',
    sentence: {
      simplified: '农场里有很多牛。',
      pinyin: 'nóng chǎng lǐ yǒu hěn duō niú.',
      english: 'There are many cows on the farm.',
    },
  },
  {
    simplified: '龙',
    pinyin: 'lóng',
    english: 'dragon',
    sentence: {
      simplified: '龙是中国的象征。',
      pinyin: 'lóng shì zhōng guó de xiàng zhēng.',
      english: 'The dragon is a symbol of China.',
    },
  },
  {
    simplified: '兔子',
    pinyin: 'tù zi',
    english: 'rabbit',
    sentence: {
      simplified: '兔子喜欢吃萝卜。',
      pinyin: 'tù zi xǐ huan chī luó bo.',
      english: 'Rabbits like to eat carrots.',
    },
  },
  {
    simplified: '猪',
    pinyin: 'zhū',
    english: 'pig',
    sentence: {
      simplified: '农场里养了很多猪。',
      pinyin: 'nóng chǎng lǐ yǎng le hěn duō zhū.',
      english: 'The farm raises a lot of pigs.',
    },
  },
  {
    simplified: '鸡',
    pinyin: 'jī',
    english: 'chicken (animal)',
    sentence: {
      simplified: '院子里有几只鸡。',
      pinyin: 'yuàn zi lǐ yǒu jǐ zhī jī.',
      english: 'There are a few chickens in the yard.',
    },
  },
  {
    simplified: '蛇',
    pinyin: 'shé',
    english: 'snake',
    sentence: {
      simplified: '我很害怕蛇。',
      pinyin: 'wǒ hěn hài pà shé.',
      english: "I'm very afraid of snakes.",
    },
  },

  {
    simplified: '个',
    pinyin: 'gè',
    english: 'general measure word',
    sentence: {
      simplified: '我想买一个苹果。',
      pinyin: 'wǒ xiǎng mǎi yí ge píng guǒ.',
      english: 'I want to buy an apple.',
    },
  },
  {
    simplified: '本',
    pinyin: 'běn',
    english: 'measure word for books',
    sentence: {
      simplified: '我买了三本书。',
      pinyin: 'wǒ mǎi le sān běn shū.',
      english: 'I bought three books.',
    },
  },
  {
    simplified: '杯',
    pinyin: 'bēi',
    english: 'measure word for cups',
    sentence: {
      simplified: '我想喝一杯茶。',
      pinyin: 'wǒ xiǎng hē yì bēi chá.',
      english: 'I want a cup of tea.',
    },
  },
  {
    simplified: '件',
    pinyin: 'jiàn',
    english: 'measure word for clothes/matters',
    sentence: {
      simplified: '我买了一件衣服。',
      pinyin: 'wǒ mǎi le yí jiàn yī fu.',
      english: 'I bought a piece of clothing.',
    },
  },
  {
    simplified: '张',
    pinyin: 'zhāng',
    english: 'measure word for flat things',
    sentence: {
      simplified: '请给我一张纸。',
      pinyin: 'qǐng gěi wǒ yì zhāng zhǐ.',
      english: 'Please give me a sheet of paper.',
    },
  },
  {
    simplified: '把',
    pinyin: 'bǎ',
    english: 'measure word for handled items',
    sentence: {
      simplified: '我买了一把伞。',
      pinyin: 'wǒ mǎi le yì bǎ sǎn.',
      english: 'I bought an umbrella.',
    },
  },
  {
    simplified: '条',
    pinyin: 'tiáo',
    english: 'measure word for long things',
    sentence: {
      simplified: '我买了一条裤子。',
      pinyin: 'wǒ mǎi le yì tiáo kù zi.',
      english: 'I bought a pair of pants.',
    },
  },
  {
    simplified: '的',
    pinyin: 'de',
    english: 'possessive / descriptive particle',
    sentence: {
      simplified: '这是我的书。',
      pinyin: 'zhè shì wǒ de shū.',
      english: 'This is my book.',
    },
  },
  {
    simplified: '了',
    pinyin: 'le',
    english: 'completion / change particle',
    sentence: { simplified: '我吃饭了。', pinyin: 'wǒ chī fàn le.', english: 'I have eaten.' },
  },
  {
    simplified: '在',
    pinyin: 'zài',
    english: 'at / in / is doing',
    sentence: { simplified: '他在看书。', pinyin: 'tā zài kàn shū.', english: 'He is reading.' },
  },

  {
    simplified: '住',
    pinyin: 'zhù',
    english: 'to live (somewhere)',
    sentence: {
      simplified: '我住在北京。',
      pinyin: 'wǒ zhù zài běi jīng.',
      english: 'I live in Beijing.',
    },
  },
  {
    simplified: '问',
    pinyin: 'wèn',
    english: 'to ask',
    sentence: {
      simplified: '我想问你一个问题。',
      pinyin: 'wǒ xiǎng wèn nǐ yí ge wèn tí.',
      english: 'I want to ask you a question.',
    },
  },
  {
    simplified: '回答',
    pinyin: 'huí dá',
    english: 'to answer',
    sentence: {
      simplified: '请回答我的问题。',
      pinyin: 'qǐng huí dá wǒ de wèn tí.',
      english: 'Please answer my question.',
    },
  },
  {
    simplified: '记得',
    pinyin: 'jì de',
    english: 'to remember',
    sentence: {
      simplified: '你记得带钥匙吗？',
      pinyin: 'nǐ jì de dài yào shi ma?',
      english: 'Do you remember to bring the keys?',
    },
  },
  {
    simplified: '忘',
    pinyin: 'wàng',
    english: 'to forget',
    sentence: {
      simplified: '我忘了他的名字。',
      pinyin: 'wǒ wàng le tā de míng zi.',
      english: 'I forgot his name.',
    },
  },
  {
    simplified: '试',
    pinyin: 'shì',
    english: 'to try',
    sentence: {
      simplified: '你可以试一下这件衣服。',
      pinyin: 'nǐ kě yǐ shì yí xià zhè jiàn yī fu.',
      english: 'You can try on this piece of clothing.',
    },
  },
  {
    simplified: '送',
    pinyin: 'sòng',
    english: 'to send / to give (gift)',
    sentence: {
      simplified: '我想送他一个礼物。',
      pinyin: 'wǒ xiǎng sòng tā yí ge lǐ wù.',
      english: 'I want to give him a gift.',
    },
  },
  {
    simplified: '带',
    pinyin: 'dài',
    english: 'to bring / to carry',
    sentence: {
      simplified: '别忘了带伞。',
      pinyin: 'bié wàng le dài sǎn.',
      english: "Don't forget to bring an umbrella.",
    },
  },
  {
    simplified: '放',
    pinyin: 'fàng',
    english: 'to put / to place',
    sentence: {
      simplified: '请把书放在桌子上。',
      pinyin: 'qǐng bǎ shū fàng zài zhuō zi shàng.',
      english: 'Please put the book on the table.',
    },
  },
  {
    simplified: '拿',
    pinyin: 'ná',
    english: 'to take / to hold',
    sentence: {
      simplified: '请帮我拿一下包。',
      pinyin: 'qǐng bāng wǒ ná yí xià bāo.',
      english: 'Please hold my bag for me.',
    },
  },
  {
    simplified: '换',
    pinyin: 'huàn',
    english: 'to change / to exchange',
    sentence: {
      simplified: '我想换一个大点儿的。',
      pinyin: 'wǒ xiǎng huàn yí ge dà diǎnr de.',
      english: 'I want to exchange it for a bigger one.',
    },
  },
  {
    simplified: '见面',
    pinyin: 'jiàn miàn',
    english: 'to meet (someone)',
    sentence: {
      simplified: '我们明天见面吧。',
      pinyin: 'wǒ men míng tiān jiàn miàn ba.',
      english: "Let's meet tomorrow.",
    },
  },
  {
    simplified: '介绍',
    pinyin: 'jiè shào',
    english: 'to introduce',
    sentence: {
      simplified: '我来介绍一下我的朋友。',
      pinyin: 'wǒ lái jiè shào yí xià wǒ de péng you.',
      english: 'Let me introduce my friend.',
    },
  },
  {
    simplified: '准备',
    pinyin: 'zhǔn bèi',
    english: 'to prepare',
    sentence: {
      simplified: '我在准备考试。',
      pinyin: 'wǒ zài zhǔn bèi kǎo shì.',
      english: "I'm preparing for the exam.",
    },
  },
  {
    simplified: '决定',
    pinyin: 'jué dìng',
    english: 'to decide',
    sentence: {
      simplified: '我决定去中国学习。',
      pinyin: 'wǒ jué dìng qù zhōng guó xué xí.',
      english: "I've decided to study in China.",
    },
  },
  {
    simplified: '完成',
    pinyin: 'wán chéng',
    english: 'to complete / to finish',
    sentence: {
      simplified: '我完成了今天的工作。',
      pinyin: 'wǒ wán chéng le jīn tiān de gōng zuò.',
      english: "I finished today's work.",
    },
  },
  {
    simplified: '练习',
    pinyin: 'liàn xí',
    english: 'to practice',
    sentence: {
      simplified: '我每天练习写汉字。',
      pinyin: 'wǒ měi tiān liàn xí xiě hàn zì.',
      english: 'I practice writing Chinese characters every day.',
    },
  },
  {
    simplified: '选择',
    pinyin: 'xuǎn zé',
    english: 'to choose',
    sentence: {
      simplified: '你可以自己选择。',
      pinyin: 'nǐ kě yǐ zì jǐ xuǎn zé.',
      english: 'You can choose yourself.',
    },
  },
  {
    simplified: '迟到',
    pinyin: 'chí dào',
    english: 'to be late',
    sentence: {
      simplified: '今天我上班迟到了。',
      pinyin: 'jīn tiān wǒ shàng bān chí dào le.',
      english: 'I was late for work today.',
    },
  },
  {
    simplified: '参加',
    pinyin: 'cān jiā',
    english: 'to participate',
    sentence: {
      simplified: '我想参加这个活动。',
      pinyin: 'wǒ xiǎng cān jiā zhè ge huó dòng.',
      english: 'I want to take part in this event.',
    },
  },

  {
    simplified: '太好了',
    pinyin: 'tài hǎo le',
    english: 'great / awesome',
    sentence: {
      simplified: '太好了，我们赢了！',
      pinyin: 'tài hǎo le, wǒ men yíng le!',
      english: 'Great, we won!',
    },
  },
  {
    simplified: '怎么了',
    pinyin: 'zěn me le',
    english: "what's wrong?",
    sentence: {
      simplified: '你怎么了？看起来不开心。',
      pinyin: 'nǐ zěn me le? kàn qǐ lái bù kāi xīn.',
      english: "What's wrong? You look unhappy.",
    },
  },
  {
    simplified: '不好意思',
    pinyin: 'bù hǎo yì si',
    english: 'excuse me / embarrassed',
    sentence: {
      simplified: '不好意思，我来晚了。',
      pinyin: 'bù hǎo yì si, wǒ lái wǎn le.',
      english: "Sorry, I'm late.",
    },
  },
  {
    simplified: '差不多',
    pinyin: 'chà bu duō',
    english: 'almost / more or less',
    sentence: {
      simplified: '时间差不多了，我们走吧。',
      pinyin: 'shí jiān chà bu duō le, wǒ men zǒu ba.',
      english: "It's about time, let's go.",
    },
  },
  {
    simplified: '没事',
    pinyin: 'méi shì',
    english: "it's nothing / no worries",
    sentence: {
      simplified: '没事，我自己可以。',
      pinyin: 'méi shì, wǒ zì jǐ kě yǐ.',
      english: "It's nothing, I can do it myself.",
    },
  },
  {
    simplified: '有空',
    pinyin: 'yǒu kòng',
    english: 'to have free time',
    sentence: {
      simplified: '你今天有空吗？',
      pinyin: 'nǐ jīn tiān yǒu kòng ma?',
      english: 'Do you have time today?',
    },
  },
  {
    simplified: '一定',
    pinyin: 'yí dìng',
    english: 'certainly / definitely',
    sentence: {
      simplified: '我明天一定来。',
      pinyin: 'wǒ míng tiān yí dìng lái.',
      english: 'I will definitely come tomorrow.',
    },
  },
  {
    simplified: '特别',
    pinyin: 'tè bié',
    english: 'especially / special',
    sentence: {
      simplified: '我特别喜欢吃饺子。',
      pinyin: 'wǒ tè bié xǐ huan chī jiǎo zi.',
      english: 'I especially like eating dumplings.',
    },
  },
  {
    simplified: '真的',
    pinyin: 'zhēn de',
    english: 'really / truly',
    sentence: {
      simplified: '这件事是真的。',
      pinyin: 'zhè jiàn shì shì zhēn de.',
      english: 'This matter is true.',
    },
  },
  {
    simplified: '马上',
    pinyin: 'mǎ shàng',
    english: 'right away / immediately',
    sentence: {
      simplified: '我马上就到。',
      pinyin: 'wǒ mǎ shàng jiù dào.',
      english: "I'll be there right away.",
    },
  },
  {
    simplified: '刚才',
    pinyin: 'gāng cái',
    english: 'just now',
    sentence: {
      simplified: '刚才有人找你。',
      pinyin: 'gāng cái yǒu rén zhǎo nǐ.',
      english: 'Someone was looking for you just now.',
    },
  },
  {
    simplified: '终于',
    pinyin: 'zhōng yú',
    english: 'finally / at last',
    sentence: {
      simplified: '我终于完成了作业。',
      pinyin: 'wǒ zhōng yú wán chéng le zuò yè.',
      english: 'I finally finished my homework.',
    },
  },
  {
    simplified: '其实',
    pinyin: 'qí shí',
    english: 'actually / in fact',
    sentence: {
      simplified: '其实我也不知道。',
      pinyin: 'qí shí wǒ yě bù zhī dào.',
      english: "Actually, I don't know either.",
    },
  },
  {
    simplified: '越来越',
    pinyin: 'yuè lái yuè',
    english: 'more and more',
    sentence: {
      simplified: '天气越来越冷了。',
      pinyin: 'tiān qì yuè lái yuè lěng le.',
      english: 'The weather is getting colder and colder.',
    },
  },
  {
    simplified: '到处',
    pinyin: 'dào chù',
    english: 'everywhere',
    sentence: {
      simplified: '这里到处都是花。',
      pinyin: 'zhè lǐ dào chù dōu shì huā.',
      english: 'There are flowers everywhere here.',
    },
  },

  {
    simplified: '裤子',
    pinyin: 'kù zi',
    english: 'pants',
    sentence: {
      simplified: '这条裤子太长了。',
      pinyin: 'zhè tiáo kù zi tài cháng le.',
      english: 'These pants are too long.',
    },
  },
  {
    simplified: '裙子',
    pinyin: 'qún zi',
    english: 'skirt / dress',
    sentence: {
      simplified: '她穿了一条红裙子。',
      pinyin: 'tā chuān le yì tiáo hóng qún zi.',
      english: "She's wearing a red skirt.",
    },
  },
  {
    simplified: '外套',
    pinyin: 'wài tào',
    english: 'jacket / coat',
    sentence: {
      simplified: '天冷了，穿上外套。',
      pinyin: 'tiān lěng le, chuān shàng wài tào.',
      english: "It's cold, put on a coat.",
    },
  },
  {
    simplified: '帽子',
    pinyin: 'mào zi',
    english: 'hat',
    sentence: {
      simplified: '他戴了一顶帽子。',
      pinyin: 'tā dài le yì dǐng mào zi.',
      english: "He's wearing a hat.",
    },
  },
  {
    simplified: '袜子',
    pinyin: 'wà zi',
    english: 'socks',
    sentence: {
      simplified: '我买了一双新袜子。',
      pinyin: 'wǒ mǎi le yì shuāng xīn wà zi.',
      english: 'I bought a pair of new socks.',
    },
  },

  {
    simplified: '春天',
    pinyin: 'chūn tiān',
    english: 'spring',
    sentence: {
      simplified: '春天到了，花都开了。',
      pinyin: 'chūn tiān dào le, huā dōu kāi le.',
      english: 'Spring is here and the flowers are blooming.',
    },
  },
  {
    simplified: '夏天',
    pinyin: 'xià tiān',
    english: 'summer',
    sentence: {
      simplified: '夏天很热，我喜欢游泳。',
      pinyin: 'xià tiān hěn rè, wǒ xǐ huan yóu yǒng.',
      english: 'Summer is hot, I like to swim.',
    },
  },
  {
    simplified: '秋天',
    pinyin: 'qiū tiān',
    english: 'autumn / fall',
    sentence: {
      simplified: '秋天的天气很舒服。',
      pinyin: 'qiū tiān de tiān qì hěn shū fu.',
      english: 'The weather in autumn is pleasant.',
    },
  },
  {
    simplified: '冬天',
    pinyin: 'dōng tiān',
    english: 'winter',
    sentence: {
      simplified: '冬天这里常下雪。',
      pinyin: 'dōng tiān zhè lǐ cháng xià xuě.',
      english: 'It often snows here in winter.',
    },
  },

  {
    simplified: '考试',
    pinyin: 'kǎo shì',
    english: 'exam / test',
    sentence: {
      simplified: '明天我有一个考试。',
      pinyin: 'míng tiān wǒ yǒu yí ge kǎo shì.',
      english: 'I have an exam tomorrow.',
    },
  },
  {
    simplified: '作业',
    pinyin: 'zuò yè',
    english: 'homework',
    sentence: {
      simplified: '我还没做完作业。',
      pinyin: 'wǒ hái méi zuò wán zuò yè.',
      english: "I haven't finished my homework yet.",
    },
  },
  {
    simplified: '问题',
    pinyin: 'wèn tí',
    english: 'question / problem',
    sentence: {
      simplified: '我有一个问题想问你。',
      pinyin: 'wǒ yǒu yí ge wèn tí xiǎng wèn nǐ.',
      english: 'I have a question to ask you.',
    },
  },
  {
    simplified: '答案',
    pinyin: 'dá àn',
    english: 'answer / solution',
    sentence: {
      simplified: '这道题的答案是什么？',
      pinyin: 'zhè dào tí de dá àn shì shén me?',
      english: 'What is the answer to this question?',
    },
  },
  {
    simplified: '课',
    pinyin: 'kè',
    english: 'class / lesson',
    sentence: {
      simplified: '我今天有三节课。',
      pinyin: 'wǒ jīn tiān yǒu sān jié kè.',
      english: 'I have three classes today.',
    },
  },
  {
    simplified: '成绩',
    pinyin: 'chéng jì',
    english: 'grade / score',
    sentence: {
      simplified: '他这次考试成绩很好。',
      pinyin: 'tā zhè cì kǎo shì chéng jì hěn hǎo.',
      english: 'He got good grades on this exam.',
    },
  },
  {
    simplified: '毕业',
    pinyin: 'bì yè',
    english: 'to graduate',
    sentence: {
      simplified: '我去年大学毕业。',
      pinyin: 'wǒ qù nián dà xué bì yè.',
      english: 'I graduated from college last year.',
    },
  },
  {
    simplified: '中文',
    pinyin: 'zhōng wén',
    english: 'Chinese (language)',
    sentence: {
      simplified: '我在学中文。',
      pinyin: 'wǒ zài xué zhōng wén.',
      english: "I'm learning Chinese.",
    },
  },
  {
    simplified: '英语',
    pinyin: 'yīng yǔ',
    english: 'English (language)',
    sentence: {
      simplified: '她的英语说得很好。',
      pinyin: 'tā de yīng yǔ shuō de hěn hǎo.',
      english: 'She speaks English very well.',
    },
  },
  {
    simplified: '历史',
    pinyin: 'lì shǐ',
    english: 'history',
    sentence: {
      simplified: '我对中国历史很感兴趣。',
      pinyin: 'wǒ duì zhōng guó lì shǐ hěn gǎn xìng qù.',
      english: "I'm very interested in Chinese history.",
    },
  },

  {
    simplified: '我听不懂',
    pinyin: 'wǒ tīng bù dǒng',
    english: "I don't understand",
    sentence: {
      simplified: '对不起，我听不懂，请再说一次。',
      pinyin: 'duì bu qǐ, wǒ tīng bù dǒng, qǐng zài shuō yí cì.',
      english: "Sorry, I don't understand, please say it again.",
    },
  },
  {
    simplified: '慢一点',
    pinyin: 'màn yì diǎn',
    english: 'a little slower',
    sentence: {
      simplified: '请说得慢一点，我听不懂。',
      pinyin: 'qǐng shuō de màn yì diǎn, wǒ tīng bù dǒng.',
      english: "Please speak a little slower, I can't follow.",
    },
  },
  {
    simplified: '再说一次',
    pinyin: 'zài shuō yí cì',
    english: 'say it again',
    sentence: {
      simplified: '不好意思，请再说一次。',
      pinyin: 'bù hǎo yì si, qǐng zài shuō yí cì.',
      english: 'Sorry, please say it once more.',
    },
  },
  {
    simplified: '我不会',
    pinyin: 'wǒ bú huì',
    english: "I can't / I don't know how",
    sentence: {
      simplified: '这个字我不会写。',
      pinyin: 'zhè ge zì wǒ bú huì xiě.',
      english: "I don't know how to write this character.",
    },
  },
  {
    simplified: '我想要',
    pinyin: 'wǒ xiǎng yào',
    english: 'I want / I would like',
    sentence: {
      simplified: '我想要一杯咖啡。',
      pinyin: 'wǒ xiǎng yào yì bēi kā fēi.',
      english: 'I want a cup of coffee.',
    },
  },
  {
    simplified: '在哪里',
    pinyin: 'zài nǎ lǐ',
    english: 'where is it?',
    sentence: {
      simplified: '请问洗手间在哪里？',
      pinyin: 'qǐng wèn xǐ shǒu jiān zài nǎ lǐ?',
      english: 'Excuse me, where is the restroom?',
    },
  },
  {
    simplified: '多大',
    pinyin: 'duō dà',
    english: 'how old?',
    sentence: {
      simplified: '你的孩子多大了？',
      pinyin: 'nǐ de hái zi duō dà le?',
      english: 'How old is your child?',
    },
  },
  {
    simplified: '好吃',
    pinyin: 'hǎo chī',
    english: 'delicious',
    sentence: {
      simplified: '这个菜真好吃。',
      pinyin: 'zhè ge cài zhēn hǎo chī.',
      english: 'This dish is really delicious.',
    },
  },
  {
    simplified: '好看',
    pinyin: 'hǎo kàn',
    english: 'good-looking',
    sentence: {
      simplified: '这件衣服很好看。',
      pinyin: 'zhè jiàn yī fu hěn hǎo kàn.',
      english: 'This piece of clothing looks great.',
    },
  },
  {
    simplified: '好玩',
    pinyin: 'hǎo wán',
    english: 'fun / amusing',
    sentence: {
      simplified: '这个游戏很好玩。',
      pinyin: 'zhè ge yóu xì hěn hǎo wán.',
      english: 'This game is fun.',
    },
  },
  {
    simplified: '好喝',
    pinyin: 'hǎo hē',
    english: 'tasty (drinks)',
    sentence: {
      simplified: '这个茶很好喝。',
      pinyin: 'zhè ge chá hěn hǎo hē.',
      english: 'This tea is delicious.',
    },
  },
  {
    simplified: '不错',
    pinyin: 'bú cuò',
    english: 'not bad / pretty good',
    sentence: {
      simplified: '这家餐厅不错。',
      pinyin: 'zhè jiā cān tīng bú cuò.',
      english: 'This restaurant is pretty good.',
    },
  },
  {
    simplified: '还好',
    pinyin: 'hái hǎo',
    english: 'so-so / okay',
    sentence: {
      simplified: '今天的天气还好。',
      pinyin: 'jīn tiān de tiān qì hái hǎo.',
      english: "Today's weather is okay.",
    },
  },
  {
    simplified: '别担心',
    pinyin: 'bié dān xīn',
    english: "don't worry",
    sentence: {
      simplified: '别担心，一切都会好的。',
      pinyin: 'bié dān xīn, yí qiè dōu huì hǎo de.',
      english: "Don't worry, everything will be fine.",
    },
  },
  {
    simplified: '小心',
    pinyin: 'xiǎo xīn',
    english: 'be careful',
    sentence: {
      simplified: '路上小心。',
      pinyin: 'lù shàng xiǎo xīn.',
      english: 'Be careful on the road.',
    },
  },
  {
    simplified: '对了',
    pinyin: 'duì le',
    english: 'by the way / oh right',
    sentence: {
      simplified: '对了，明天别忘了开会。',
      pinyin: 'duì le, míng tiān bié wàng le kāi huì.',
      english: "By the way, don't forget the meeting tomorrow.",
    },
  },
  {
    simplified: '算了',
    pinyin: 'suàn le',
    english: 'forget it / let it go',
    sentence: {
      simplified: '算了，别生气了。',
      pinyin: 'suàn le, bié shēng qì le.',
      english: "Let it go, don't be angry.",
    },
  },
  {
    simplified: '你说呢',
    pinyin: 'nǐ shuō ne',
    english: 'what do you think?',
    sentence: {
      simplified: '我们去看电影吧，你说呢？',
      pinyin: 'wǒ men qù kàn diàn yǐng ba, nǐ shuō ne?',
      english: "Let's go watch a movie, what do you think?",
    },
  },
  {
    simplified: '我也是',
    pinyin: 'wǒ yě shì',
    english: 'me too',
    sentence: {
      simplified: '他喜欢中国菜，我也是。',
      pinyin: 'tā xǐ huan zhōng guó cài, wǒ yě shì.',
      english: 'He likes Chinese food, me too.',
    },
  },
  {
    simplified: '不用谢',
    pinyin: 'bú yòng xiè',
    english: "don't mention it",
    sentence: {
      simplified: '不用谢，这是我应该做的。',
      pinyin: 'bú yòng xiè, zhè shì wǒ yīng gāi zuò de.',
      english: "Don't mention it, it's the least I could do.",
    },
  },

  {
    simplified: '公司',
    pinyin: 'gōng sī',
    english: 'company',
    sentence: {
      simplified: '我在一家大公司工作。',
      pinyin: 'wǒ zài yì jiā dà gōng sī gōng zuò.',
      english: 'I work at a big company.',
    },
  },
  {
    simplified: '老板',
    pinyin: 'lǎo bǎn',
    english: 'boss',
    sentence: {
      simplified: '我的老板对我很好。',
      pinyin: 'wǒ de lǎo bǎn duì wǒ hěn hǎo.',
      english: 'My boss is very nice to me.',
    },
  },
  {
    simplified: '同事',
    pinyin: 'tóng shì',
    english: 'colleague / coworker',
    sentence: {
      simplified: '我和同事一起吃午饭。',
      pinyin: 'wǒ hé tóng shì yì qǐ chī wǔ fàn.',
      english: 'I have lunch with my colleagues.',
    },
  },
  {
    simplified: '会议',
    pinyin: 'huì yì',
    english: 'meeting',
    sentence: {
      simplified: '下午有一个重要的会议。',
      pinyin: 'xià wǔ yǒu yí ge zhòng yào de huì yì.',
      english: "There's an important meeting this afternoon.",
    },
  },
  {
    simplified: '项目',
    pinyin: 'xiàng mù',
    english: 'project',
    sentence: {
      simplified: '我们正在做一个新项目。',
      pinyin: 'wǒ men zhèng zài zuò yí ge xīn xiàng mù.',
      english: "We're working on a new project.",
    },
  },
  {
    simplified: '经验',
    pinyin: 'jīng yàn',
    english: 'experience',
    sentence: {
      simplified: '他有很多工作经验。',
      pinyin: 'tā yǒu hěn duō gōng zuò jīng yàn.',
      english: 'He has a lot of work experience.',
    },
  },
  {
    simplified: '薪水',
    pinyin: 'xīn shuǐ',
    english: 'salary',
    sentence: {
      simplified: '这份工作的薪水不错。',
      pinyin: 'zhè fèn gōng zuò de xīn shuǐ bú cuò.',
      english: 'The salary for this job is good.',
    },
  },
  {
    simplified: '面试',
    pinyin: 'miàn shì',
    english: 'interview',
    sentence: {
      simplified: '我明天有一个面试。',
      pinyin: 'wǒ míng tiān yǒu yí ge miàn shì.',
      english: 'I have an interview tomorrow.',
    },
  },
  {
    simplified: '简历',
    pinyin: 'jiǎn lì',
    english: 'resume / CV',
    sentence: {
      simplified: '请把你的简历发给我。',
      pinyin: 'qǐng bǎ nǐ de jiǎn lì fā gěi wǒ.',
      english: 'Please send me your resume.',
    },
  },
  {
    simplified: '加班',
    pinyin: 'jiā bān',
    english: 'to work overtime',
    sentence: {
      simplified: '我今天要加班。',
      pinyin: 'wǒ jīn tiān yào jiā bān.',
      english: 'I have to work overtime today.',
    },
  },

  {
    simplified: '旅行',
    pinyin: 'lǚ xíng',
    english: 'to travel / trip',
    sentence: {
      simplified: '我喜欢去不同的地方旅行。',
      pinyin: 'wǒ xǐ huan qù bù tóng de dì fāng lǚ xíng.',
      english: 'I like traveling to different places.',
    },
  },
  {
    simplified: '护照',
    pinyin: 'hù zhào',
    english: 'passport',
    sentence: {
      simplified: '出国要带护照。',
      pinyin: 'chū guó yào dài hù zhào.',
      english: 'You need a passport to go abroad.',
    },
  },
  {
    simplified: '签证',
    pinyin: 'qiān zhèng',
    english: 'visa',
    sentence: {
      simplified: '我的签证下个月到期。',
      pinyin: 'wǒ de qiān zhèng xià ge yuè dào qī.',
      english: 'My visa expires next month.',
    },
  },
  {
    simplified: '酒店',
    pinyin: 'jiǔ diàn',
    english: 'hotel',
    sentence: {
      simplified: '我们订了一家酒店。',
      pinyin: 'wǒ men dìng le yì jiā jiǔ diàn.',
      english: 'We booked a hotel.',
    },
  },
  {
    simplified: '行李',
    pinyin: 'xíng li',
    english: 'luggage',
    sentence: {
      simplified: '我的行李很重。',
      pinyin: 'wǒ de xíng li hěn zhòng.',
      english: 'My luggage is very heavy.',
    },
  },
  {
    simplified: '地图',
    pinyin: 'dì tú',
    english: 'map',
    sentence: {
      simplified: '请给我看一下地图。',
      pinyin: 'qǐng gěi wǒ kàn yí xià dì tú.',
      english: 'Please show me the map.',
    },
  },
  {
    simplified: '票',
    pinyin: 'piào',
    english: 'ticket',
    sentence: {
      simplified: '我买了两张电影票。',
      pinyin: 'wǒ mǎi le liǎng zhāng diàn yǐng piào.',
      english: 'I bought two movie tickets.',
    },
  },
  {
    simplified: '预订',
    pinyin: 'yù dìng',
    english: 'to reserve / to book',
    sentence: {
      simplified: '我想预订一个房间。',
      pinyin: 'wǒ xiǎng yù dìng yí ge fáng jiān.',
      english: "I'd like to reserve a room.",
    },
  },
  {
    simplified: '风景',
    pinyin: 'fēng jǐng',
    english: 'scenery',
    sentence: {
      simplified: '这里的风景真美。',
      pinyin: 'zhè lǐ de fēng jǐng zhēn měi.',
      english: 'The scenery here is beautiful.',
    },
  },
  {
    simplified: '纪念品',
    pinyin: 'jì niàn pǐn',
    english: 'souvenir',
    sentence: {
      simplified: '我买了一些纪念品。',
      pinyin: 'wǒ mǎi le yì xiē jì niàn pǐn.',
      english: 'I bought some souvenirs.',
    },
  },
];
