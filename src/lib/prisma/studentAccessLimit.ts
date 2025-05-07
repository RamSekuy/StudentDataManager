import Auth from "../auth/serverAuth.class";

export const gradeLimit = async () => {
  const token = await new Auth().getToken();
  const access = token.gradeAccess;
 return !Array.isArray(access)
  ? undefined
  : access.map((grade) => Number(grade)).filter((grade) => !isNaN(grade))
}