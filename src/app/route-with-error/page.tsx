export const dynamic = "force-dynamic";

async function getData() {
  const res = await fetch("https://httpbin.org/status/500");
  return res.json();
}

export default async function RouteWithError() {
  const data = await getData();

  return (
    <div className="flex flex-col gap-4">
      <p>
        The data is: <strong>{JSON.stringify(data)}</strong>
      </p>
    </div>
  );
}