// cSpell:disable

import type { Conversation, Message } from '@/types/conversation'

export const Conversations: Conversation[] = [
  {
    id: 'cmakniqka000008ih8j82f6v6',
    title: 'Chat with Gemini 2.5 Flash',
    isFavorite: true,
  },
  { id: 'cmaknkcsp000308ih6jr6957w', title: 'Chat with GPT-4o' },
  {
    id: 'cmaknkjy6000408ihhhp0d6fp',
    title: 'Chat with GPT-4o',
    isFavorite: true,
  },
  { id: 'cmaknkqxd000508ihdbaz03zt', title: 'Chat with Gemini 2.5 Flash' },
  { id: 'cmaknj494000408ih7w8w6475', title: 'Chat with Gemini 2.5 Flash' },
  { id: 'cmaknl1je000708ihfqv683ks', title: 'Chat with GPT-4o' },
  { id: 'cmaknl624000808ih66yvfu98', title: 'Chat with Gemini 2.5 Flash' },
  { id: 'cmaknlakz000908ihfn6lex0j', title: 'Chat with Gemini 2.5 Flash' },
  { id: 'cmaknlfxe000a08ihgm6of5ss', title: 'Chat with GPT-4o' },
  { id: 'cmaknlkw5000b08ihdvdg8r9w', title: 'Chat with Gemini 2.5 Flash' },
  { id: 'cmaknlond000c08ihaz3s6lq3', title: 'Chat with Gemini 2.5 Flash' },
  { id: 'cmaknnxrk000d08ihetyv1qtj', title: 'Chat with GPT-4o' },
  { id: 'cmakno0o8000e08ihg1576vqu', title: 'Chat with Gemini 2.5 Flash' },
  { id: 'cmakno6pk000g08ih96dr7uuo', title: 'Chat with Gemini 2.5 Flash' },
  { id: 'cmakno3cv000f08ihf2zq9z1i', title: 'Chat with GPT-4o' },
]

export const Messages: Message[] = [
  {
    id: 'cmaknkcsp000308ih6jr6957w',
    role: 'user',
    content: 'Hello, how are you?',
  },
  {
    id: 'cmaknkjy6000408ihhhp0d6fp',
    role: 'assistant',
    content: "I'm fine, thank you!",
    model: { id: 'gemini-2.5-flash', icon: 'Gemini', name: 'Gemini 2.5 Flash' },
  },
  {
    id: 'cmaknkqxd000508ihdbaz03zt',
    role: 'user',
    content: 'What can you do?',
  },
  {
    id: 'cmaknkvt4000608ihft30cj97',
    role: 'assistant',
    content: 'I can do many things!',
    model: { id: 'gpt-4o', icon: 'GPT', name: 'GPT-4o' },
  },
  {
    id: 'cmaknl1je000708ihfqv683ks',
    role: 'user',
    content: 'Can you tell me a joke?',
  },
  {
    id: 'cmaknl624000808ih66yvfu98',
    role: 'assistant',
    content:
      'Sure! Why did the chicken cross the road? To get to the other side!',
    model: { id: 'gpt-4o', icon: 'GPT', name: 'GPT-4o' },
  },
  {
    id: 'cmaknlakz000908ihfn6lex0j',
    role: 'user',
    content: 'That was funny!',
  },
  {
    id: 'cmaknlfxe000a08ihgm6of5ss',
    role: 'assistant',
    content: 'I am glad you liked it!',
    model: { id: 'gemini-2.5-flash', icon: 'Gemini', name: 'Gemini 2.5 Flash' },
  },
  {
    id: 'cmaknlkw5000b08ihdvdg8r9w',
    role: 'user',
    content: 'What is the weather like today?',
  },
  {
    id: 'cmaknlond000c08ihaz3s6lq3',
    role: 'assistant',
    content: 'The weather is sunny with a chance of rain later.',
    model: { id: 'gpt-4o', icon: 'GPT', name: 'GPT-4o' },
  },
]
