import prisma from "../client";
import bcrypt from "bcryptjs"

async function seedDb() {
  const hashedPassword = await bcrypt.hashSync('dr3amp1pe5',10)
  const user = await prisma.user.create({
    data:{
      username: 'KarlK',
      email: 'karlk@karlsworld.com',
      password: hashedPassword,
      validated: true   
    }
  });

  const lists = await prisma.list.createMany({
    data: [
      {
        list_name: 'Shopping List',
        list_desc: 'Planning for the big night',
        list_cat: 'love',
        user_id: 1
      },
      {
        list_name: 'Website Project',
        list_desc: 'List of things to get the web project off the ground',
        list_cat: 'Projects',
        user_id: 1
      },
      {
        list_name: 'Holiday Packing List',
        list_desc: 'Making sure I do not for get anything for my holiday',
        list_cat: 'Holidays',
        user_id: 1
      }
    ]
  })
  
  const listsItems = await prisma.listItem.createMany({
    data: [
      {
        list_item_desc: 'Gravy',
        list_id: 1.
      },
      {
        list_item_desc: 'Potatoes',
        list_id: 1
      },
      {
        list_item_desc: 'Carrots',
        list_id: 1
      },
      {
        list_item_desc: 'Peas',
        list_id: 1
      },
      {
        list_item_desc: 'Something nice for dessert',
        list_id: 1
      },
      {
        list_item_desc: 'Look into hosting options',
        list_id: 2
      },
      {
        list_item_desc: 'Brainstorm domain names',
        list_id: 2
      },
      {
        list_item_desc: 'Decide upon CMS',
        list_id: 2
      },
      {
        list_item_desc: 'Sun cream',
        list_id: 2
      },
      {
        list_item_desc: 'Buy a good book for the beach',
        list_id: 2
      },
      {
        list_item_desc: 'Plan a rough itinerary',
        list_id: 3
      },
      {
        list_item_desc: 'Invite a friend',
        list_id: 3
      }, 
    ]
  })
}

seedDb()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })