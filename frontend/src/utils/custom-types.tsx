export type LogInInputs = {
  email: string,
  password: string,
}

export type RegistrationInputs = {
  username: string,
  email: string,
  password: string
}

export type NewListInput = {
  list_name: string,
  list_desc: string,
  list_cat: string
}

export type NewToDoInput = {
  list_item_desc: string
}

export type List = {
    list_id: number,
    list_name: string,
    list_desc: string,
    list_cat: string,
    user_id: number
}

export type ToDoItems = {
    list_item_id: number,
    list_item_date: string,
    list_item_desc: string,
    completed: boolean,
    list_id: number
}

export type ToDoCompleted = {
  completed: boolean
}