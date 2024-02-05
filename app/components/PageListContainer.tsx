import { ReactNode } from "react";

const PageListContainer = ({ children }: { children: ReactNode }) => {
  return (
    <section className={"my-4 grid md:grid-cols-2 lg:grid-cols-4 gap-6"}>
      {children}
    </section>
  );
};

export default PageListContainer;
