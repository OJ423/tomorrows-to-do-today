export type LogInInputs = {
  email: string,
  password: string,
}

export type NewListInput = {
  list_name: string,
  list_desc: string,
  list_cat: string
}

export type List = {
  list_id: number,
  list_name: string,
  list_desc: string,
  list_cat: string,
  user_id: number
}