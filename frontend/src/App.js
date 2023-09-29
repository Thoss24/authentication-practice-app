import { RouterProvider, createBrowserRouter } from "react-router-dom";

import EditEventPage from "./pages/EditEvent";
import ErrorPage from "./pages/Error";
import EventsRootLayout from "./pages/EventsRoot";
import HomePage from "./pages/Home";
import NewEventPage from "./pages/NewEvent";
import RootLayout from "./pages/Root";
import { action as manipulateEventAction } from "./components/EventForm";
import AuthenticationPage, {
  action as authAction,
} from "./pages/Authentication";
import { lazy } from "react";
import { Suspense } from "react";

const EventsPage = lazy(() => import("./pages/Events"));
const EventDetailPage = lazy(() => import("./pages/EventDetail"));
const NewsletterPage = lazy(() => import("./pages/Newsletter"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: "events",
        element: <EventsRootLayout />,
        children: [
          {
            index: true,
            element: (
              <Suspense fallback={<p>Loading...</p>}>
                <EventsPage />
              </Suspense>
            ),
            loader: () =>
              import("./pages/Events").then((module) => module.loader()),
          },
          {
            path: ":eventId",
            id: "event-detail",
            loader: (meta) =>
              import("./pages/EventDetail").then((module) =>
                module.loader(meta)
              ),
            children: [
              {
                index: true,
                element: (
                  <Suspense fallback={<p>Loading...</p>}>
                    <EventDetailPage />
                  </Suspense>
                ),
                action: (meta) =>
                  import("./pages/EventDetail").then((module) =>
                    module.action(meta)
                  ),
              },
              {
                path: "edit",
                element: <EditEventPage />,
                action: manipulateEventAction,
              },
            ],
          },
          {
            path: "new",
            element: <NewEventPage />,
            action: manipulateEventAction,
          },
        ],
      },
      {
        path: "newsletter",
        element: (
          <Suspense fallback={<p>Loading...</p>}>
            <NewsletterPage />
          </Suspense>
        ),
        action: (meta) =>
          import("./pages/Newsletter").then((module) => module.action(meta)),
      },
      {
        path: "auth",
        element: <AuthenticationPage />,
        action: authAction,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
