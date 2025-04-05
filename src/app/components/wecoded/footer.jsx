"use client";
import React from "react";
import Image from "next/image";

export default function Footer() {
  return (
    <>
      <footer className="bg-indigo-500 mt-12 p-8 text-white flex flex-col md:flex-row justify-evenly items-center gap-8">
        <div className="md:w-96 ">
          <Image
            src="/assets/wecoded-logo.png"
            alt="Wecoded logo"
            width="150"
            height="50"
          />
          <p className="text-sm mt-4">
            Celebrating diversity in tech isn&apos;t just a feel-good initiative;
            it&apos;s a strategic imperative. A workforce that reflects the world&apos;s
            rich tapestry of backgrounds, experiences, and perspectives fuels
            innovation, fosters creativity, and enhances problem-solving
          </p>
        </div>
        <div className="flex flex-col justify-evenly flex-2 mt-6">
          <div>
            <h3 className="text-l font-black dark:text-white mb-2 ">
              Reach out to me on:
            </h3>
            <p className="text-sm mb-2">
              This landing page was created for the WeCoded 2025 Challenge by:
              Ruddy Marriday
            </p>
            <div className="flex gap-4 mb-4">
              <a href="https://www.instagram.com/ruddycodes/">
                <Image
                  src="/assets/white-instagram.png"
                  alt="instagram"
                  width="16"
                  height="16"
                />
              </a>
              <a href="mailto:ruddynriba@gmail.com">
                <Image
                  src="/assets/white-letter.png"
                  alt="email"
                  width="16"
                  height="16"
                />
              </a>
            </div>
          </div>
          <div className="flex flex-col gap-2 text-xs ">
            <div className="flex gap-2">
              <span>Site made possible by: </span>
              <a href="https://nextjs.org/" className="underline">
                Next.js,
              </a>
              <a href="https://www.netlify.com/" className="underline">
                Netlify,
              </a>
              <a href="https://tailwindcss.com/docs/" className="underline">
                tailwind,
              </a>
              <a href="https://lucide.dev/icons/" className="underline">
                lucid icons
              </a>
            </div>
            <p>© 2022 Ruddy. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
  );
}
