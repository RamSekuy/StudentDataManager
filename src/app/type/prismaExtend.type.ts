import { FoulActivity, Student, StudentFoul } from "@prisma/client";

export type StudentFoulFull = StudentFoul & {
  activity: FoulActivity;
  student: Student;
};

export type StudentFull = Student & { fouls: StudentFoulFull[] };
