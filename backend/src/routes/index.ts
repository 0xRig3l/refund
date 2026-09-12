import { Router } from "express";

import { usersRoutes } from "./users-routes";
import { sessionsRoutes } from "./sessions-routes";
import { refundsRoutes } from "./refunds-routes";
import { uploadsRoutes } from "./uploads-routes";

import { ensureAuthenticated } from "@/middlewares/ensure-authenticated";

const routes = Router();

// Public routes.
routes.use("/users", usersRoutes);
routes.use("/sessions", sessionsRoutes);

// Private routes.
routes.use(ensureAuthenticated);
routes.use("/refunds", refundsRoutes);
routes.use("/uploads", uploadsRoutes);

export { routes };
