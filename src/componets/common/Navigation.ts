
"use client";

import { useRouter } from "next/navigation";



let router: ReturnType<typeof useRouter> | null = null;

export const setNavigationRef = (nextRouter: ReturnType<typeof useRouter>) => {
  router = nextRouter;
};

export const navigateTo = (path: string) => {
    console.log(router)
  if (router) {
    
    router.push(path);
  } else {
    console.error("Router is not initialized yet!");
  }
};