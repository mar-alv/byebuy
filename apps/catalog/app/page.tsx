import Link from "next/link";

export default function Home() {
  return (
    <div className="bg-green-500">
      catalog
      <Link href="http://localhost:3000">voltar</Link>
      <Link href="http://localhost:3002">ir pro checkout</Link>
    </div>
  );
}
