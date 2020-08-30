import React from "react";
import { render } from "@testing-library/react";
import ExerciseTable from "./ExerciseTable";

const exercises = [
  { id: "uuid1", date: new Date(), type: "first type", seconds: 3600 },
  { id: "uuid2", date: new Date(), type: "second type", seconds: 3600 },
];

test("The ExerciseTable component should be rendered", () => {
  const { getByTestId } = render(<ExerciseTable exercises={exercises} />);
  const exerciseTable = getByTestId("exercise-table");
  expect(exerciseTable).toBeInTheDocument();
});

describe("When the initial state is empty then", () => {
  test("the hours count should display 0 hours 0 hour of exercises", () => {
    const { getByText } = render(<ExerciseTable exercises={[]} />);
    const exerciseTable = getByText("0 hour of exercises");
    expect(exerciseTable).toBeInTheDocument();
  });

  test("it still showing the principal header", () => {
    const { getByText } = render(<ExerciseTable exercises={[]} />);
    const exerciseTable = getByText("Exercise History");
    expect(exerciseTable).toBeInTheDocument();
  });
});

describe("When the initial state is initialized with an exercise list", () => {
  test("then datatable secondary header should contains the sum of hours of exercises", () => {
    const { getByText } = render(<ExerciseTable exercises={exercises} />);
    const exerciseTable = getByText("2 hours of exercises");
    expect(exerciseTable).toBeInTheDocument();
  });

  test("then it should display the exercise list with it respectively columns", () => {
    const { getAllByRole } = render(<ExerciseTable exercises={exercises} />);
    const rows = getAllByRole("row");
    expect(rows.length).toBe(exercises.length + 1);
  });
});
