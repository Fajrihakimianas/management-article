import ArticleCard from "@/components/articles/ArticleCard";
import Image from "next/image";
import React from "react";

export default function DetailArticle() {
  return (
    <>
      <div className="flex justify-between border-b items-center px-10 py-6 w-full">
        <h1 className="text-xl font-semibold text-slate-900">Article Title</h1>
        <span className="text-sm font-light text-slate-600">
          April 13, 2025
        </span>
      </div>

      <div className="md:px-[160px] md:py-[40px] flex flex-col justify-center items-center">
        <div className="text-center mb-8">
          <p className="text-base md:text-base font-normal text-slate-600 mb-2">
            February 4, 2025 Created by Admin
          </p>

          <h2 className="text-2xl md:text-3xl max-w-2xl font-semibold text-slate-900">
            Figma`s New Dev Mode: A Game-Changer for Designers & Developers
          </h2>
        </div>

        <div className="relative w-full">
          <Image
            src="/images/img-detail.png"
            alt="Article Image"
            width={800}
            height={500}
            className="w-full h-[580px]"
          />

          <div className="my-8">
            <p className="text-gray-600 mb-4 leading-relaxed">
              In the ever-evolving world of digital product design,
              collaboration between designers and developers has always been a
              crucial—yet often challenging—part of the process. In April 2025,
              Figma introduced Dev Mode, a powerful new feature aimed at
              streamlining that collaboration more than ever before.
            </p>
          </div>

          {/* What Is Dev Mode Section */}
          <div className="mb-8">
            <div className="flex items-center mb-4">
              <span className="text-2xl mr-3">🔧</span>
              <h2 className="text-xl font-semibold text-gray-800">
                What Is Dev Mode?
              </h2>
            </div>
            <p className="text-gray-600 leading-relaxed">
              Dev Mode is a new interface within Figma that provides
              developer-focused tools and removes unnecessary UI clutter that
              designers typically use. Instead, developers can view
              ready-to-implement specs, such as spacing, color values, font
              styles, and asset exports—without disrupting the design file or
              asking the design team for clarifications.
            </p>
          </div>

          {/* Bridging the Gap Section */}
          <div className="mb-8">
            <div className="flex items-center mb-4">
              <span className="text-2xl mr-3">🤝</span>
              <h2 className="text-xl font-semibold text-gray-800">
                Bridging the Gap Between Design & Development
              </h2>
            </div>
            <p className="text-gray-600 leading-relaxed mb-4">
              Traditionally, handing off designs involved back-and-forth
              communication, misunderstandings, and occasional delays. With Dev
              Mode, handoff becomes real-time and seamless:
            </p>
            <ul className="space-y-3 ml-6">
              <li className="flex items-start">
                <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                <span className="text-gray-600">
                  <strong>Live Design Specs:</strong> Developers can inspect the
                  design without needing additional tools or extensions.
                </span>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                <span className="text-gray-600">
                  <strong>Code Snippets:</strong> Automatically generated CSS,
                  iOS (Swift), and Android (XML) code help speed up
                  implementation.
                </span>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                <span className="text-gray-600">
                  <strong>Version History Access:</strong> Stay aligned with
                  design updates without asking for a new export every time.
                </span>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                <span className="text-gray-600">
                  <strong>Integrated Comments:</strong> Developers can leave
                  feedback directly in the design file.
                </span>
              </li>
            </ul>
          </div>

          {/* Why It Matters Section */}
          <div className="mb-8">
            <div className="flex items-center mb-4">
              <span className="text-2xl mr-3">🎯</span>
              <h2 className="text-xl font-semibold text-gray-800">
                Why It Matters
              </h2>
            </div>
            <p className="text-gray-600 leading-relaxed">
              {`For design teams working in agile environments, the speed of
              handoff can make or break a sprint. Figma's Dev Mode turns a
              typically messy phase into a collaborative, real-time experience
              that reduces errors, shortens build times, and improves the
              designer-developer relationship.`}
            </p>
          </div>

          {/* Final Thoughts Section */}
          <div className="mb-8">
            <div className="flex items-center mb-4">
              <span className="text-2xl mr-3">💭</span>
              <h2 className="text-xl font-semibold text-gray-800">
                Final Thoughts
              </h2>
            </div>
            <p className="text-gray-600 leading-relaxed">
              {`Whether you're a solo designer working with freelance developers
              or part of a large product team, Figma's Dev Mode introduces a
              smoother, smarter way to collaborate. It's not just a feature—it's
              a shift in how digital products are built.`}
            </p>
          </div>

          {/* Comments Section */}

          <div className="flex items-center mb-10">
            <span className="text-2xl mr-3">💬</span>
            <p className="text-gray-600">
              What do you think of Dev Mode? Have you tried it yet? Share your
              experience in the comments!
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Other Articles
            </h2>
            <div className="grid md:grid-cols-3 gap-4">
              <ArticleCard />
              <ArticleCard />
              <ArticleCard />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
