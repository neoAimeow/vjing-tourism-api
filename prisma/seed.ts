import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';

const prisma = new PrismaClient();

async function main() {
    dotenv.config();
    console.log('Seeding...');

    const user1 = await prisma.user.create({
        data: {
            email: 'lisa@simpson.com',
            name: 'Simpson',
            password:
                '$2b$10$EpRnTzVlqHNP0.fUbXUwSOyuiXe/QLSUG6xNekdHgTGmrpHEfIoxm', // secret42
            role: 'USER',
        },
    });
    const user2 = await prisma.user.create({
        data: {
            email: 'bart@simpson.com',
            name: 'Bart',
            role: 'ADMIN',
            password:
                '$2b$10$EpRnTzVlqHNP0.fUbXUwSOyuiXe/QLSUG6xNekdHgTGmrpHEfIoxm', // secret42
        },
    });

    console.log({ user1, user2 });
}

main()
    .catch((e) => console.error(e))
    .finally(async () => {
        await prisma.$disconnect();
    });
