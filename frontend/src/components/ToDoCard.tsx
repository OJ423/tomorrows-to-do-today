import { ToDoItems } from "@/utils/custom-types"

interface ItemProps {
  toDo: ToDoItems
}

const ToDoCard: React.FC<ItemProps>  = ({toDo}) => {
  
  
  return(<p>To DO Card</p>)
}

export default ToDoCard