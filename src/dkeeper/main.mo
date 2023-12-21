import List "mo:base/List";
import Debug "mo:base/Debug";

actor Dkeeper {
  public type Note = {
    title: Text;
    content: Text;
  };

  stable var notes: List.List<Note> = List.nil<Note>();

  public func createNote(titleText: Text, contentText: Text) {
    let newNote: Note = {
      title = titleText;
      content = contentText;
    };

    notes := List.push(newNote, notes);
    Debug.print(debug_show(notes));
  };

  public query func readNotes(): async [Note]{
    return List.toArray(notes);
  };

  public func deleteNote(id: Nat) {
    var front = List.take(notes,id);
    var back = List.drop(notes,id + 1);
    notes := List.append(front,back);
  };

}
