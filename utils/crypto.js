import md5 from "md5";

export const hashPassword = (password) => md5(password);