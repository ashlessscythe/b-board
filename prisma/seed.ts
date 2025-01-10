const { PrismaClient, Role } = require("@prisma/client");
const bcrypt = require("bcrypt");
const { hash } = bcrypt;
const yargs = require("yargs");
const { faker } = require("@faker-js/faker");

const prisma = new PrismaClient();

// Parse command line arguments
const argv = yargs
  .option("clear", {
    type: "boolean",
    description: "Clear all data before seeding",
    default: false,
  })
  .option("count", {
    type: "number",
    description: "Number of additional users and announcements to create",
    default: 0,
  })
  .option("use-faker", {
    type: "boolean",
    description: "Use faker to generate random data",
    default: false,
  })
  .help().argv;

async function clearDatabase() {
  console.log("Clearing database...");
  await prisma.announcement.deleteMany();
  await prisma.user.deleteMany();
  await prisma.department.deleteMany();
  console.log("Database cleared.");
}

function generateAnnouncement(authorId: string, departmentIds: string[]) {
  if (!argv["use-faker"]) {
    return {
      title: "Welcome to B-Board",
      description:
        "This is a sample announcement to demonstrate the bulletin board system.",
      startDate: new Date(),
      endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      authorId: authorId,
      departments: {
        connect: departmentIds.map((id) => ({ id })),
      },
    };
  }

  // Generate more interesting title by combining different faker methods
  const titleParts = [
    faker.company.buzzVerb(),
    faker.company.buzzAdjective(),
    faker.company.buzzNoun(),
  ];
  const title = titleParts.join(" ") + ": " + faker.company.catchPhrase();

  // Generate more engaging description
  const descriptionParts = [
    `🎯 Objective: ${faker.company.catchPhrase()}`,
    `\n\n📋 Overview: ${faker.lorem.paragraph()}`,
    `\n\n🔑 Key Points:\n${Array(3)
      .fill(null)
      .map(() => "• " + faker.company.buzzPhrase())
      .join("\n")}`,
    `\n\n💡 Innovation Focus: ${faker.company.catchPhrase()}`,
    `\n\n🎉 Expected Outcome: ${faker.lorem.sentence()}`,
    `\n\n📅 Timeline: ${faker.date.future().toLocaleDateString()} - ${faker.date
      .future()
      .toLocaleDateString()}`,
    `\n\n✨ Additional Notes: ${faker.lorem.paragraph()}`,
  ];

  return {
    title,
    description: descriptionParts.join(""),
    startDate: new Date(),
    endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    authorId: authorId,
    departments: {
      connect: departmentIds.map((id) => ({ id })),
    },
  };
}

async function main() {
  if (argv.clear) {
    await clearDatabase();
  }

  // Create departments
  const departments = [
    { name: "Human Resources" },
    { name: "Information Technology" },
    { name: "Finance" },
    { name: "Marketing" },
    { name: "Operations" },
    { name: "Research and Development" },
    { name: "Sales" },
    { name: "Legal" },
    { name: "Customer Service" },
    { name: "Administration" },
  ];

  console.log("Seeding departments...");
  const createdDepartments = await Promise.all(
    departments.map((dept) =>
      prisma.department.create({
        data: dept,
      })
    )
  );
  const departmentIds = createdDepartments.map((d) => d.id);

  // Create default users
  console.log("Creating default users...");
  const bobHash = await hash("bobspass", 12);
  const jimHash = await hash("jimspass", 12);

  const bob = await prisma.user.create({
    data: {
      email: "bob@bob.bob",
      name: "Bob",
      password: bobHash,
      role: Role.ADMIN,
      departments: {
        connect: departmentIds.map((id) => ({ id })),
      },
    },
  });

  const jim = await prisma.user.create({
    data: {
      email: "jim@jim.jim",
      name: "Jim",
      password: jimHash,
      role: Role.VIEWER,
      departments: {
        connect: departmentIds.map((id) => ({ id })),
      },
    },
  });

  // Create additional users if count > 0
  const users = [bob, jim];
  if (argv.count > 0) {
    console.log(`Creating ${argv.count} additional users...`);
    for (let i = 0; i < argv.count; i++) {
      const hashedPassword = await hash("password123", 12);
      const user = await prisma.user.create({
        data: {
          email: faker.internet.email(),
          name: faker.person.fullName(),
          password: hashedPassword,
          role: Math.random() > 0.5 ? Role.CONTRIBUTOR : Role.VIEWER,
          departments: {
            connect: departmentIds
              .sort(() => 0.5 - Math.random())
              .slice(0, Math.floor(Math.random() * departmentIds.length) + 1)
              .map((id) => ({ id })),
          },
        },
      });
      users.push(user);
    }
  }

  // Create announcements (one per CONTRIBUTOR)
  const contributors = users.filter((user) => user.role === Role.CONTRIBUTOR);
  console.log(
    `Creating announcements for ${contributors.length} contributors...`
  );

  for (const contributor of contributors) {
    const randomDeptCount = Math.floor(Math.random() * 3) + 1; // 1-3 departments
    const randomDeptIds = [...departmentIds]
      .sort(() => 0.5 - Math.random())
      .slice(0, randomDeptCount);

    await prisma.announcement.create({
      data: generateAnnouncement(contributor.id, randomDeptIds),
    });
  }

  console.log("Seeding completed.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
