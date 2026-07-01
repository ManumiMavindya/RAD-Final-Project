import React from 'react';

const ActionProvider = ({ createChatBotMessage, setState, children }: any) => {
  
  const handlePlantQuery = async (userMessage: string) => {
    const botMessage = createChatBotMessage("I am analyzing your plant...");
    
    setState((prev: any) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));

    try {
      const response = await fetch("http://localhost:5000/api/v1/ai/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: userMessage })
      });
      
      const data = await response.json();
      console.log("AI Response:", data);
      const finalMessage = createChatBotMessage(data.reply);
      
      setState((prev: any) => ({
        ...prev,
        messages: [...prev.messages.filter((msg: any) => msg.message !== "I am analyzing your plant..."), finalMessage],
      }));
    } catch (error) {
      const errorMessage = createChatBotMessage("Sorry, I'm having trouble connecting!");
      setState((prev: any) => ({
        ...prev,
        messages: [...prev.messages, errorMessage],
      }));
    }
  };

  return (
    <div>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child as React.ReactElement, {
          actions: { handlePlantQuery },
        });
      })}
    </div>
  );
};

export default ActionProvider;