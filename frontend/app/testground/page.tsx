import React from 'react';
import ScrollVideo from '../components/LandingShirt';

const App: React.FC = () => {
  return (
    <>
    <div style={{ height: '200vh', background: '#f5efe6' }}>
      <ScrollVideo />
    </div>
    <div style={{ position: 'relative', top: '100vh', textAlign: 'center' }}></div>
    </>
  );
};

export default App;