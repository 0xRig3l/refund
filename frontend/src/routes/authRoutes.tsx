import { AuthLayout } from "../components/AuthLayout";
import { NotFound } from "../pages/NotFound";
import { lazy, Suspense } from "react";
const SignIn = lazy(() => import("../pages/SignIn").then((m) => ({ default: m.SignIn })));
const SignUp = lazy(() => import("../pages/SignUp").then((m) => ({ default: m.SignUp })));
const Loading = () => <div className="p-8 text-center text-gray-200">Carregando...</div>;

export const authRoutes = [
    {
        path: "/",
        element: <AuthLayout />,
        children: [
            {
                index: true,
                element: <Suspense fallback={<Loading />}><SignIn /></Suspense>,
            },
            {
                path: "signup",
                element: <Suspense fallback={<Loading />}><SignUp /></Suspense>
            }
        ]
    },
    {
        path: "*",
        element: <NotFound />
    }
]
