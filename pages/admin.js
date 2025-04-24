import React, { useState } from 'react';

export default function AdminDashboard() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (password === 'lexion123') {
      setIsLoggedIn(true);
    } else {
      alert('비밀번호가 틀렸습니다.');
    }
  };

  if (!isLoggedIn) {
    return (
      <div style={{ padding: 40 }}>
        <h2>관리자 로그인</h2>
        <input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin}>로그인</button>
      </div>
    );
  }

  return <div style={{ padding: 40 }}><h2>관리자 페이지에 오신 걸 환영합니다</h2></div>;
}
