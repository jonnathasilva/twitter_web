export const NotFound = () => (
  <div className="h-full flex justify-center items-center m-4 space-x-10">
    <div className="hidden md:flex-1 md:flex md:justify-center ">
      <img src="./imgs/logo.svg" alt="logo" className="w-96" />
    </div>

    <div className="w-2/3 md:flex-1 flex justify-center items-start flex-col space-y-5">
      <h1 className="text-9xl">404</h1>

      <p className="md:w-3/4">
        A página que você está procurando não existe. Como você chegou aqui é um
        mistério. Mas você pode clicar no botão abaixo para voltar à página
        inicial.
      </p>

      <a href="/" className="bg-birdblue p-4 rounded-full text-lg font-bold">
        Página inicial
      </a>
    </div>
  </div>
);
