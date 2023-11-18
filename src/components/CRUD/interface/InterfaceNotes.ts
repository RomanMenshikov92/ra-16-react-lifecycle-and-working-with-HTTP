export default interface NoteProps {
  id: number;
  content: string;
}

export interface NoteListProps {
  notes: NoteProps[];
  onDeleteNote: (id: number) => void;
}
