type APIUserRole = "employee" | "manager";
type APIUserResponse = {
  token: string;
  user: {
    id: string;
    email: string;
    name: string;
    role: APIUserRole;
    // createdAt: string;
    // updatedAt: string;
  };
};
