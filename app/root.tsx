import type { LinksFunction } from "@remix-run/node";
import { MetaFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useRouteError,
} from "@remix-run/react";
import { ReactNode } from "react";
import styles from "./app.css";
import Navbar from "./components/Navbar";

export const links: LinksFunction = () => [{ rel: "stylesheet", href: styles }];

export const meta: MetaFunction = () => {
  return [
    { title: "Video Game Discovery Site" },
    {
      name: "description",
      content: "List of Video Games ♛ Keep all games in one profile",
    },
  ];
};

export default function App() {
  return (
    <Document>
      <main
        className={
          "relative flex flex-auto w-full flex-col lg:flex-row h-screen"
        }
      >
        <Navbar />
        <section className={"px-4 flex-1 lg:px-8 scrollbar overflow-y-scroll"}>
          <Outlet />
        </section>
      </main>
    </Document>
  );
}

const Document = ({ children }: { children: ReactNode }) => {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
};

export function ErrorBoundary() {
  const error = useRouteError();
  console.error(error);

  return (
    <html lang="en">
      <head>
        <title>Oh no!</title>
        <Meta />
        <Links />
      </head>
      <body>
        <main className="w-full h-screen flex bg-[#151515] justify-center items-center">
          <h1 className="text-5xl text-white font-bold">
            {error?.status === 404 ? "Page Not Found" : "Something Went Wrong"}
          </h1>
        </main>
        <Scripts />
      </body>
    </html>
  );
}
