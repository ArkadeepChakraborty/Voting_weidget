import React, { useEffect, useState } from "react";

const WestBengalNews = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    const RSS_URL = "https://newseisamay.com/rss/latest.xml";

    useEffect(() => {
        const fetchRSS = async () => {
            try {
                const res = await fetch(
                    `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(
                        RSS_URL
                    )}&count=10`
                );

                const data = await res.json();

                const filtered = data.items
                    .filter((item) => {
                        const categories = item.categories
                            .flatMap((cat) => cat.split(","))
                            .map((cat) => cat.trim().toLowerCase());

                        return (
                            categories.includes("india") ||
                            categories.includes("national trend") ||
                            categories.includes("west bengal") ||
                            categories.includes("kolkata")
                        );
                    })
                    .slice(0, 6) // 2 per row → better to keep even number
                    .map((item) => ({
                        title: item.title,
                        link: item.link,
                        author: item.author || "News Ei Samay",
                        image: item.thumbnail || item.enclosure?.link || "",
                    }));

                setPosts(filtered);
            } catch (error) {
                console.error("Error fetching RSS:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchRSS();
    }, []);

    if (loading) {
        return <p className="text-left px-4">Loading news...</p>;
    }

    return (
        <div className="w-full max-w-7xl mx-auto px-4 md:px-6 lg:px-10 -mt-1 md:-mt-4 lg:-mt-1 mb-2">

            <h2 className="text-xl md:text-2xl font-bold mb-4 text-center">
                Related News
            </h2>

            {/* GRID LAYOUT */}
            <div className="flex flex-col gap-4">
                {posts.map((post, index) => (
                    <div
                        key={index}
                        className="flex items-center gap-3 md:gap-4 bg-white rounded-xl shadow hover:shadow-md transition p-2 md:p-3"
                    >

                        {/* Image */}
                        <img
                            src={post.image}
                            alt="news"
                            className="w-24 h-16 md:w-36 md:h-24 lg:w-44 lg:h-28 object-cover rounded-md"
                        />

                        {/* Content */}
                        <div className="flex-1 text-left">

                            <a
                                href={post.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="no-underline text-black"
                            >
                                <h4 className="text-xs sm:text-sm md:text-base font-semibold leading-snug">
                                    {post.title}
                                </h4>
                            </a>

                            <p className="text-yellow-600 text-[11px] sm:text-xs md:text-sm font-bold mt-1">
                                {post.author}
                            </p>

                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default WestBengalNews;