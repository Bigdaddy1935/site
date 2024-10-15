import Comments from "@/components/Comments";
import React, { Suspense } from "react";

const getProductComments = async (productId: number) => {
  let data = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/comment/get/accepted/type/${productId}`,
    {
      next: { revalidate: 7200 },
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      body: JSON.stringify({ type: "App\\Models\\Product" }),
    }
  );
  let jsonData = await data.json();

  return jsonData;
};
async function ProductComments({ id }: { id: number }) {
  const comments = await getProductComments(id);
  return (
    <Suspense fallback={null}>
      <Comments
        model="product"
        id={Number(id)}
        type="App\Models\Product6"
        comments={comments}
      />
    </Suspense>
  );
}

export default React.memo(ProductComments);
