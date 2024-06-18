import { db } from "@/db";
import { productTable } from "@/db/schema";
import { sql } from "drizzle-orm";
import { redirect } from "next/navigation";

interface PageProps {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}

const Page = async ({ searchParams }: PageProps) => {
  const query = searchParams.query;

  //guard clause to check if the url in string or not
  if (Array.isArray(query) || !query) {
    return redirect("/");
  }

  //querying logic
  let product = await db
    .select()
    .from(productTable)
    .where(
      sql`to_tsvector('simple',lower(${productTable.name} || ' ' || ${
        productTable.description
      })) @@ to_tsquery('simple', lower(${query
        .trim()
        .split(" ")
        .join(" & ")}))`
    )
    .limit(3);

  return <pre>{JSON.stringify(product)}</pre>;
};

export default Page;
