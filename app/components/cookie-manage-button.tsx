"use client";

export default function CookieManageButton() {
  return (
    <button
      onClick={() => window.dispatchEvent(new Event("reopen-cookie-consent"))}
      className="cursor-pointer text-sm text-gray-400 hover:text-white"
    >
      Upravljanje kolačićima
    </button>
  );
}
