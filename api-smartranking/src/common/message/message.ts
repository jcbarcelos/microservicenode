export interface IMessage {
  type: string;
  message: string;
}

export const Messagefunction = ({ type, message }: IMessage) => {
  return {
    type,
    message,
  };
};
