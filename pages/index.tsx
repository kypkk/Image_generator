import Image from "next/image";

export default function Home() {
  async function onsubmit(e: any) {
    e.preventDefault();
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: "A little shit running in the rain",
          n: 1,
          size: "1024x1024",
        }),
      });

      const data = await res.json();
      if (res.status !== 200) {
        throw (
          data.error || new Error(`Request failed with status ${res.status}`)
        );
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <main>
      <form onSubmit={onsubmit}>
        <button type="submit">generate</button>
      </form>
    </main>
  );
}
