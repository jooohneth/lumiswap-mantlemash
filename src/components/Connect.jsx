import { Fragment } from "react";
import { useWeb3React } from "@web3-react/core";
import { UserRejectedRequestError } from "@web3-react/injected-connector";
import { injected, formatAddress } from "../connect";
import { Popover, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

const solutions = [
  {
    name: "Mantle",
    description: "Mantle Network's official website",
    href: "https://www.mantle.xyz/",
  },
  {
    name: "Explorer",
    description: "Testnet blockexplorer",
    href: "https://explorer.testnet.mantle.xyz/",
  },
  {
    name: "Bridge",
    description: "Bridge tokens to testnet",
    href: "https://bridge.testnet.mantle.xyz/deposit",
  },
  {
    name: "Faucet",
    description: "Get testnet BIT tokens",
    href: "https://faucet.testnet.mantle.xyz/",
  },
];

const Connect = () => {
  const { account, activate, deactivate, setError, active } = useWeb3React();

  const onClickConnect = () => {
    activate(
      injected,
      (error) => {
        if (error instanceof UserRejectedRequestError) {
          // ignore user rejected error
          console.log("user refused");
        } else {
          setError(error);
        }
      },
      false
    );
  };

  const onClickDisconnect = () => {
    deactivate();
  };

  return (
    <div>
      {active && typeof account === "string" ? (
        <Popover className="relative">
          {({ open }) => (
            <>
              <Popover.Button className="flex flex-row items-center bg-purple-3 text-off-white border-2 border-purple-3 outline-none px-6 py-2 hover:px-[1.625rem] hover:py-[0.625rem] font-poppins font-medium text-sm rounded-lg transition-all">
                <span>{formatAddress(account, 4)}</span>
                <ChevronDownIcon
                  className="text-off-white ml-2 h-5 w-5 text-primary-black transition duration-150 ease-in-out group-hover:text-opacity-80 hover:rotate-180"
                  aria-hidden="true"
                />
              </Popover.Button>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
              >
                <Popover.Panel className="absolute z-50 mt-3 w-96 -translate-x-1/2 transform px-4 sm:px-0 lg:max-w-3xl">
                  <div className="overflow-hidden rounded-lg shadow-xl ring-1 ring-black ring-opacity-5">
                    <div className="relative grid gap-8 bg-off-white p-6">
                      {solutions.map((item) => (
                        <a
                          key={item.name}
                          href={item.href}
                          className="-m-3 flex items-center rounded-lg p-2 transition duration-150 ease-in-out hover:bg-white focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                        >
                          <div className="ml-4">
                            <p className="text-sm font-medium text-purple-3">
                              {item.name}
                            </p>
                            <p className="text-sm text-gray-500">
                              {item.description}
                            </p>
                          </div>
                        </a>
                      ))}
                    </div>
                    <div className="flex justify-center bg-white/50 backdrop-blur-[200px] p-6">
                      <button
                        onClick={onClickDisconnect}
                        className="bg-purple-3 text-off-white outline-none px-8 py-2 font-poppins font-medium text-sm rounded-lg transition-all"
                      >
                        Disconnect Wallet
                      </button>
                    </div>
                  </div>
                </Popover.Panel>
              </Transition>
            </>
          )}
        </Popover>
      ) : (
        <button
          onClick={onClickConnect}
          className="bg-transparent text-purple-3 hover:bg-purple-3 hover:text-off-white border-2 border-purple-3 outline-none px-6 py-2 hover:px-[1.625rem] hover:py-[0.625rem] font-poppins font-medium text-sm rounded-lg transition-all"
        >
          Connect Wallet
        </button>
      )}
    </div>
  );
};

export default Connect;
