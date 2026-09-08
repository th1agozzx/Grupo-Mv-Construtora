import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

export const getRouter = () => {
  const queryClient = new QueryClient();

  const router = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    // Sem isto, a navegação por âncora não funciona: o navegador pula para a
    // seção e, em seguida, o `scrollRestoration` restaura a posição salva
    // (topo) — o usuário clica em "Localização", a URL muda para #localizacao e
    // a página não sai do lugar. Com a opção ligada, quem faz o scroll da
    // âncora é o próprio router, sem brigar com a restauração.
    // O respiro do header fixo vem do `scroll-margin-top` em styles.css.
    defaultHashScrollIntoView: { behavior: "smooth", block: "start" },
    defaultPreloadStaleTime: 0,
  });

  return router;
};
