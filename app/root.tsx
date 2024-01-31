import type { LinksFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import styles from "./app.css";
import React, { ReactNode } from "react";

export const links: LinksFunction = () => [{ rel: "stylesheet", href: styles }];

export default function App() {
  return (
    <Document>
      <main className={"flex w-full h-screen"}>
        <aside className={"bg-[#151515] w-[15%] h-screen"}></aside>
        <section className={"w-[85%] px-10  overflow-y-scroll"}>
          <Outlet />
        </section>
      </main>
    </Document>
  );
}

const Document = ({ children }: ReactNode) => {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
        {children}
      </body>
    </html>
  );
};
