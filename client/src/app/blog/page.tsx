"use client";
import Header from "@/components/HomeHeader";
import Footer from "@/components/HomeFooter";
import React, { useState } from "react";

// Define the type for the post
interface Post {
  title: string;
  description: string;
  fullDescription: string;
}

export default function Page() {
  const [activePost, setActivePost] = useState<Post | null>(null);

  const posts: Post[] = [
    {
      title: "How to Choose the Right Room for Your Needs",
      description:
        "Finding the perfect room for your needs is crucial. This guide covers the key factors to consider when making a decision.",
      fullDescription:
        "When choosing a room, consider the size, location, cost, amenities, and whether it's suitable for your lifestyle. This guide will help you determine what to look for and how to make the best choice for your needs. It’s important to visit the place in person, check for hidden costs like utilities, and understand the overall environment before making a commitment. Here are some tips on what to prioritize and avoid when choosing a room...",
    },
    {
      title: "Top 10 Co-living Spaces in [City]",
      description:
        "Explore the top co-living spaces in [City], with reviews, pros, cons, and prices to help you make an informed decision.",
      fullDescription:
        "Discover the best co-living spaces in your city, from budget-friendly options to luxurious accommodations. Learn about the pros, cons, and prices of each, helping you make a well-informed choice for your stay. In this guide, we’ll break down each space based on amenities, location, cost, and overall living experience, so you can decide which one fits your lifestyle best. Whether you're looking for a social community or a quiet, private space, we have something for everyone.",
    },
    {
      title: "Understanding Roommate Agreements: A Beginner's Guide",
      description:
        "A roommate agreement is crucial for smooth co-living. This beginner’s guide explains everything you need to know.",
      fullDescription:
        "A roommate agreement is essential for creating a harmonious living situation. It sets clear expectations on rent, chores, shared spaces, and house rules. Learn how to create a roommate agreement that works for everyone. This guide includes a detailed breakdown of what should be included in the agreement, tips on how to address potential conflicts, and how to ensure fairness in shared expenses. Setting up a roommate agreement from the start can prevent misunderstandings and disputes down the line.",
    },
    {
      title: "What to Look for in a PG (Paying Guest) Accommodation",
      description:
        "PG accommodations can be an affordable and convenient option for living. Here’s what you should look for to ensure your stay is comfortable and safe.",
      fullDescription:
        "When looking for a PG (Paying Guest) accommodation, several factors play a role in ensuring a comfortable and safe stay. From security, food quality, and room size to the behavior of other residents and proximity to your workplace or university, this guide helps you make an informed decision. A PG can be a great way to save money while still having access to amenities like Wi-Fi, laundry, and meals. Make sure to inspect the place in person, verify the terms of stay, and understand the house rules before moving in.",
    },
    {
      title: "Top 5 Ways to Save Money in Co-living Spaces",
      description:
        "Living in a co-living space offers many benefits, but it’s essential to manage your finances. Here are the best ways to save money while enjoying the co-living experience.",
      fullDescription:
        "Co-living spaces provide great opportunities for social interaction and affordability, but managing your budget is key to making the most of your experience. Start by sharing services like Wi-Fi, utilities, and cleaning with your housemates. Look for spaces that offer all-inclusive rent, which can help you avoid hidden costs. Cook meals together to save on dining out and set clear agreements with your roommates to split responsibilities and expenses fairly. Finally, don't forget to budget for social activities and personal needs, so you're not caught off guard by unexpected expenses.",
    }, {
        title: "Understanding Roommate Agreements: A Beginner's Guide",
        description:
          "A roommate agreement is crucial for smooth co-living. This beginner’s guide explains everything you need to know.",
        fullDescription:
          "A roommate agreement is essential for creating a harmonious living situation. It sets clear expectations on rent, chores, shared spaces, and house rules. Learn how to create a roommate agreement that works for everyone. This guide includes a detailed breakdown of what should be included in the agreement, tips on how to address potential conflicts, and how to ensure fairness in shared expenses. Setting up a roommate agreement from the start can prevent misunderstandings and disputes down the line.",
      },
  ];

  // Correct the type of the argument here
  const handleReadMore = (post: Post) => {
    setActivePost(post);
  };

  const closeModal = () => {
    setActivePost(null);
  };

  return (
    <div>
      <Header/>
      <section className="bg-gray-800 text-white py-20 px-6 sm:px-10 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-12 text-transparent bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text">
            Blog / Resource Center
          </h1>
          <p className="text-xl text-center mb-8 text-gray-400">
            Discover helpful tips, articles, and guides to make the most of your
            co-living or PG accommodation experience.
          </p>
        </div>
      </section>

      <section className="py-16 px-6 sm:px-10 lg:px-20 bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-transparent bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text mb-10">
            Latest Articles
          </h2>
          <div className="grid lg:grid-cols-3 sm:grid-cols-1 gap-12">
            {posts.map((post, index) => (
              <div key={index} className="bg-gray-800 p-6 rounded-lg shadow-lg space-y-4">
                <h3 className="text-2xl font-semibold text-white">{post.title}</h3>
                <p className="text-gray-400">{post.description}</p>
                <button
                  onClick={() => handleReadMore(post)}
                  className="text-cyan-500 hover:text-cyan-600 font-semibold"
                >
                  Read More →
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modal for reading full description */}
      {activePost && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-gray-800 text-white p-6 rounded-lg max-w-2xl w-full">
            <h3 className="text-2xl font-semibold">{activePost.title}</h3>
            <div className="max-h-96 overflow-y-auto mt-4">
              <p className="text-gray-400">{activePost.fullDescription}</p>
            </div>
            <button
              onClick={closeModal}
              className="mt-6 text-cyan-500 hover:text-cyan-600 font-semibold"
            >
              Close
            </button>
          </div>
        </div>
      )}

      <section className="bg-gray-800 text-white py-16 px-6 sm:px-10 lg:px-20">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6 text-transparent bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text">
            Get More Tips & Personalized Suggestions!
          </h2>
          <p className="text-xl text-gray-400 mb-8">
            Stay up-to-date with the latest tips, guides, and resources on
            co-living and PG accommodation. Sign up for our newsletter!
          </p>

          <form className="w-full sm:w-96 mx-auto">
            <input
              type="email"
              placeholder="Enter your email address"
              className="w-full p-3 rounded-md bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 mb-4"
              required
            />
            <button
              
              type="submit"
              className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-3 rounded-md transition duration-300"
            >
              Sign Up
            </button>
          </form>
        </div>
      </section>
      <Footer/>
    </div>
  );
}
