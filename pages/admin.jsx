\import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyAJ2Cd9LPmbyTBZotqOPjoZoI_I4k2M_00",
  authDomain: "lexion-store.firebaseapp.com",
  projectId: "lexion-store",
  storageBucket: "lexion-store.appspot.com",
  messagingSenderId: "1057001696791",
  appId: "1:1057001696791:web:db730663e5538dfce87652",
  measurementId: "G-8QNERNPN6D"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export default function AdminDashboard() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ name: '', price: '', description: '', category: '', tags: '', image: null, preview: '', id: '' });
  const [password, setPassword] = useState('');
  const [envPassword, setEnvPassword] = useState(null);

  useEffect(() => {
    setEnvPassword(process.env.NEXT_PUBLIC_ADMIN_PASSWORD);
  }, []);
  useEffect(() => {
    if (!isLoggedIn) return;
    const fetchProducts = async () => {
      const querySnapshot = await getDocs(collection(db, 'products'));
      const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setProducts(data);
    };
    fetchProducts();
  }, [isLoggedIn]);

  const handleInputChange = (e) => {
    const { id, value, files } = e.target;
    if (files) {
      const file = files[0];
      const preview = URL.createObjectURL(file);
      setForm({ ...form, image: file, preview });
    } else {
      setForm({ ...form, [id]: value });
    }
  };

  const handleAddOrUpdateProduct = async () => {
    if (!form.name || !form.price || !form.description || !form.image) return alert('모든 항목을 입력하세요');

    let imageUrl = form.preview;
    if (form.image && typeof form.image !== 'string') {
      const imageRef = ref(storage, `products/${form.image.name}`);
      await uploadBytes(imageRef, form.image);
      imageUrl = await getDownloadURL(imageRef);
    }

    const newProduct = {
      name: form.name,
      price: form.price,
      description: form.description,
      category: form.category,
      tags: form.tags,
      imageUrl
    };

    if (form.id) {
      const productRef = doc(db, 'products', form.id);
      await updateDoc(productRef, newProduct);
      setProducts(products.map(p => (p.id === form.id ? { id: form.id, ...newProduct } : p)));
    } else {
      const docRef = await addDoc(collection(db, 'products'), newProduct);
      setProducts([...products, { id: docRef.id, ...newProduct }]);
    }

    setForm({ name: '', price: '', description: '', category: '', tags: '', image: null, preview: '', id: '' });
  };

  const handleDeleteProduct = async (id) => {
    await deleteDoc(doc(db, 'products', id));
    setProducts(products.filter(p => p.id !== id));
  };

  const handleEditProduct = (product) => {
    setForm({ ...product, preview: product.imageUrl, image: '' });
  };

  const handleLogin = () => {
    if (!envPassword) {
      alert("환경변수를 아직 불러오는 중입니다. 잠시 후 시도해주세요.");
      return;
    }
    if (password === envPassword) setIsLoggedIn(true);
    else alert('비밀번호가 틀렸습니다.');
  };
  if (!envPassword) {
    return <p className="p-6 text-center text-gray-500">환경변수를 불러오는 중입니다...</p>;
  }

  if (!isLoggedIn) {
    return (
      <div className="p-6 max-w-sm mx-auto">
        <h2 className="text-xl font-semibold mb-4">관리자 로그인</h2>
        <Label htmlFor="password">비밀번호</Label>
        <Input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="비밀번호 입력"
        />
        <Button className="mt-4" onClick={handleLogin}>로그인</Button>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="text-2xl font-bold">LEXION 관리자 페이지</div>

      <Card>
        <CardContent className="space-y-4">
          <h2 className="text-xl font-semibold">📦 상품 등록 / 수정</h2>
          <Input id="name" value={form.name} onChange={handleInputChange} placeholder="상품명" />
          <Input id="price" type="number" value={form.price} onChange={handleInputChange} placeholder="가격 (KRW)" />
          <Textarea id="description" value={form.description} onChange={handleInputChange} placeholder="상품 설명" />
          <Input id="category" value={form.category} onChange={handleInputChange} placeholder="카테고리 (예: 가방, 시계)" />
          <Input id="tags" value={form.tags} onChange={handleInputChange} placeholder="태그 (쉼표로 구분)" />
          <Input id="image" type="file" onChange={handleInputChange} />
          {form.preview && <img src={form.preview} alt="미리보기" className="w-40 mt-2 rounded" />}
          <Button onClick={handleAddOrUpdateProduct}>{form.id ? '상품 수정' : '상품 등록'}</Button>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="space-y-4">
          <h2 className="text-xl font-semibold">📋 상품 리스트</h2>
          {products.length === 0 ? (
            <p className="text-gray-500">등록된 상품이 없습니다.</p>
          ) : (
            <ul className="space-y-2">
              {products.map((product) => (
                <li key={product.id} className="border p-3 rounded">
                  <p className="font-medium">{product.name}</p>
                  <p>{product.price} KRW</p>
                  <p className="text-sm text-gray-600">{product.description}</p>
                  <p className="text-sm">카테고리: {product.category}</p>
                  <p className="text-sm text-gray-500">태그: {product.tags}</p>
                  {product.imageUrl && <img src={product.imageUrl} alt="" className="w-32 mt-2" />}
                  <div className="flex gap-2 mt-2">
                    <Button variant="secondary" onClick={() => handleEditProduct(product)}>수정</Button>
                    <Button variant="destructive" onClick={() => handleDeleteProduct(product.id)}>삭제</Button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <h2 className="text-xl font-semibold">📦 주문 / 고객 관리 (예정)</h2>
          <p className="text-gray-500">이곳에 향후 주문 내역 및 고객 정보 관리 기능이 추가될 예정입니다.</p>
        </CardContent>
      </Card>
    </div>
  );
}
