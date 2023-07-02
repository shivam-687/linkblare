import { Collection, Link, LinkType, PrismaClient } from "@prisma/client";
import {faker} from '@faker-js/faker'
import {getRandomElement} from '../src/utils/helpers'

const prisma = new PrismaClient();

async function seedLinks(collectionIds: number[]) {
  const linksList: Link[] = []
  try {
    const linkTypes: LinkType[] = ['PAGE', 'ARTICLE', 'VIDEO'];

    // Delete all links
    await prisma.link.deleteMany();

    // Generate 30 links for the collection
    for (let i = 0; i < 100; i++) {
      const collectionId = getRandomElement(collectionIds);
      const title = faker.lorem.words(3);
      const url = faker.internet.url();
      const desc = faker.lorem.sentence();
      const favicon = faker.internet.url();
      const type = getRandomElement(linkTypes)||LinkType.PAGE;
      const visits = faker.datatype.number(100);

      if(collectionId){
        const res = await prisma.link.create({
          data: {
            title,
            url,
            desc,
            favicon,
            type,
            visits,
            collectionId,
          },
        });
        linksList.push(res);
        console.log(`Link {id: ${res.id}, name: ${res.title}} created successfully`);
      }
    }
    console.log('Links seeded successfully!');
  } catch (error) {
    console.error('Error seeding links:', error);
  }

  return linksList;
}


async function seedCollection(){
  const collections: Collection[] = [];
  const admins = await prisma.user.findMany({where: {role: 'ADMIN'}});
  const admin = admins[0];
  if(admins.length <= 0 || !admin) return collections;

  await prisma.collection.deleteMany();

  try {
    for (let index = 0; index < 50; index++) {
    
      const res = await prisma.collection.create({
        data: {
          title: faker.lorem.words(3),
          desc: faker.lorem.sentence(),
          image: faker.image.abstract(500, 500),
          createdBy: {
            connect: {id: admin.id}
          },
        
        }
      })
  
      collections.push(res);
      console.log(`Collection {id: ${res.id}, name: ${res.title}} created successfully`);
    }

    return collections;
  } catch (error) {
    console.error("Error in seeding collections: ", error)
  }

  return collections;
}


async function seed () {
    // await seedLinks()
    try {
      const collections = await seedCollection();
      if(collections.length <= 0 ) return;
      const links = await seedLinks(collections.map(coll => coll.id))
    } catch (error) {
      console.error("Error in seeding database")
    }finally {
      await prisma.$disconnect();
    }
}

void seed();
