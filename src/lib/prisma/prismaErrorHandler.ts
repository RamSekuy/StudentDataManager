import { Prisma } from "@prisma/client";

export function prismaErrorHandler(e: unknown): string {
  let errMsg = "An unexpected error occurred";

  if (e instanceof Prisma.PrismaClientKnownRequestError) {
    // Tangani error berdasarkan kode Prisma
    switch (e.code) {
      case "P2002": // Unique constraint failed
        errMsg = "A record with this value already exists.";
        break;
      case "P2025": // Record not found
        errMsg = "The requested record could not be found.";
        break;
      default:
        errMsg = "A database error occurred.";
        break;
    }
  } else if (e instanceof Prisma.PrismaClientValidationError) {
    errMsg = "Invalid data provided to the database.";
  } else if (e instanceof Prisma.PrismaClientInitializationError) {
    errMsg = "Failed to connect to the database.";
  } else if (e instanceof Prisma.PrismaClientRustPanicError) {
    errMsg = "A critical error occurred in the database engine.";
  } else if (e instanceof Error) {
    // Tangani error umum
    errMsg = e.message || errMsg;
  }

  return errMsg;
}