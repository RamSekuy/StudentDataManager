import { Foul, FoulDetail, ReportedFoul, Student } from "@prisma/client";

export type StudentWithFouls = Student & {
  fouls: (ReportedFoul & {
    foulDetail: FoulDetail & {
      foul: Foul;
    };
  })[];
};