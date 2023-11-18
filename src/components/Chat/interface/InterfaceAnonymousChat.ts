export default interface MessageProps {
  id: number;
  userId: string;
  content: string;
}

export interface MessagePropsList {
  chatContainerRef: React.RefObject<HTMLUListElement>;
  messages: MessageProps[];
  userId: string;
}
