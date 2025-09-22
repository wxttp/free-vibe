import { PrismaClient } from "../src/generated/prisma/client.js";
const prisma = new PrismaClient()

async function main() {

  const user1 = await prisma.user.upsert({
    where: { id: 2 },
    update: {},
    create: {
      name: "User 2",
      email: "user2@example.com",
      password: "123456",
    },
  });

  const user2 = await prisma.user.upsert({
    where: { id: 3 },
    update: {},
    create: {
      name: "User 3",
      email: "user3@example.com",
      password: "123456",
    },
  });
  const song = await prisma.song.upsert({
    where: { id: 1 },
    update: {},
    create: {
      title: '28',
      artist: 'Three Man Down',
      file: null,
      url: null,
      isUrl: false,
      user: { connect: { id: user2.id } },
    },
  })

  const song2 = await prisma.song.upsert({
    where: { id: 2 },
    update: {},
    create: {
      title: 'RAMA IX',
      artist: 'Three Girl Up',
      file: null,
      url: null,
      isUrl: false,
      user: { connect: { id: user2.id } },
    },
  })

  const song3 = await prisma.song.upsert({
    where: { id: 3 },
    update: {},
    create: {
      title: 'ก็แค่พูดมา',
      artist: 'Three Man Down',
      file: null,
      url: null,
      isUrl: false,
      user: { connect: { id: user2.id } },
    },
  })

  const song4 = await prisma.song.upsert({
    where: { id: 4 },
    update: {},
    create: {
      title: 'แปลไม่ออก',
      artist: 'Billkin',
      file: null,
      url: null,
      isUrl: false,
      user: { connect: { id: user1.id } },
    },
  })
  const song5 = await prisma.song.upsert({
    where: { id: 5 },
    update: {},
    create: {
      title: 'ถ้า',
      artist: 'Mr.Team',
      file: null,
      url: null,
      isUrl: false,
      user: { connect: { id: user2.id } },
    },
  })

  const song6 = await prisma.song.upsert({
    where: { id: 6 },
    update: {},
    create: {
      title: 'Why tho?',
      artist: 'TIMETHAI',
      file: null,
      url: null,
      isUrl: false,
      user: { connect: { id: user1.id } },
    },
  })
  const song7 = await prisma.song.upsert({
    where: { id: 7 },
    update: {},
    create: {
      title: 'B.Y.S',
      artist: 'keshi',
      file: null,
      url: null,
      isUrl: false,
      user: { connect: { id: user1.id } },
    },
  })

  const song8 = await prisma.song.upsert({
    where: { id: 8 },
    update: {},
    create: {
      title: 'SAYONARA',
      artist: 'MILD',
      file: null,
      url: null,
      isUrl: false,
      user: { connect: { id: user1.id } },
    },
  })
  const song9 = await prisma.song.upsert({
    where: { id: 9 },
    update: {},
    create: {
      title: 'มันเป็นใคร',
      artist: 'Polycat',
      file: null,
      url: null,
      isUrl: false,
      user: { connect: { id: user1.id } },
    },
  })

  const song10 = await prisma.song.upsert({
    where: { id: 10 },
    update: {},
    create: {
      title: 'One',
      artist: 'Aimer',
      file: null,
      url: null,
      isUrl: false,
      user: { connect: { id: user1.id } },
    },
  })
  const song11 = await prisma.song.upsert({
    where: { id: 11 },
    update: {},
    create: {
      title: 'One Last Kiss',
      artist: 'LOLUET',
      file: null,
      url: null,
      isUrl: false,
      user: { connect: { id: user1.id } },
    },
  })

  const song12 = await prisma.song.upsert({
    where: { id: 12 },
    update: {},
    create: {
      title: 'ไปได้ดี',
      artist: 'WANYAi',
      file: null,
      url: null,
      isUrl: false,
      user: { connect: { id: user1.id } },
    },
  })

  console.log({ song, song2, song3, song4, song5, song6, song7, song8, song9, song10, song11, song12 })
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })