"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useState, useEffect } from "react";
import {
  signIn,
  signOut,
  useSession,
  getProviders,
  LiteralUnion,
} from "next-auth/react";
import { BuiltInProviderType, Provider } from "next-auth/providers/index";
interface ProviderProps {
  name: string;
  id: LiteralUnion<BuiltInProviderType>;
}
const Nav = () => {
  const [provider, setProvider] = useState<Provider | null>();
  const [toggleDropdown, settoggleDropdown] = useState(false);
  const { data: session } = useSession();
  useEffect(() => {
    const setUpProviders = async () => {
      const response: any = await getProviders();
      // if (response != null) {
      setProvider(response);

      // }
    };
    setUpProviders();
  }, []);
  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href="/" className="flex gap-2 flex-center">
        <Image
          src={"/assets/images/logo.svg"}
          alt="logo"
          width={30}
          height={30}
          className="object-contain"
        />
        <p className="logo_text">Promptopia</p>
      </Link>
      {/* Desktop navigation */}
      <div className="sm:flex hidden">
        {session?.user ? (
          <div className="flex gap-3 md:gap-5">
            <Link href={"/create-prompt"} className="black_btn">
              Create Post
            </Link>
            <button
              type="button"
              onClick={() => signOut()}
              className="outline_btn"
            >
              Sign Out
            </button>
            <Link href={"/profile"}>
              <Image
                src={session.user.image as string}
                alt="profile"
                width={37}
                height={37}
                className="rounded-full"
              />
            </Link>
          </div>
        ) : (
          <>
            {provider &&
              Object.values(provider).map((provider: ProviderProps) => {
                return (
                  <button
                    type="button"
                    className="black_btn"
                    key={provider.name}
                    onClick={() => {
                      signIn(provider.id);
                    }}
                  >
                    Sign In
                  </button>
                );
              })}
          </>
        )}
      </div>

      {/* mobile navigation */}
      <div className="sm:hidden flex relative">
        {session?.user ? (
          <>
            <div className="flex">
              <Image
                src={session?.user?.image as string}
                alt="profile"
                width={37}
                height={37}
                className="rounded-full"
                onClick={() => {
                  settoggleDropdown((prev) => !prev);
                }}
              />
              {toggleDropdown && (
                <>
                  <div className="dropdown">
                    <Link
                      href={"/profile"}
                      className="dropdown_link"
                      onClick={() => {
                        settoggleDropdown(false);
                      }}
                    >
                      My Profile
                    </Link>
                    <Link
                      href={"/create-prompt"}
                      className="dropdown_link"
                      onClick={() => {
                        settoggleDropdown(false);
                      }}
                    >
                      Create Prompt
                    </Link>
                    <button
                      type="button"
                      className="mt-5 w-full black_btn"
                      onClick={() => {
                        settoggleDropdown(false);
                        signOut();
                      }}
                    >
                      Sign out
                    </button>
                  </div>
                </>
              )}
            </div>
          </>
        ) : (
          <>
            {provider &&
              Object.values(provider).map((provider: ProviderProps) => {
                return (
                  <button
                    type="button"
                    className="black_btn"
                    key={provider.name}
                    onClick={() => {
                      signIn(provider.id);
                    }}
                  ></button>
                );
              })}
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;
