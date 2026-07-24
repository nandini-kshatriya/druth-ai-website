import { sanityFetch } from "@/sanity/lib/live";
import { POSTS_QUERY } from "@/sanity/lib/queries";

export default async function SanityTestPage() {
  const { data: posts } = await sanityFetch({ query: POSTS_QUERY });

  return (
    <main className="min-h-screen bg-background text-foreground p-16">
      <h1 className="text-3xl font-bold mb-8">Sanity Test — Blog Posts</h1>
      <pre className="text-xs bg-background-soft p-6 rounded-lg overflow-auto">
        {JSON.stringify(posts, null, 2)}
      </pre>
    </main>
  );
}