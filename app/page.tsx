import type { Metadata } from "next";

import { Home } from "./home/Home";

export const metadata: Metadata = {
  title: "kc3 | Home",
  description: "kc3 - Kennel Club family tree",
};

export default function HomePage() {
  return <Home />;
}
