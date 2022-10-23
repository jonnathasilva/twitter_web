import { useState, useEffect } from "react";
import axios from "axios";

import { TwitterForm, Twitter } from "~/components";

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
