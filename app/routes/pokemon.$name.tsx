import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { MetaFunction } from "@remix-run/node";
import { ClientLoaderFunctionArgs, useLoaderData } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [{ title: "Pokemon Detail Page" }];
};

type Pokomen = {};

export const clientLoader = async ({
  params,
}: ClientLoaderFunctionArgs): Promise<Pokomen> => {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${params.name}`);
  const data = await res.json();
  return data;
};

export default function PokemonDetailPage() {
  const data = useLoaderData<typeof clientLoader>();

  return (
    <div className="px-5">
      <h1 className="text-3xl font-bold underline">Pokemon Page</h1>

      <Card>
        <CardHeader>
          <CardTitle>{data.id}</CardTitle>
          <CardDescription>{data.location_area_encounters}</CardDescription>
        </CardHeader>
        <CardContent>{data.name}</CardContent>
      </Card>
    </div>
  );
}
