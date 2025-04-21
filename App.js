import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";

export default function LexionHome() {
  const [user, setUser] = useState(null);

  return (
    <div className="min-h-screen bg-black text-white font-sans">
      {/* 고정 신뢰 배너 */}
      <div className="w-full bg-gray-900 text-center text-sm py-2 border-b border-gray-800">
        FAST GLOBAL SHIPPING via EMS / CJ / DHL — WEEKEND DISPATCH AVAILABLE — 100% AUTHENTICITY GUARANTEED — 200% REFUND IF FAKE
      </div>

      {/* 헤더 */}
      <header className="p-6 flex items-center justify-between border-b border-gray-800">
        <h1 className="text-3xl font-bold tracking-wide">LEXION</h1>
        <a
          href="https://instagram.com/lexion_vtg"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-gray-400 hover:text-white"
        >
          DM on Instagram → @Lexion_vtg
        </a>
      </header>

      {/* 메인 콘텐츠 */}
      <main className="p-6 max-w-6xl mx-auto">
        {/* 소개 */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-10"
        >
          <h2 className="text-xl md:text-2xl font-semibold mb-4">
            Premium Collectibles & Luxury Fashion
          </h2>
          <p className="text-gray-400">
            Discover rare pieces & high-end fashion with guaranteed authenticity and fast worldwide shipping.
          </p>
        </motion.div>

        {/* 상품 업로드 폼 (관리자 전용) */}
        <div className="bg-gray-800 p-6 rounded-2xl shadow mb-10">
          <h3 className="text-lg font-semibold mb-4">Upload New Product</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input placeholder="Product Name" className="bg-gray-700 text-white" />
            <Input placeholder="Price (USD or KRW)" className="bg-gray-700 text-white" />
            <Input placeholder="Size Options (e.g. M, L, XL)" className="bg-gray-700 text-white" />
            <Input placeholder="Image URL" className="bg-gray-700 text-white" />
            <Input placeholder="Description" className="bg-gray-700 text-white col-span-1 md:col-span-2" />
          </div>
          <Button className="mt-4 w-full">Submit Product</Button>
        </div>

        {/* 상품 카드 목록 (데모 3개) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="bg-gray-900 border-none rounded-2xl shadow-md hover:shadow-lg transition">
              <CardContent className="p-4">
                <img
                  src={`https://via.placeholder.com/400x300?text=Product+${i}`}
                  alt={`Product ${i}`}
                  className="rounded-xl mb-4"
                />
                <h3 className="text-lg font-semibold">Product Title {i}</h3>
                <p className="text-sm text-gray-400 mb-2">Short product description goes here.</p>
                <p className="text-xl font-bold mb-4">$100.00</p>
                <Button className="w-full">Buy Now</Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* 푸터 */}
        <div className="mt-12 border-t border-gray-800 pt-6 text-sm text-gray-500 text-center">
          &copy; {new Date().getFullYear()} Lexion - Luxury & Highend. All rights reserved.
        </div>
      </main>
    </div>
  );
}
