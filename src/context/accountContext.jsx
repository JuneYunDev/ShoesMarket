import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { accountsData } from "../data/accountData";

const AccountContext = createContext(null);

export const AccountProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState(() => {
    const savedAccount = localStorage.getItem("shoe-market-account");

    if (!savedAccount) {
      return null;
    }

    try {
      return JSON.parse(savedAccount);
    } catch {
      localStorage.removeItem("shoe-market-account");
      return null;
    }
  });

  useEffect(() => {
    if (currentAccount) {
      localStorage.setItem(
        "shoe-market-account",
        JSON.stringify(currentAccount),
      );
    } else {
      localStorage.removeItem("shoe-market-account");
    }
  }, [currentAccount]);

  const login = ({ email, password }) => {
    const normalizedEmail = email.trim().toLowerCase();

    const matchedAccount = accountsData.find(
      (account) =>
        account.email.toLowerCase() === normalizedEmail &&
        account.password === password,
    );

    if (!matchedAccount) {
      return {
        success: false,
        message: "The email or password is incorrect.",
      };
    }

    const account = {
      id: matchedAccount.id,
      email: matchedAccount.email,
      name: matchedAccount.name,
      role: matchedAccount.role,
    };

    setCurrentAccount(account);

    return {
      success: true,
      account,
    };
  };

  const logout = () => {
    setCurrentAccount(null);
  };

  const value = useMemo(
    () => ({
      currentAccount,
      login,
      logout,
      isLoggedIn: Boolean(currentAccount),
      isAdmin: currentAccount?.role === "admin",
    }),
    [currentAccount],
  );

  return (
    <AccountContext.Provider value={value}>{children}</AccountContext.Provider>
  );
};

export const useAccount = () => {
  const context = useContext(AccountContext);

  if (!context) {
    throw new Error("useAccount must be used inside AccountProvider.");
  }

  return context;
};
