import { AppLayout } from "../components/AppLayout";
import { NotFound } from "../pages/NotFound";
import { refundLoader } from "../pages/Refund";
import { lazy, Suspense } from "react";
const Dashboard = lazy(() => import("../pages/Dashboard").then((m) => ({ default: m.Dashboard })));
const Refund = lazy(() => import("../pages/Refund").then((m) => ({ default: m.Refund })));
const Loading = () => <div className="p-8 text-center text-gray-200">Carregando...</div>;

export const managerRoutes = [
    {
        path: "/",
        element: <AppLayout />,
        children: [
            {
                index: true,
                element: <Suspense fallback={<Loading />}><Dashboard /></Suspense>,
            },
            {
                path: "/refunds/:id",
                element: <Suspense fallback={<Loading />}><Refund /></Suspense>,
                loader: refundLoader,
                errorElement: <NotFound />
            },
        ]
    },
    {
        path: "*",
        element: <NotFound />,
    },
]
