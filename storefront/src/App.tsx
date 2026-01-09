import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './routes/Home';

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* Future routes */}
        {/* <Route path="/originals" element={<Originals />} /> */}
        {/* <Route path="/commissions" element={<Commissions />} /> */}
        {/* <Route path="/editions" element={<Editions />} /> */}
        {/* <Route path="/digital" element={<Digital />} /> */}
        {/* <Route path="/archive" element={<Archive />} /> */}
      </Routes>
    </Layout>
  );
}
