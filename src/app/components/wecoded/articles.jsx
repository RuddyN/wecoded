"use client";
import React, { useState, useEffect } from "react";
import "./wecoded.css";
import Image from "next/image";
import Link from "next/link";
import {
  SortDesc,
  SortAsc,
  ChevronLeft,
  ChevronRight,
  Loader2,
} from "lucide-react";

export default function Articles() {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [numberOfArticles, setNumberOfArticles] = useState(10);

  const fetchArticles = async (pageNumber = numberOfArticles) => {
    try {
      setIsLoading(true);
      const articles = await fetch(
        `https://dev.to/api/articles?tag=wecoded&per_page=${pageNumber}`,
        {
          method: "GET",
        }
      );

      const data = await articles.json();

      setArticles(data);

      if (data) {
        setIsLoading(false);
      }
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const bgColor = () => {
    const colors = [
      "bg-pink-500",
      "bg-cyan-500",
      "bg-indigo-500",
      "bg-green-500",
    ];
    const randValue = Math.floor(Math.random() * 3) + 0;

    return colors[randValue];
  };

  const sortArticlesDesc = () => {
    setIsLoading(true);
    let articlesCopy = [...articles];
    const sortedArticles = articlesCopy.sort((a, b) => {
      const dateA = new Date(a.published_at);
      const dateB = new Date(b.published_at);

      return dateB - dateA;
    });

    setArticles(sortedArticles);
    setIsLoading(false);
  };

  const sortArticlesAsc = () => {
    setIsLoading(true);
    let articlesCopy = [...articles];
    const sortedArticles = articlesCopy.sort((a, b) => {
      const dateA = new Date(a.published_at);
      const dateB = new Date(b.published_at);

      return dateA - dateB;
    });

    setArticles(sortedArticles);
    setIsLoading(false);
  };

  const moreArticles = () => {
    const numberOfItems = numberOfArticles + 10;
    setNumberOfArticles(numberOfItems);
    fetchArticles(numberOfItems);
  };

  const lessArticles = () => {
    const numberOfItems = numberOfArticles - 10;
    setNumberOfArticles(numberOfItems);
    fetchArticles(numberOfItems);
  };

  return (
    <>
      <section className="px-4 pt-16 xl:px-36">
        <section className="flex flex-wrap gap-4 justify-center flex-col items-center text-center">
          <h3 className="text-4xl mb-6 font-bold">
            Beyond the Binary: Voices of Tech&apos;s Diverse Landscape
          </h3>
          <p className="md:w-1/2 text-gray-500 mb-8">
            Explore the rich and varied landscape of tech careers and skills
            through the personal stories of individuals from diverse backgrounds
          </p>

          <div className="flex gap-4 w-full">
            <button
              onClick={sortArticlesDesc}
              className="flex hover:text-indigo-500"
            >
              <SortDesc />
              <span>Newer first</span>
            </button>

            <button
              onClick={sortArticlesAsc}
              className="flex hover:text-indigo-500"
            >
              <SortAsc />
              <span>Older first</span>
            </button>
          </div>

          {isLoading ? (
            <div className="h-96 flex items-center">
              <Loader2 size={64} strokeWidth={1} className="animate-spin" />
            </div>
          ) : (
            <div className="flex flex-wrap justify-center xl:justify-start gap-6 ">
              {articles.map((article) => {
                return (
                  <Link
                    href={article.canonical_url}
                    className="block "
                    key={article.id}
                  >
                    <article className="cursor-pointer hover:shadow-xl transition-shadow md:w-96 h-full p-4 border rounded-md shadow-md flex flex-col justify-between">
                      <div className="p-0 w-full">
                        <div className="relative aspect-video w-full">
                          {article.cover_image ? (
                            <Image
                              src={article.cover_image}
                              alt={article.title}
                              layout="fill"
                              objectFit="cover"
                              className="rounded-md"
                            />
                          ) : (
                            <div
                              className={`text-center h-full rounded-md flex justify-center items-center text-white text-2xl ${bgColor()}`}
                            >
                              #wecoded
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="mt-6">
                        <p className="text-xl mb-6 font-bold article-title">
                          {article.title}
                        </p>
                        <p>{article.description}</p>
                      </div>
                      <div className="flex justify-between border-t mt-2 pt-2 border-indigo-100">
                        <p>{article.user.name}</p>
                        <p>{article.reading_time_minutes} min read</p>
                        <p className="flex">
                          😍
                          <span className="ml-2">
                            {article.positive_reactions_count}
                          </span>
                        </p>
                      </div>
                    </article>
                  </Link>
                );
              })}
            </div>
          )}

          <div className="flex justify-center gap-4 w-full">
            {numberOfArticles === 10 ? null : (
              <button
                onClick={lessArticles}
                className="hover:text-indigo-500"
                aria-label="Get less articles"
              >
                <ChevronLeft />
              </button>
            )}
            <p>{numberOfArticles} - 100</p>
            {numberOfArticles === 100 ? null : (
              <button
                onClick={moreArticles}
                className="hover:text-indigo-500"
                aria-label="Add more articles"
              >
                <ChevronRight />
              </button>
            )}
          </div>
        </section>
      </section>
    </>
  );
}
