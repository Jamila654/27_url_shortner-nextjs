'use client';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { MdContentCopy } from "react-icons/md";

export default function Home() {
  const [inputURL, setinputURL] = useState<string>("");
  const [shortURL, setshortURL] = useState<string>("");
  const [loading, setloading] = useState<boolean>(false);
  const [error, seterror] = useState<string>("");

  const handleShorten = async () => {
    if (!inputURL) {
      return;
    }
    setloading(true);
    seterror("");

    try {
      const response = await fetch("https://api.rebrandly.com/v1/links", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: "f56259434d694a35b9091c87b5f7071d",
        },
        body: JSON.stringify({
          destination: inputURL,
          domain: { fullName: "rebrand.ly" },
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to shorten the URL. Please try again.");
      }

      const data = await response.json();
      setshortURL(data.shortUrl);
    } catch (error: any) {
      seterror(error.message);
    } finally {
      setloading(false);
    }
  };

  const handleCopy = async () => {
    navigator.clipboard.writeText(shortURL);
    alert("URL Copied Successfully!");
  };

  return (
    <div className="flex items-center justify-center bg-zinc-700 min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <Card>
        <CardHeader className=" text-center">
          <CardTitle>URL Shortener</CardTitle>
          <CardDescription>Paste your long URL and get a short, shareable link.</CardDescription>
        </CardHeader>
        <CardContent className="flex gap-4">
          <Input
            value={inputURL}
            onChange={(e) => setinputURL(e.target.value)}
            placeholder="Paste your long URL here"
          />
          <Button onClick={handleShorten} disabled={loading}>
            {loading ? "Shortening..." : "Shorten"}
          </Button>
        </CardContent>
        <CardFooter>
          {error && <div className="error">{error}</div>}
          {shortURL && (
            <div className="shortenURL flex items-center justify-between w-full">
              <h1>{shortURL}</h1>
              <Button onClick={handleCopy}>
                <MdContentCopy />
              </Button>
            </div>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}





