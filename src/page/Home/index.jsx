import { HeartIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

const TwitterForm = () => {
  const [text, setText] = useState("");
  const MAX_TWEET_CHAR = 140;

  return (
    <div className="border-b border-silver p-4 space-y-6">
      <div className="flex space-x-5">
        <img src="./imgs/avatar.png" alt="avatar" className="w-7" />
        <h1 className="font-bold text-xl">Página Inicial</h1>
      </div>

      <form className="pl-12 text-lg flex flex-col">
        <textarea
          name="text"
          value={text}
          placeholder="O que está acontecendo?"
          className="bg-transparent outline-none disabled:opacity-50"
          onChange={(e) => setText(e.target.value)}
        />

        <div className="flex justify-end items-center space-x-3">
          <span className="text-sm">
            <span>{text.length}</span> /{" "}
            <span className="text-birdblue">{MAX_TWEET_CHAR}</span>
          </span>
          <button
            className="bg-birdblue px-5 py-2 rounded-full disabled:opacity-50"
            disabled={text.length >= MAX_TWEET_CHAR}
          >
            Tweetar
          </button>
        </div>
      </form>
    </div>
  );
};

const Twitter = ({ name, username, avatar, children }) => (
  <div className="flex space-x-3 p-4 border-b border-silver">
    <div className="">
      <img src={`./imgs/${avatar}`} alt="avatar" />
    </div>

    <div className="space-y-1">
      <span className="font-bold text-sm">{name}</span>{" "}
      <span className="text-sm text-silver">@{username}</span>
      <p>{children}</p>
      <div className="flex space-x-2 text-sm items-center">
        <HeartIcon className="w-6 stroke-1 stroke-silver" />

        <span>2M</span>
      </div>
    </div>
  </div>
);

export const Home = () => {
  return (
    <>
      <TwitterForm />
      <div>
        <Twitter name="Elon Musk" username="elonmusk" avatar="avatar.png">
          Let’s make Twitter maximun fun!
        </Twitter>
      </div>
    </>
  );
};
