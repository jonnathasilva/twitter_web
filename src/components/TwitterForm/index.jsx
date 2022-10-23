import { useFormik } from "formik";
import { toast } from "react-toastify";
import { useState } from "react";
import * as yup from "yup";
import axios from "axios";

const validationSchema = yup.object({
  text: yup.string().required("Digite um texto"),
});

export const TwitterForm = ({ onSuccess }) => {
  const formik = useFormik({
    onSubmit: async (values, form) => {
      await axios({
        method: "post",
        baseURL: import.meta.env.VITE_URL,
        url: "/tweets",
        data: { text: values.text },
        headers: { authorization: `Bearer ${token}` },
      }).catch((err) => {
        toast.error(err.response.data.message);
      });

      form.setFieldValue("text", "");
      onSuccess();
    },
    validationSchema,
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
