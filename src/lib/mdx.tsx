import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";

export function Mdx({ source }: { source: string }) {
  return (
    <div className="prose prose-zinc max-w-none prose-headings:scroll-mt-24 prose-a:text-[color:var(--brand-700)]">
      <MDXRemote
        source={source}
        options={{
          mdxOptions: {
            remarkPlugins: [remarkGfm],
            rehypePlugins: [rehypeSlug, [rehypeAutolinkHeadings, { behavior: "wrap" }]],
          },
        }}
      />
    </div>
  );
}
