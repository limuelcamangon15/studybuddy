import Default from "./templates/Default";

export default function Home() {
  return (
    <div className="w-full min-h-screen">
      <Default>
        <main className="flex justify-center items-center bg-yellow-700 w-full">
          <h1>hello idol</h1>
        </main>
      </Default>
    </div>
  );
}
