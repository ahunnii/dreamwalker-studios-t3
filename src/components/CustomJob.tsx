const CustomJob = () => {
  const goToQuote = () => console.log("/quote");
  return (
    <div className=" py-30 mx-auto flex h-96 flex-col justify-center rounded-md bg-zinc-900 px-5 text-center text-white">
      <h2 className="mx-auto text-4xl font-bold">
        Looking for something different? We do custom print jobs!
      </h2>
      <button
        className="text-blue mx-auto mt-5 w-fit rounded-lg bg-blue-700 p-4 font-medium hover:bg-blue-800"
        onClick={goToQuote}
      >
        Request a quote
      </button>
    </div>
  );
};

export default CustomJob;
