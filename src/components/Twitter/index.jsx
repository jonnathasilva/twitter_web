import { HeartIcon } from "@heroicons/react/24/outline";

export const Twitter = ({ name, username, avatar, children }) => {
  return (
    <div className="flex items-center space-x-3 p-4 border-b border-silver">
      <div className="">
        <img src={`./imgs/${avatar}`} alt="avatar" />
      </div>

      <div className="space-y-1 w-full  break-all">
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
};
