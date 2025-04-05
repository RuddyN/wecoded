"use client";
import React, { useState } from "react";
import "./wecoded.css";
import Image from "next/image";
import data from "./data.json";

import { RefreshCwIcon, X, Info } from "lucide-react";

export default function Game() {
  const [showBubble, setShowBubble] = useState(false);
  const [bubblePosition, setBubblePosition] = useState({ x: 0, y: 0 });
  const [bubbleText, setBubbleText] = useState("");

  const logos = data.logos;

  let draggedItem = null;

  const dragStart = (event) => {
    draggedItem = event.target;
    event.dataTransfer.effectAllowed = "move";
    event.dataTransfer.setData("text/plain", draggedItem.id);
  };

  const dragEnd = () => {
    draggedItem = null;
  };

  const dragOver = (event) => {
    event.preventDefault();
    event.target.classList.add("active");
  };

  const dragLeave = (event) => {
    event.target.classList.remove("active");
  };

  const dropItem = (event) => {
    event.preventDefault();
    const dropZone = event.target;

    const id = event.dataTransfer.getData("text/plain");
    let zoneId = event.target?.id;
    zoneId = zoneId.split(":")[1];

    if (id === zoneId) {
      const draggedElement = document.getElementById(id);
      event.target.parentNode.replaceChild(draggedElement, event.target);
      event.target.classList.remove("active");
      const dropZoneRect = dropZone.getBoundingClientRect();
      const x = event.clientX - dropZoneRect.left + 20;
      const y = event.clientY - dropZoneRect.top;

      const factPerId = data.facts[id];
      const randValue = Math.floor(Math.random() * 3) + 1;

      setBubblePosition({ x, y });
      setShowBubble(true);
      setBubbleText(factPerId[randValue]);
    }
  };

  const refreshGame = () => {
    window.location.reload();
  };

  const closeBubble = () => {
    setShowBubble(false);
  };

  return (
    <>
      <section className="game-board-image">
        <h2 className="text-4xl text-white ">#WeCoded</h2>
        <p className="text-sm text-white text-center">
          Go to desktop to play the drag and drop game
        </p>
        <Image
          src="/assets/game-board.png"
          alt="Testing Library"
          width="200"
          height="100"
        />
      </section>
      <section className="game-board">
        <h2 className="text-4xl text-white">#WeCoded drag and drop game</h2>
        <p className="text-xl text-white">
          Match the logos and reveal a fun fact
          <span className="flex text-xs gap-2 justify-center items-center text-yellow-500">
            <Info width={16} />
            Requires mouse/trackpad
          </span>
        </p>

        <div className="border-2 rounded border-black flex flex-col bg-white w-3/5 py-8 justify-center items-center gap-6">
          <button
            onClick={refreshGame}
            className="text-black flex gap-2 text-indigo-500 hover:text-indigo-900"
          >
            <RefreshCwIcon />
            <span>Refresh</span>
          </button>

          <div className="flex gap-16">
            <div className="flex gap-2 justify-center flex-col w-12">
              {logos.map((logo) => {
                return (
                  <Image
                    src={logo["image-url"]}
                    alt={logo.alt}
                    tabIndex="0"
                    width="50"
                    height="50"
                    onDragStart={dragStart}
                    onDragEnd={dragEnd}
                    draggable="true"
                    id={logo.name}
                    key={logo.name}
                  />
                );
              })}
            </div>

            <div id="drop-zones">
              {showBubble ? (
                <div
                  className="speech-bubble text-indigo-900"
                  style={{ left: bubblePosition.x, top: bubblePosition.y }}
                  onBlur={closeBubble}
                >
                  <div className="flex justify-between border-b mb-2 pb-2">
                    <p className="text-l font-extrabold"> Fun fact</p>
                    <button onClick={closeBubble} className="close-btn">
                      <X />
                    </button>
                  </div>
                  <p>{bubbleText}</p>
                </div>
              ) : null}
              <div className="flex flex-col">
                <div className="flex border-indigo-500">
                  {/* TOP */}
                  <div className="border-r border-indigo-200 w-24 h-24 flex justify-center items-center">
                    <Image
                      src="/assets/test-library-gray-v2.png"
                      alt="Testing Library"
                      width="50"
                      height="50"
                      onDragOver={dragOver}
                      onDragLeave={dragLeave}
                      onDrop={dropItem}
                      tabIndex="0"
                      id="Z:testing-library"
                      className="opacity-25"
                    />
                  </div>
                  <div className="border-r border-indigo-200 w-24 h-24 flex justify-center items-center"></div>
                  <div className="w-24 h-24 flex justify-center items-center">
                    <Image
                      src="/assets/react-gray.png"
                      alt="React gray color"
                      width="50"
                      height="50"
                      tabIndex="0"
                      onDragOver={dragOver}
                      onDragLeave={dragLeave}
                      onDrop={dropItem}
                      id="Z:react"
                    />
                  </div>
                </div>
                <div className="flex ">
                  {/* middle */}
                  <div className="border-r border-indigo-200 border-t border-b w-24 h-24 flex justify-center items-center"></div>
                  <div className="border-r border-indigo-200 border-t border-b w-24 h-24 flex justify-center items-center">
                    <Image
                      src="/assets/javascript-gray.png"
                      alt="React gray color"
                      width="50"
                      height="50"
                      tabIndex="0"
                      onDragOver={dragOver}
                      onDragLeave={dragLeave}
                      onDrop={dropItem}
                      id="Z:javascript"
                      className="opacity-25"
                    />
                  </div>
                  <div className="w-24 border-t border-indigo-200 border-b h-24 flex justify-center items-center"></div>
                </div>
                <div className="flex ">
                  {/* BOTTOM */}
                  <div className="border-r border-indigo-200 w-24 h-24 flex justify-center items-center">
                    <Image
                      src="/assets/html-gray.png"
                      alt="HTML gray color"
                      width="50"
                      height="50"
                      tabIndex="0"
                      onDragOver={dragOver}
                      onDragLeave={dragLeave}
                      onDrop={dropItem}
                      id="Z:html"
                      className="opacity-25"
                    />
                  </div>
                  <div className="border-r border-indigo-200 w-24 h-24 flex justify-center items-center"></div>
                  <div className="w-24 h-24 flex justify-center items-center">
                    <Image
                      src="/assets/devto-black.png"
                      alt="Dev.to gray color"
                      width="50"
                      height="50"
                      tabIndex="0"
                      onDragOver={dragOver}
                      onDragLeave={dragLeave}
                      onDrop={dropItem}
                      id="Z:dev-to"
                      className="opacity-25"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
