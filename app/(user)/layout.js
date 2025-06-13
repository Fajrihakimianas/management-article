import "../globals.css";

export const metadata = {
  title: "User Layout",
  description: "Layout for user pages",
};

export default function UserLayout({ children }) {
  return <main>{children}</main>;
}
