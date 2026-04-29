import { fireEvent, render, screen } from "@testing-library/react";
import App from "../src/App";
import userEvent from "@testing-library/user-event";
import { EditableSongList } from "../src/components/EditableSongList";


describe("App Component", () => {
    test("renders the course name somewhere", () => {
        render(<App />);
        const linkElement = screen.getByText(/Movie Records/i);
        expect(linkElement).toBeInTheDocument();
    });
});


test("marks a movie as watched", () => {
    render(<App />);

    const watchButton = screen.getAllByRole("button", {
        name: /Watch/i
    })[0];

    fireEvent.click(watchButton);

    expect(screen.getByText(/Seen: Yes/i))
        .toBeInTheDocument();
});

test("edits movie", ()=>{
    render(<App />);

    const input = screen.getByDisplayValue(/Sinners/i);

    fireEvent.change(input, {
        target: {value: "New Title"}
    });

    expect(screen.getByDisplayValue(/New Title/i)).toBeInTheDocument();
});

test("deleted movie", ()=>{
    render(<App />);

    expect(screen.getByText(/Movie/i)).toBeInTheDocument();

    // click delete button for that movie
    const deleteButtons = screen.getAllByRole("button", {
        name: /Delete/i
    });

    fireEvent.click(deleteButtons[0]);

    // movie should disappear
    expect(screen.queryByText(/Movie/i)).not.toBeInTheDocument();
});

test("adds a new song", () => {
    const mockSetSongs = jest.fn();

    render(<EditableSongList 
        songs={[]}
        setSongs={mockSetSongs}
    />);
    
    const addSongButton = screen.getByRole("button", {
        name: /Add Song/i
    });
        
    userEvent.click(addSongButton);
    
    expect(mockSetSongs).toHaveBeenCalledWith([""]);

})

//deletesong
test("deletes a song from the list", ()=>{
    const mockSetSongs = jest.fn();

    render(<EditableSongList 
        songs={["Song"]}
        setSongs={mockSetSongs}
    />);

    const deleteSongButton = screen.getByRole("button", {
        name: /❌/i
    });

    userEvent.click(deleteSongButton);

    expect(mockSetSongs).lastCalledWith([]);
})

//editsong
test("edits song", ()=>{
    const mockSetSongs = jest.fn();

    render(<EditableSongList 
        songs={["Old Song"]}
        setSongs={mockSetSongs}
    />);

    const songInput = screen.getByDisplayValue("Old Song");

    fireEvent.change(songInput, {
        target: {value: "New Song"}
    });

    expect(mockSetSongs).toHaveBeenCalledWith(["New Song"]);
})

