interface TodoList {
  id: string,
  title: string,
  data: DataTodo[]
}

interface DataTodo {
  id: string,
  title: string,
  description: string,
  tag: string // this will save uuid
}

interface Tag {
  id: string,
  name: string,
  background: string,
  color: string,
  selectedBackground: string
  selectedColor: string
}