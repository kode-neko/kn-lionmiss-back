import { PrismaClient } from '@prisma/client';

let prisma: PrismaClient;

function createPrismaClient () {
  prisma = new PrismaClient();
}

function getPrismaClient () {
  return prisma;
}

export {
  createPrismaClient,
  getPrismaClient
};
