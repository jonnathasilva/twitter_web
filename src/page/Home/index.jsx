import { HeartIcon } from "@heroicons/react/24/outline";
import { useState, useEffect } from "react";
import { useFormik } from "formik";
import axios from "axios";

const TwitterForm = ({ onSuccess }) => {
  const formik = useFormik({
    onSubmit: async (values, form) => {
      await axios({
        method: "post",
        baseURL: import.meta.env.VITE_URL,
        url: "/tweets",
        data: { text: values.text },
        headers: { authorization: `Bearer ${token}` },
      });

      form.setFieldValue("text", "");
      onSuccess();
    },
    initialValues: {
      text: "",
    },
  });

  const token = useState(localStorage.getItem("token"))[0];

  const MAX_TWEET_CHAR = 140;

  return (
    <div className="border-b border-silver p-4 space-y-6 ">
      <div className="flex space-x-5">
        <img src="./imgs/avatar.png" alt="avatar" className="w-7" />
        <h1 className="font-bold text-xl">Página Inicial</h1>
      </div>

      <form
        onSubmit={formik.handleSubmit}
        className="pl-12 text-lg flex flex-col"
      >
        <textarea
          name="text"
          value={formik.values.text}
          placeholder="O que está acontecendo?"
          className="bg-transparent outline-none disabled:opacity-50"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          disabled={formik.isSubmitting}
        />

        <div className="flex justify-end items-center space-x-3">
          <span className="text-sm">
            <span>{formik.values.text.length}</span> /{" "}
            <span className="text-birdblue">{MAX_TWEET_CHAR}</span>
          </span>
          <button
            type="submit"
            className="bg-birdblue px-5 py-2 rounded-full disabled:opacity-50"
            disabled={
              formik.values.text.length >= MAX_TWEET_CHAR || formik.isSubmitting
            }
          >
            Tweetar
          </button>
        </div>
      </form>
    </div>
  );
};

const Twitter = ({ name, username, avatar, children }) => {
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

export const Home = () => {
  const token = useState(localStorage.getItem("token"))[0];
  const [data, setData] = useState([]);

  async function getData() {
    const { data } = await axios({
      method: "get",
      baseURL: import.meta.env.VITE_URL,
      url: "/tweets",
      headers: { authorization: `Bearer ${token}` },
    });

    setData(data);
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <TwitterForm onSuccess={getData} />
      <div>
        {data.length > 0
          ? data.map((tweet) => (
              <Twitter
                key={tweet.id}
                name={tweet.user.name}
                username={tweet.user.username}
                avatar="avatar.png"
              >
                {tweet.text}
              </Twitter>
            ))
          : ""}
      </div>
    </>
  );
};
