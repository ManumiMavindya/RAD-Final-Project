import { createChatBotMessage} from 'react-chatbot-kit';

const config: any = {
  botName: "GreenBuddy",
  initialMessages: [
    createChatBotMessage("Hi! I'm GreenBuddy. How can I help with your plants today? 🌱", {
      delay: 500, 
    })
  ],
  customStyles: {
    botMessageBox: { backgroundColor: "#16a34a" },
    chatButton: { backgroundColor: "#16a34a" },
  },
};

export default config;