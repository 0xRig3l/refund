import { refundLoader } from "../pages/Refund"
import { NotFound } from "../pages/NotFound"
import { AppLayout } from "../components/AppLayout"
import { lazy, Suspense } from "react"
const Refund = lazy(() => import("../pages/Refund").then((m) => ({ default: m.Refund })))
const ConfirmPage = lazy(() => import("../pages/Confirm").then((m) => ({ default: m.Confirm })))
const Loading = () => <div className="p-8 text-center text-gray-200">Carregando...</div>

export const employeeRoutes = [
    {
        path: "/",
        element: <AppLayout />,
        children: [
            {
                index: true,
                element: <Suspense fallback={<Loading />}><Refund /></Suspense>,
            },
            {
                path: "refunds/:id",
                element: <Suspense fallback={<Loading />}><Refund /></Suspense>,
                loader: refundLoader,
                errorElement: <NotFound />
            },
            {
                path: "confirm",
                element: <Suspense fallback={<Loading />}><ConfirmPage /></Suspense>
            }
        ]
    },
    {
        path: "*",
        element: <NotFound />,
    },
]
