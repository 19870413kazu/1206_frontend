import OneCustomerInfoCard from "../../components/one_customer_info_card.jsx";

async function fetchCustomer(id) {
  if (!id) return null; // ★ ビルド時の undefined 対策

  const res = await fetch(
    process.env.NEXT_PUBLIC_API_ENDPOINT + `/customers?customer_id=${id}`,
    { cache: "no-store" } // ★ SSG対策
  );

  if (!res.ok) {
    throw new Error("Failed to fetch customer");
  }

  return res.json();
}

export default async function ReadPage({ searchParams }) {
  const id = searchParams?.id;   // ✅ query → searchParams に変更

  if (!id) {
    return <div>読み込み中...</div>; // ✅ ビルド落ち防止
  }

  const customerInfo = await fetchCustomer(id);

  if (!customerInfo) {
    return <div>データが取得できませんでした</div>;
  }

  return (
    <>
      <div className="alert alert-success">更新しました</div>

      <div className="card bordered bg-white border-blue-200 border-2 max-w-sm m-4">
        <OneCustomerInfoCard {...customerInfo[0]} />
      </div>

      <button className="btn btn-outline btn-accent">
        <a href="/customers">一覧に戻る</a>
      </button>
    </>
  );
}
