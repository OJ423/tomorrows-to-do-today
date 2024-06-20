import prisma from "../client";

async function getData() {
  const dbUsers = await prisma.user.findMany({})
  console.log(dbUsers)
  const dbLists = await prisma.list.findMany({})
  console.log(dbLists)
  const dbListItems = await prisma.listItem.findMany({})
  console.log(dbListItems)
}

getData()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })

