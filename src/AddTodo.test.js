import { render, screen, fireEvent} from '@testing-library/react';
import { unmountComponentAtNode } from 'react-dom';
import App from './App';

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});




 test('test that App component doesn\'t render dupicate Task', () => {
  render(<App />);
    var inputTask = screen.getByRole('textbox', {name: /Add New Item/i});
    fireEvent.change(inputTask, {target:{value:"Duplicate item"}});

    var inputDate = screen.getByPlaceholderText("mm/dd/yyyy");
    fireEvent.change(inputDate, { target: { value: "01/01/2023"}});

    var element = screen.getByRole('button', {name: /Add/i});
    fireEvent.click(element);

    inputTask = screen.getByRole('textbox', {name: /Add New Item/i});
    fireEvent.change(inputTask, {target:{value:"Duplicate item"}});

    inputDate = screen.getByPlaceholderText("mm/dd/yyyy");
    fireEvent.change(inputDate, { target: { value: "01/01/2023"}});

    element = screen.getByRole('button', {name: /Add/i});
    fireEvent.click(element);
  
    const check = screen.getAllByText(/Duplicate item/i);
    expect(check.length).toBe(1);

 });

 test('test that App component doesn\'t add a task without task name', () => {
  render(<App />);

  const inputDate = screen.getByPlaceholderText("mm/dd/yyyy");
  fireEvent.change(inputDate, { target: { value: "01/01/2023"}});
  
  const element = screen.getByRole('button', {name: /Add/i});
  fireEvent.click(element);

  var check;
  try{
    check = screen.getByRole("checkbox");
  }catch{
    check = null;
  }
  expect(check).toBe(null);

 });

 test('test that App component doesn\'t add a task without due date', () => {
  render(<App />);

  var inputTask = screen.getByRole('textbox', {name: /Add New Item/i});
  fireEvent.change(inputTask, {target:{value:"Item"}});

  var element = screen.getByRole('button', {name: /Add/i});
  fireEvent.click(element);

  var check;
  try{
    check = screen.getByRole("checkbox");
  }catch{
    check = null;
  }
  expect(check).toBe(null);

 });



 test('test that App component can be deleted thru checkbox', () => {
  render(<App />);

  var inputTask = screen.getByRole('textbox', {name: /Add New Item/i});
  fireEvent.change(inputTask, {target:{value:"Item"}});

  var inputDate = screen.getByPlaceholderText("mm/dd/yyyy");
  fireEvent.change(inputDate, { target: { value: "01/01/2023"}});

  var element = screen.getByRole('button', {name: /Add/i});
  fireEvent.click(element);

  var checkbox = screen.getByRole('checkbox');
  fireEvent.click(checkbox);

  var check;
  try{
    check = screen.getByText(/Item/i);
  }catch{
    check = null;
  }
  expect(check).toBe(null);

 });


 test('test that App component renders different colors for past due events', () => {
  render(<App />);

  var inputTask = screen.getByRole('textbox', {name: /Add New Item/i});
  fireEvent.change(inputTask, {target:{value:"Task"}});

  var inputDate = screen.getByPlaceholderText("mm/dd/yyyy");
  fireEvent.change(inputDate, { target: { value: "01/01/2023"}});

  var element = screen.getByRole('button', {name: /Add/i});
  fireEvent.click(element);

  const taskCheck = screen.getByText(/Task/i).style.background
  expect(taskCheck).not.toBe("white")
 });
