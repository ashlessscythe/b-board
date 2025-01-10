import { Role, Department } from "@prisma/client";
import "next-auth";

declare module "next-auth" {
  interface User {
    id: string;
    role: Role;
    departments: Department[];
  }

  interface Session {
    user: User & {
      id: string;
      role: Role;
      departments: Department[];
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: Role;
    departments: Department[];
  }
}
