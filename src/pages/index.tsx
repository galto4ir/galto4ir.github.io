import * as React from "react";

interface IProps {}

const REDIRECT_URL = "https://galto4ir.dev";
const REDIRECT_SECONDS = 5;

const IndexPage = (props: IProps) => {
  const [countdown, setCountdown] = React.useState(REDIRECT_SECONDS);

  React.useEffect(() => {
    if (countdown <= 0) {
      window.location.href = REDIRECT_URL;
      return;
    }

    const timer = setTimeout(() => {
      setCountdown(countdown - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [countdown]);

  const handleEnterWebsite = () => {
    window.location.href = REDIRECT_URL;
  };

  return (
    <main className="flex flex-col items-center justify-center h-screen w-screen gap-6">
      <h3 className="text-xl">
        <code>Galt-Ochir Davaa {"<d.galtochir@gmail.com>"}</code>
      </h3>

      <p className="text-base text-gray-600">
        Redirecting to <code>{REDIRECT_URL}</code> in{" "}
        <span className="font-semibold">{countdown}</span>{" "}
        {countdown === 1 ? "second" : "seconds"}...
      </p>

      <button
        onClick={handleEnterWebsite}
        className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
      >
        Enter Website
      </button>
    </main>
  );
};

export default IndexPage;
