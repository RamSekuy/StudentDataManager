import { PrismaClient } from "@prisma/client";
export const prisma = new PrismaClient(
    {omit:{
        student:{
            password:true,
        },
        reportedFoul:{
            confirmed:true,
        }
    }}
);