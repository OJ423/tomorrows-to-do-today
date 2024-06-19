import prisma from "../client"

export async function createListItem(list_item_desc:string, list_id:number) {
  const newListItem = await prisma.listItem.create({
    data: {
      list_item_desc,
      list_id,
    }
  })
  return newListItem
}

export async function fetchListItemsByList(list_id: number) {
  const getListItems = await prisma.listItem.findMany({
    where: {
      list_id: list_id
    }
  });
  return getListItems;
}

export async function updateListItemCompleteStatus(list_item_id:number, completed:boolean) {
  const completeToDo = await prisma.listItem.update({
    where: {
      list_item_id: list_item_id
    },
    data: {
      completed: completed
    }
  })
  return completeToDo
}

export async function removeListItem(list_item_id:number) {
  const deleteListItem = await prisma.listItem.delete({
    where: {
      list_item_id: list_item_id
    }
  })
  return deleteListItem
}