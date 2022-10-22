const CustomJob = () => {
  const goToQuote = () => console.log("/quote");
  return (
    <div className=" mx-auto my-20 flex h-80 flex-col justify-center rounded-md bg-slate-400 px-5 text-center">
      <h2 className="mx-auto text-4xl font-bold">
        Looking for something different? We do custom print jobs!
      </h2>
      <button
        className="mx-auto mt-5 w-fit rounded-lg bg-slate-900 p-4 font-medium text-white hover:bg-slate-800"
        onClick={goToQuote}
      >
        Request a quote
      </button>
    </div>
  );
};

export default CustomJob;
