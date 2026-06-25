import React from 'react';

interface ActionProviderProps {
  createChatBotMessage: (message: string) => any;
  setState: React.Dispatch<React.SetStateAction<any>>;
  children: React.ReactNode;
}

const ActionProvider = ({ createChatBotMessage, setState, children }: ActionProviderProps) => {
  
  const handlePlantQuery = async (userMessage: string) => {
    const botMessage = createChatBotMessage("I am analyzing your plant...");
    setState((prev: any) => ({ ...prev, messages: [...prev.messages, botMessage] }));
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