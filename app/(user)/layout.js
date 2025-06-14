import "../globals.css";

export const metadata = {
  title: "Articles",
  description: "Articles for users",
};

export default function UserLayout({ children }) {
  return <main>{children}</main>;
}
