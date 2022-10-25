import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { Input } from "~/components";

const validationSchema = yup.object({
  email: yup.string().required("Digite seu E-mail").email("E-mail inválido"),
  password: yup.string().required("Digite sua senha"),
});

export const Login = () => {
  const navigate = useNavigate();
  const formik = useFormik({
    onSubmit: async (values) => {
      const { data } = await axios({
        method: "get",
        auth: { username: values.email, password: values.password },
        baseURL: import.meta.env.VITE_URL,
        url: "/login",
      }).catch((err) => {
        toast.error(err.response.data.message);
      });

      localStorage.setItem("token", data.accessToken);
      navigate("/");
    },
    validationSchema,
    validateOnMount: true,
    initialValues: {
      email: "",
      password: "",
    },
  });

  return (
    <div className="h-full flex justify-center">
      <div className="hidden lg:bg-birdblue lg:flex lg:justify-center lg:items-center lg:flex-1">
        <img src="./imgs/logo.svg" alt="logo" className="w-96" />
      </div>
      <div className="flex flex-1  justify-center items-center p-12 space-y-6">
        <div className="max-w-md flex-1">
          <h1 className="text-3xl">Acesse sua conta</h1>

          <form onSubmit={formik.handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Input
                type="email"
                name="email"
                placeholder="E-mail"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                disabled={formik.isSubmitting}
              />
              {formik.touched.email && formik.errors.email && (
                <div className="text-red-500 text-sm">
                  {formik.errors.email}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Input
                type="password"
                name="password"
                placeholder="Senha"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                disabled={formik.isSubmitting}
              />
              {formik.touched.password && formik.errors.password && (
                <div className="text-red-500 text-sm">
                  {formik.errors.password}
                </div>
              )}
            </div>

            <button
              type="submit"
              className="bg-birdblue py-4 rounded-full disabled:opacity-50 w-full text-lg"
              disabled={formik.isSubmitting || !formik.isValid}
            >
              {formik.isSubmitting ? "Enviando..." : "Entrar"}
            </button>
          </form>

          <span className="text-sm text-silver text-center">
            Não tem uma conta?{" "}
            <Link to="/signup" className="text-birdblue">
              Inscreva-se
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};
