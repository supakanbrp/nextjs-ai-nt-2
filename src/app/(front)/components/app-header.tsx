import AppButton from "./app-button";

export default function AppHeader() {
  const isShow = true;
  const students = ['John', 'Mary']; // []

  return (
    <div>
        <h1>Hello Header</h1>
        <AppButton />
        <p>Cosci SWU</p>
        {
          students.length > 0 ? <p>Student data found</p> : <p>No data found...</p>
        }
        {
          students.length > 0 && <p>Total students: {students.length}</p>
        }
        {
          isShow && <hr />
        }
    </div>
  );
}