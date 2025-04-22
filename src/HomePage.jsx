// src/HomePage.jsx
import React, { useState } from "react";
import { initializeApp } from "firebase/app";
import {
  getStorage,
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";

// 1️⃣ Firebase 설정 (자신의 config 로 바꿔주세요)
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
};
initializeApp(firebaseConfig);
const storage = getStorage();

export default function HomePage() {
  // 2️⃣ 폼 상태 + 상품 리스트 상태
  const [form, setForm] = useState({
    name: "",
    price: "",
    size: "",
    imageUrl: "",
  });
  const [products, setProducts] = useState([]);

  // 3️⃣ 입력값 업데이트
  const handleInput = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // 4️⃣ 파일 업로드 → URL 얻기
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const fileRef = storageRef(storage, `products/${file.name}`);
    await uploadBytes(fileRef, file);
    const url = await getDownloadURL(fileRef);
    setForm((prev) => ({ ...prev, imageUrl: url }));
  };

  // 5️⃣ 폼 제출 → 리스트에 추가
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.price || !form.imageUrl) return;
    setProducts((prev) => [...prev, { id: Date.now(), ...form }]);
    setForm({ name: "", price: "", size: "", imageUrl: "" });
  };

  return (
    <div className="min-h-screen bg-black text-white p-6">
      {/* 업로드 폼 */}
      <form onSubmit={handleSubmit} className="space-y-4 mb-8">
        <div className="grid grid-cols-2 gap-4">
          <input
            name="name"
            value={form.name}
            onChange={handleInput}
            placeholder="Product Name"
            required
            className="p-2 bg-gray-800 rounded w-full"
          />
          <input
            name="price"
            value={form.price}
            onChange={handleInput}
            placeholder="Price (USD or KRW)"
            required
            className="p-2 bg-gray-800 rounded w-full"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <input
            name="size"
            value={form.size}
            onChange={handleInput}
            placeholder="Size Options (e.g. M, L, XL)"
            className="p-2 bg-gray-800 rounded w-full"
          />
          <input
            type="file"
            onChange={handleFileUpload}
            className="p-2 bg-gray-800 rounded text-white w-full"
          />
        </div>
        <input
          name="imageUrl"
          value={form.imageUrl}
          readOnly
          placeholder="Image URL"
          required
          className="p-2 bg-gray-800 rounded w-full"
        />
        <button
          type="submit"
          className="w-full py-2 bg-white text-black rounded font-bold"
        >
          Submit Product
        </button>
      </form>

      {/* 상품 리스트 */}
      <div className="grid grid-cols-3 gap-6">
        {products.map((item) => (
          <div key={item.id} className="bg-gray-900 rounded p-4">
            <img
              src={item.imageUrl}
              alt={item.name}
              className="w-full h-48 object-cover rounded mb-4"
            />
            <h3 className="text-xl font-bold mb-2">{item.name}</h3>
            <p className="text-sm text-gray-400 mb-1">{item.size}</p>
            <p className="text-sm mb-2">{item.price}</p>
            <button className="w-full py-1 bg-white text-black rounded">
              Buy Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
