'use client';

import { useCallback, useEffect, useState } from 'react';
import api from '@/lib/api';
import { motion } from 'framer-motion';
import { 
  Search, 
  Filter, 
  RefreshCcw, 
  Plus,
  Database,
  ArrowRight
} from 'lucide-react';
import Sidebar from '@/components/Sidebar';

export default function Catalog() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [processingId, setProcessingId] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newProduct, setNewProduct] = useState({
    sku: '', name: '', category: 'Electronics', currentPrice: '', cogs: '', stockLevel: ''
  });

  const fetchProducts = useCallback(async () => {
    try {
      const { data } = await api.get('/products');
      setProducts(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetchProducts();
    }, 0);

    return () => clearTimeout(timeoutId);
  }, [fetchProducts]);

  const handleGenerate = async (productId) => {
    setProcessingId(productId);
    try {
      await api.post(`/pricing/generate/${productId}`);
      fetchProducts();
    } catch (err) {
      alert('Failed to generate recommendation.');
    } finally {
      setProcessingId(null);
    }
  };

  const handleSeed = async () => {
    setLoading(true);
    try {
      await api.post('/products/seed');
      fetchProducts();
    } catch (err) {
      alert('Failed to seed data');
    } finally {
      setLoading(false);
    }
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      await api.post('/products', newProduct);
      setShowAddModal(false);
      setNewProduct({ sku: '', name: '', category: 'Electronics', currentPrice: '', cogs: '', stockLevel: '' });
      fetchProducts();
    } catch (err) {
      alert('Failed to add product');
    }
  };

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.sku.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar />
      <main className="flex-1 p-6 lg:p-10 pt-20 lg:pt-10 overflow-x-hidden">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">Inventory Assets</h1>
              <p className="text-slate-500 mt-1 text-sm font-medium">Manage SKUs and trigger automated strategy re-evaluations.</p>
            </div>
            <div className="flex gap-2 w-full sm:w-auto">
              <button 
                onClick={() => setShowAddModal(true)}
                className="btn-primary"
              >
                <Plus className="w-4 h-4" /> Add Asset
              </button>
              <button 
                onClick={handleSeed}
                className="px-4 py-2 rounded-lg bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors flex items-center gap-2 text-sm font-semibold"
              >
                <Database className="w-4 h-4" /> Seed Core
              </button>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-3 text-slate-400 w-4 h-4" />
              <input 
                type="text" 
                placeholder="Search by name or SKU..." 
                className="input-field pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button className="px-4 h-10 flex items-center justify-center gap-2 text-slate-600 font-semibold bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors text-sm">
              <Filter className="w-4 h-4" /> Options
            </button>
          </div>

          <div className="glass-card overflow-hidden overflow-x-auto shadow-sm border-slate-200">
            <div className="min-w-[800px]">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200">
                    <th className="table-header">Asset Identity</th>
                    <th className="table-header">Classification</th>
                    <th className="table-header text-center">Unit Price</th>
                    <th className="table-header text-center">Profitability</th>
                    <th className="table-header text-center">Stock Position</th>
                    <th className="table-header text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {loading ? (
                    Array(5).fill(0).map((_, i) => (
                      <tr key={i} className="animate-pulse">
                        <td colSpan="6" className="px-6 py-6"><div className="h-4 bg-slate-100 rounded w-full"></div></td>
                      </tr>
                    ))
                  ) : filteredProducts.map((p) => (
                    <tr key={p._id} className="hover:bg-slate-50 transition-colors group">
                      <td className="px-6 py-5">
                        <div className="font-semibold text-slate-900">{p.name}</div>
                        <div className="text-[10px] text-slate-400 font-bold mt-1 uppercase tracking-wider">{p.sku}</div>
                      </td>
                      <td className="px-6 py-5">
                        <span className="px-2 py-0.5 rounded border border-slate-200 bg-slate-100 text-slate-600 text-[10px] font-bold uppercase tracking-wide">
                          {p.category}
                        </span>
                      </td>
                      <td className="px-6 py-5 font-bold text-slate-900 text-center">${p.currentPrice.toFixed(2)}</td>
                      <td className="px-6 py-5 text-center">
                        <span className="font-semibold text-emerald-600 text-sm">
                          {(((p.currentPrice - p.cogs) / p.currentPrice) * 100).toFixed(1)}%
                        </span>
                      </td>
                      <td className="px-6 py-5 text-center text-slate-600 text-sm font-medium">{p.stockLevel} units</td>
                      <td className="px-6 py-5 text-right">
                        <button 
                          onClick={() => handleGenerate(p._id)}
                          disabled={processingId === p._id}
                          className="text-pink-600 hover:text-pink-700 font-bold text-xs uppercase tracking-widest flex items-center gap-1.5 ml-auto group/btn transition-colors"
                        >
                          {processingId === p._id ? (
                            <RefreshCcw className="w-3.5 h-3.5 animate-spin" />
                          ) : (
                            <>Analyze <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" /></>
                          )}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {showAddModal && (
          <div className="fixed inset-0 bg-slate-950/20 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ scale: 0.98, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white rounded-xl shadow-2xl w-full max-w-lg p-8 relative border border-slate-200"
            >
              <h2 className="text-xl font-bold text-slate-900 mb-6 uppercase tracking-tight">Register New Asset</h2>
              <form onSubmit={handleAddProduct} className="grid grid-cols-2 gap-5">
                <div className="col-span-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 block">Asset Name</label>
                  <input type="text" required className="input-field" value={newProduct.name} onChange={(e) => setNewProduct({...newProduct, name: e.target.value})} />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 block">Identifier (SKU)</label>
                  <input type="text" required className="input-field" value={newProduct.sku} onChange={(e) => setNewProduct({...newProduct, sku: e.target.value})} />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 block">Category</label>
                  <select className="input-field" value={newProduct.category} onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}>
                    <option>Electronics</option><option>Fashion</option><option>Home</option>
                  </select>
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 block">Unit Cost (COGS)</label>
                  <input type="number" required className="input-field" value={newProduct.cogs} onChange={(e) => setNewProduct({...newProduct, cogs: e.target.value})} />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 block">List Price</label>
                  <input type="number" required className="input-field" value={newProduct.currentPrice} onChange={(e) => setNewProduct({...newProduct, currentPrice: e.target.value})} />
                </div>
                <div className="col-span-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 block">Initial Stock Position</label>
                  <input type="number" required className="input-field" value={newProduct.stockLevel} onChange={(e) => setNewProduct({...newProduct, stockLevel: e.target.value})} />
                </div>
                <div className="col-span-2 flex gap-3 mt-4">
                  <button type="submit" className="btn-primary flex-1 justify-center">Commit Asset</button>
                  <button type="button" onClick={() => setShowAddModal(false)} className="px-6 text-sm font-semibold text-slate-500 hover:text-slate-700">Cancel</button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </main>
    </div>
  );
}
