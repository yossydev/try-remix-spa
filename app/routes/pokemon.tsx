import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import type { MetaFunction } from "@remix-run/node";
import { Form, Link, Outlet, useLoaderData } from "@remix-run/react";
import { useState } from "react";

export const meta: MetaFunction = () => {
  return [{ title: "Pokemon Page" }];
};

type PokomenList = {
  count: number;
  next: string | null;
  previous: string | null;
  results: {
    name: string;
    url: string;
  }[];
};

export const clientLoader = async (): Promise<PokomenList> => {
  const res = await fetch("https://pokeapi.co/api/v2/pokemon");
  const data = await res.json();
  return data;
};

export default function PokemonPage() {
  const [text, setText] = useState("");
  const data = useLoaderData<typeof clientLoader>();

  return (
    <div className="px-10">
      <h1 className="text-3xl font-bold underline">Pokemon Page</h1>

      <div className="flex-1 p-6">
        <Outlet />
      </div>

      <Form method="get">
        <Input value={text} onChange={(e) => setText(e.target.value)} />
        <Link to={text}>Search</Link>
      </Form>

      <ul className="pt-10">
        {data.results.map((pokemon, index) => {
          return (
            <li key={index} className="pt-3">
              <Link to={pokemon.name}>
                <Card>
                  <CardHeader>
                    <CardTitle>{pokemon.name}</CardTitle>
                    <CardDescription>{pokemon.url}</CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
