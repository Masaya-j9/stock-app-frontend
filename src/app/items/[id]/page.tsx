import { fetchItemById } from "@/lib/items/fetchItem"; // 先ほどのAPI関数
import { ErrorMessage } from "@/components/ErrorMessage";

type Params = {
  params: {
    id: string;
  };
};

export default async function ItemDetailPage({ params }: Params) {
  const item = await fetchItemById(params.id);

  if (!item) {
    return <ErrorMessage type="notFoundItem" />;
  }

  return (
    <div>
      <h1>{item.name}</h1>
      <p>{item.description}</p>
      <p>在庫: {item.quantity}</p>
      <ul>
        {item.itemsCategories?.map((cat) => (
          <li key={cat.id}>{cat.name}</li>
        ))}
      </ul>
    </div>
  );
}