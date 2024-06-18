import prisma from "../client";

export async function createList(list_name:string, list_desc:string, list_cat:string, user_id:number) {
  const newList = await prisma.list.create({
    data: {
      list_name,
      list_desc,
      list_cat,
      user_id: user_id
    }
  })
  return newList
}

export async function fetchListsByUser(user_id: number) {
  const getUserLists = await prisma.list.findMany({
    where: {
      user_id: user_id
    }
  });
  return getUserLists;
}

export async function fetchListById(list_id: number) {
  const list = await prisma.list.findUnique({
    where: {
      list_id: list_id
    }
  });
  return list;
}