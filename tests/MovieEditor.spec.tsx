import type { Movie } from "../src/interfaces/movie";
import { MovieEditor } from "../src/components/MovieEditor";
import { render, screen } from "@testing-library/react";
import { fireEvent } from "@testing-library/react";
describe("MovieEditor Component", () => {
    const mockMovie: Movie = {
        id: "test-movie-123",
        title: "The Test Movie",
        rating: 8,
        description: "A movie for testing",
        released: 2020,
        soundtrack: [{ id: "song1", name: "Test Song", by: "Test Artist" }],
        watched: {
            seen: true,
            liked: true,
            when: "2023-01-01",
        },
    };

    const mockChangeEditing = jest.fn();
    const mockEditMovie = jest.fn();
    const mockDeleteMovie = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
        render(
            <MovieEditor
                changeEditing={mockChangeEditing}
                movie={mockMovie}
                editMovie={mockEditMovie}
                deleteMovie={mockDeleteMovie}
            ></MovieEditor>,
        );
    });

    test("renders MovieEditor with initial movie data", () => {
        const title = screen.getByDisplayValue("The Test Movie");

        expect(title).toBeInTheDocument();
    });

    test("sets the title and saves the movie", () => {
    const titleInput = screen.getByDisplayValue("The Test Movie");

    fireEvent.change(titleInput, {
        target: { value: "New Title" }
    });

    const saveButton = screen.getByRole("button", {
        name: /Save/i
    });

    fireEvent.click(saveButton);

    expect(mockEditMovie).toHaveBeenCalledWith("test-movie-123", {
        ...mockMovie,
        title: "New Title"
    });

    expect(mockChangeEditing).toHaveBeenCalled();
});

    test("sets release year", ()=>{
        const yearInput = screen.getByDisplayValue("2020");
        fireEvent.change(yearInput, {
            target: {value: "2021"}
        });

        const saveButton = screen.getByRole("button", {
        name: /Save/i
    });

    fireEvent.click(saveButton);

        expect(mockEditMovie).toHaveBeenCalledWith("test-movie-123", {
        ...mockMovie,
        released: 2021
    });

    expect(mockChangeEditing).toHaveBeenCalled();
    });

    test("sets rating", ()=>{
        const ratingInput = screen.getByRole("combobox");
        fireEvent.change(ratingInput, {
            target: {value: "0"}
        });

        const saveButton = screen.getByRole("button", {
        name: /Save/i
    });

    fireEvent.click(saveButton);
    expect(mockEditMovie).toHaveBeenCalledWith("test-movie-123", {
        ...mockMovie,
        rating: 0
    });

    expect(mockChangeEditing).toHaveBeenCalled();

    });

    test("calls changeEditing on cancel", () => {
    const cancelButton = screen.getByRole("button", {
        name: /Cancel/i
    });

    fireEvent.click(cancelButton);

    expect(mockChangeEditing).toHaveBeenCalled();
});

    test("edits description", ()=>{
        const descriptionInput = screen.getByDisplayValue("A movie for testing");
        fireEvent.change(descriptionInput, {
            target: {value: "new"}
        });
        const saveButton = screen.getByRole("button", {
        name: /Save/i
    });

    fireEvent.click(saveButton);
    expect(mockEditMovie).toHaveBeenCalledWith("test-movie-123", {
        ...mockMovie,
        description: "new"
    });

    expect(mockChangeEditing).toHaveBeenCalled();
    });
    

});
