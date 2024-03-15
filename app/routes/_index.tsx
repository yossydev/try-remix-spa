import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import type { MetaFunction } from "@remix-run/node";
import { useState } from "react";

export const meta: MetaFunction = () => {
  return [{ title: "Post Page" }];
};

export default function Index() {
  const [text, setText] = useState<string>("");
  const [posts, setPosts] = useState<string[]>([]);

  return (
    <div className="px-10">
      <h1 className="text-3xl font-bold underline">Search Page</h1>

      <div className="pt-5">
        <Textarea
          value={text}
          onChange={(e) => {
            setText(e.target.value);
          }}
        />
        <div className="pt-3 text-right">
          <Button
            onClick={() => {
              setPosts([...posts, text]);
            }}
          >
            Post
          </Button>
        </div>
      </div>

      <ul className="pt-10">
        {posts.map((post, index) => {
          return (
            <li key={index} className="pt-3">
              <Card>
                <CardHeader>
                  <CardTitle>{index}番目の投稿です</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{post}</p>
                </CardContent>
              </Card>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
