// Todo object type definition
// id: unique identifier for the todo
// title: main task description
// description: optional detailed description
// completed: whether the todo is finished
// createdAt: ISO timestamp when the todo was created

export const todoShape = {
  id: '', // string
  title: '', // string
  description: '', // string
  completed: false, // boolean
  createdAt: '', // string (ISO format)
};
