import React from "react";

const HomePage = () => {
  const products = [
    {
      id: 1,
      title: "Supreme x The North Face 2nd Limited Jacket",
      size: "M / L / XL",
      price: "₩5,500,000",
      image: "https://firebasestorage.googleapis.com/v0/b/lexion-store.appspot.com/o/products%2Fsupreme_tnf.jpg?alt=media",
      description: "2차 한정 발매된 고급 스트릿 자켓. 국내 희소가치 매우 높음."
    },
    {
      id: 2,
      title: "Dior Caro Bag Cannage Medium Pink",
      size: "One Size",
      price: "₩4,700,000",
      image: "https://firebasestorage.googleapis.com/v0/b/lexion-store.appspot.com/o/products%2Fdior_caro_pink.jpg?alt=media",
      description: "전시품 상태 A+, 정품 인증서/케이스 포함 풀세트."
    },
    {
      id: 3,
      title: "Rolex 6494 Vintage Tuxedo Dial",
      size: "34mm",
      price: "문의주세요",
      image: "https://firebasestorage.googleapis.com/v0/b/lexion-store.appspot.com/o/products%2Frolex_tuxedo.jpg?alt=media",
      description: "한국 내 희소한 투톤 다이얼 모델. 빈티지 시계 수집용."
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white font-sans px-4 py-10">
      <h1 className="text-center text-3xl font-bold mb-6">Premium Collectibles & Luxury Fashion</h1>
      <p className="text-center text-gray-400 mb-8">
        Discover rare pieces & high-end fashion with guaranteed authenticity and fast worldwide shipping.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10 max-w-6xl mx-auto">
        {products.map((item) => (
          <div key={item.id} className="bg-gray-800 p-4 rounded-lg">
            <img src={item.image} alt={item.title} className="w-full h-48 object-cover rounded mb-4" />
            <h3 className="text-lg font-bold mb-1">{item.title}</h3>
            <p className="text-sm text-gray-300 mb-1">Size: {item.size}</p>
            <p className="text-sm text-gray-300 mb-1">{item.description}</p>
            <p className="text-white font-semibold mb-2">{item.price}</p>
            <button className="w-full py-1 bg-white text-black rounded font-bold">Buy Now</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
