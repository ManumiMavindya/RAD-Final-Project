import React from 'react';

interface MessageParserProps {
  children: React.ReactNode;
  actions: any;
}

const MessageParser = ({ children, actions }: MessageParserProps) => {
  const parse = (message: string) => {
    actions.handlePlantQuery(message);
  };

  return (
    <>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child as React.ReactElement, {
          parse: parse,
          actions,
        });
      })}
    </>
  );
};

export default MessageParser;