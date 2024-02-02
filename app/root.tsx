import type { LinksFunction } from "@remix-run/node";
import { json, MetaFunction } from "@remix-run/node";
import {
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import styles from "./app.css";
import React, { ReactNode } from "react";
import { getGenresList } from "~/action/genres.action";
import { Genre, GenreResponse } from "~/types";
import GenreList from "~/components/GenreList";

interface LoaderData {
  genres: Awaited<GenreResponse>;
}

export const links: LinksFunction = () => [{ rel: "stylesheet", href: styles }];

export const meta: MetaFunction = () => {
  return [
    { title: "Video Game Discovery Site" },
    {
      name: "description",
      content:
        "List of Video Games ♛ Keep all games in one profile ✔ See what friends are playing, and find your next great game",
    },
  ];
};

export default function App() {
  const { genres } = useLoaderData<LoaderData>();

  return (
    <Document>
      <main className={"flex w-full h-screen"}>
        <Sidebar genres={genres.results} />
        <section className={"w-full lg:w-[85%] px-4 lg:px-8 overflow-y-scroll"}>
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
        {children}
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
};

const Sidebar = ({ genres }: { genres: Genre[] }) => {
  return (
    <aside
      className={
        "hidden lg:block bg-[#151515] w-[15%] px-6 overflow-y-scroll border-r border-r-[#2B271F] border-r-2"
      }
    >
      <nav>
        {/*<span className={"block text-white text-3xl font-bold font-mono"}>*/}
        {/*  GAME ZONE*/}
        {/*</span>*/}
        <Link to={"/games"}>
          <span className={"nav-link"}>All Games</span>
        </Link>
        <Link to={"/genres"}>
          <span className={"nav-link"}>Genres</span>
        </Link>
        {/*<GenreList genres={genres} />*/}
      </nav>
    </aside>
  );
};

export const loader = async () => {
  return json<LoaderData>({ genres: await getGenresList(5) });
};
