import { NextFunction, Request, Response } from "express";

export default function checkUserRole(allowedRoles: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    const userRole = res.locals.user?.role;

    if (!userRole || !allowedRoles.includes(userRole)) {
      console.log(`Acesso negado! Role do usuário: ${userRole}`);
      res.status(403).json({ message: "Acesso negado!" });
    }
    next();
  };
}