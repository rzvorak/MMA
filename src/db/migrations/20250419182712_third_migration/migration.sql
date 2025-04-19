-- CreateEnum
CREATE TYPE "Role" AS ENUM ('BASIC', 'MENTOR', 'ADMIN');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'BASIC';
