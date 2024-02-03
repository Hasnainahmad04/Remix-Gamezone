const PageTitle = ({ title }: { title: string }) => {
  return (
    <h1 className={"text-[2rem] lg:text-[4rem] text-white font-bold"}>
      {title}
    </h1>
  );
};

export default PageTitle;
