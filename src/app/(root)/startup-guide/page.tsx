"use client";
import Navbar from "@/components/Navbar";
import React from "react";
import Image from "next/image";

const page = () => {
  interface Video {
    thumbnail: string;
    url: string;
  }
  const YcList: Video[] = [
    {
      thumbnail: "/imgs/thumbnails/1.avif",
      url: "https://www.youtube.com/watch?v=jVJ9ovLxrKM&list=PLQ-uHSnFig5PjfCy7mE77XMGhgky9HV3o&index=1",
    },
    {
      thumbnail: "/imgs/thumbnails/2.avif",
      url: "https://www.youtube.com/watch?v=DOtCl5PU8F0&list=PLQ-uHSnFig5PjfCy7mE77XMGhgky9HV3o&index=2",
    },
    {
      thumbnail: "/imgs/thumbnails/3.avif",
      url: "https://www.youtube.com/watch?v=1hHMwLxN6EM&list=PLQ-uHSnFig5PjfCy7mE77XMGhgky9HV3o&index=3",
    },
    {
      thumbnail: "/imgs/thumbnails/4.avif",
      url: "https://www.youtube.com/watch?v=MT4Ig2uqjTc&list=PLQ-uHSnFig5PjfCy7mE77XMGhgky9HV3o&index=4",
    },
    {
      thumbnail: "/imgs/thumbnails/5.avif",
      url: "https://www.youtube.com/watch?v=3xU050kMbHM&list=PLQ-uHSnFig5PjfCy7mE77XMGhgky9HV3o&index=5",
    },
    {
      thumbnail: "/imgs/thumbnails/6.avif",
      url: "https://www.youtube.com/watch?v=jwXlo9gy_k4&list=PLQ-uHSnFig5PjfCy7mE77XMGhgky9HV3o&index=6",
    },
    {
      thumbnail: "/imgs/thumbnails/7.avif",
      url: "https://www.youtube.com/watch?v=lL6GdUHIBsM&list=PLQ-uHSnFig5PjfCy7mE77XMGhgky9HV3o&index=7",
    },
    {
      thumbnail: "/imgs/thumbnails/8.avif",
      url: "https://www.youtube.com/watch?v=6lY9CYIY4pQ&list=PLQ-uHSnFig5PjfCy7mE77XMGhgky9HV3o&index=8",
    },
    {
      thumbnail: "/imgs/thumbnails/9.avif",
      url: "https://www.youtube.com/watch?v=PGqX9fpweyc&list=PLQ-uHSnFig5PjfCy7mE77XMGhgky9HV3o&index=9",
    },
    {
      thumbnail: "/imgs/thumbnails/10.avif",
      url: "https://www.youtube.com/watch?v=C1DlZWfI6rk&list=PLQ-uHSnFig5PjfCy7mE77XMGhgky9HV3o&index=10",
    },
    {
      thumbnail: "/imgs/thumbnails/11.avif",
      url: "https://www.youtube.com/watch?v=LBC16jhiwak&list=PLQ-uHSnFig5PjfCy7mE77XMGhgky9HV3o&index=11",
    },
    {
      thumbnail: "/imgs/thumbnails/12.avif",
      url: "https://www.youtube.com/watch?v=9qWZALyGSmg&list=PLQ-uHSnFig5PjfCy7mE77XMGhgky9HV3o&index=12",
    },
    {
      thumbnail: "/imgs/thumbnails/13.avif",
      url: "https://www.youtube.com/watch?v=30a5yFBd7Fo&list=PLQ-uHSnFig5PjfCy7mE77XMGhgky9HV3o&index=13",
    },
    {
      thumbnail: "/imgs/thumbnails/14.avif",
      url: "https://www.youtube.com/watch?v=XcCmMOWuAF4&list=PLQ-uHSnFig5PjfCy7mE77XMGhgky9HV3o&index=14",
    },
    {
      thumbnail: "/imgs/thumbnails/15.avif",
      url: "https://www.youtube.com/watch?v=8pNxKX1SUGE&list=PLQ-uHSnFig5PjfCy7mE77XMGhgky9HV3o&index=15",
    },
    {
      thumbnail: "/imgs/thumbnails/16.avif",
      url: "https://www.youtube.com/watch?v=17XZGUX_9iM&list=PLQ-uHSnFig5PjfCy7mE77XMGhgky9HV3o&index=16",
    },
    {
      thumbnail: "/imgs/thumbnails/17.avif",
      url: "https://www.youtube.com/watch?v=qnNHW6TYv5I&list=PLQ-uHSnFig5PjfCy7mE77XMGhgky9HV3o&index=17",
    },
    {
      thumbnail: "/imgs/thumbnails/18.avif",
      url: "https://www.youtube.com/watch?v=s8ER6DIlAvY&list=PLQ-uHSnFig5PjfCy7mE77XMGhgky9HV3o&index=18",
    },
  ];
  const YCard: React.FC<Video> = ({ thumbnail, url }) => {
    return (
      <div className="w-full h-full">
        <div className="w-full h-full bg-[#ffcc00] rotate-6 flex items-center justify-center">
          <div className="-rotate-6 flex items-center justify-center">
            <a
              target="_blank"
              rel="noopener noreferrer"
              className="border-2 border-black rounded-lg"
              href={url}
            >
              <Image
                src={thumbnail}
                alt="YC Video Thumbnail"
                width={300}
                height={200}
                className="rounded-md"
              />
            </a>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div
      style={{
        backgroundImage: "url('/imgs/dot1.avif')",
        backgroundSize: "40%",
      }}
      className=" bg-contain w-full min-h-screen overflow-hidden"
    >
      <div className="w-full flex items-center justify-center">
        <Navbar />
      </div>
      <div className="w-full text-3xl flex items-center justify-center my-12 font-semibold">
        <h1 className="text-center">
          Master the Art of <span className="text-[#ffcc00]">Building</span>{" "}
          Startups—Learn from{" "}
          <span className="text-[#ffcc00]">Y Combinator</span> Best!
        </h1>
      </div>
      <div className="grid w-full md:grid-cols-3 gap-16 px-4 pb-8 mt-20">
        {YcList.map((video, index) => (
          <YCard key={index} {...video} />
        ))}
      </div>
    </div>
  );
};

export default page;
