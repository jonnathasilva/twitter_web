import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Input = (props) => (
  <input
    {...props}
    className="w-full bg-transparent p-4 border rounded-xl border-onix text-lg outline-none focus:border-platinum"
  />
);

const validationSchema = yup.object({
  name: yup.string().required("Digite seu nome"),
  username: yup.string().required("Digite nome de usuário"),
  email: yup.string().required("Digite seu E-mail").email("E-mail inválido"),
  password: yup.string().required("Digite sua senha"),
});

export const Signup = () => {
  const navigate = useNavigate();
  const formik = useFormik({
    onSubmit: async (values) => {
      const { data } = await axios({
        method: "post",
        data: {
          username: values.username,
          name: values.name,
          email: values.email,
          password: values.password,
        },
        baseURL: import.meta.env.VITE_URL,
        url: "/signup",
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
      username: "",
      name: "",
    },
  });

  return (
    <div className="h-full flex justify-center">
      <div className="hidden lg:bg-birdblue lg:flex lg:justify-center lg:items-center lg:flex-1">
        <img src="./imgs/logo.svg" alt="logo" className="w-96" />
      </div>

      <div className="flex flex-1  justify-center items-center p-12 space-y-6">
        <div className="max-w-md flex-1">
          <h1 className="text-3xl">Crie sua conta</h1>

          <form onSubmit={formik.handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Input
                type="text"
                name="name"
                placeholder="Nome"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                disabled={formik.isSubmitting}
              />
              {formik.touched.name && formik.errors.name && (
                <div className="text-red-500 text-sm">{formik.errors.name}</div>
              )}
            </div>

            <div className="space-y-2">
              <Input
                type="text"
                name="username"
                placeholder="Nome de Usuário"
                value={formik.values.username}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                disabled={formik.isSubmitting}
              />
              {formik.touched.username && formik.errors.username && (
                <div className="text-red-500 text-sm">
                  {formik.errors.username}
                </div>
              )}
            </div>

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
              {formik.isSubmitting ? "Enviando..." : "cadastrar"}
            </button>
          </form>

          <span className="text-sm text-silver text-center">
            Já tem uma conta?{" "}
            <Link to="/login" className="text-birdblue">
              Acesse
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};
