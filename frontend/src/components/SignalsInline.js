import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Filter } from 'lucide-react';
import { signalAPI, formatDateTime } from '../services/api';

const Section = styled.div`
  background: #1a1a1a;
  border: 1px solid #333;
  border-radius: 8px;
  padding: 16px;
  margin-top: 16px;
`;

const Title = styled.h2`
  color: #fff;
  font-size: 20px;
  margin: 0 0 12px 0;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Toolbar = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
  margin-bottom: 12px;
`;

const Select = styled.select`
  background: #333;
  color: #fff;
  border: 1px solid #555;
  border-radius: 6px;
  padding: 6px 10px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const Th = styled.th`
  text-align: left;
  color: #9ca3af;
  font-weight: 600;
  font-size: 12px;
  padding: 10px 8px;
  border-bottom: 1px solid #333;
`;

const Td = styled.td`
  color: #e5e7eb;
  padding: 10px 8px;
  border-bottom: 1px solid #222;
  font-size: 13px;
`;

const Badge = styled.span`
  display: inline-block;
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 700;
  background: ${p => p.bg || '#374151'};
  color: ${p => p.color || '#fff'};
`;

const getTrendBadge = (signalType) => {
  if (signalType === 'LONG') return <Badge bg="#065f46">TĂNG</Badge>;
  if (signalType === 'SHORT') return <Badge bg="#7f1d1d">GIẢM</Badge>;
  if (signalType === 'REVERSAL') return <Badge bg="#92400e">ĐẢO CHIỀU</Badge>;
  return <Badge>TRUNG LẬP</Badge>;
};

// Parse fallback Reversal from reason token 'Reversal:NUMBER'
const extractReversalFromReason = (reason) => {
  if (!reason) return null;
  const m = reason.match(/Reversal\s*:\s*([0-9]+(?:\.[0-9]+)?)/i);
  return m ? parseFloat(m[1]) : null;
};

export default function SignalsInline({ symbolFilter }) {
  const [rows, setRows] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [symbol, setSymbol] = useState('ALL');
  const [type, setType] = useState('ALL');

  useEffect(() => {
    if (symbolFilter) setSymbol(symbolFilter);
  }, [symbolFilter]);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const res = await signalAPI.getRecentSignals(200);
        if (!alive) return;
        const data = (res.data || []).sort((a,b)=>new Date(b.timestamp)-new Date(a.timestamp));
        setRows(data);
        setFiltered(data);
      } catch(e) {
        if (!alive) return;
        setRows([]);
        setFiltered([]);
      }
    })();

    const id = setInterval(async () => {
      try {
        const res = await signalAPI.getRecentSignals(50);
        const data = (res.data || []).sort((a,b)=>new Date(b.timestamp)-new Date(a.timestamp));
        if (data.length && (!rows.length || new Date(data[0].timestamp) > new Date(rows[0].timestamp))) {
          setRows(prev => [...data, ...prev].slice(0, 300));
        }
      } catch {}
    }, 8000);
    return () => { alive = false; clearInterval(id); };
  }, []);

  useEffect(() => {
    let list = [...rows];
    if (symbol !== 'ALL') list = list.filter(r => r.symbol === symbol);
    if (type !== 'ALL') list = list.filter(r => r.signalType === type);
    setFiltered(list);
  }, [rows, symbol, type]);

  const symbols = Array.from(new Set(rows.map(r => r.symbol)));

  return (
    <Section>
      <Title>✨ Tín hiệu</Title>
      <Toolbar>
        <Filter size={16} color="#60a5fa" />
        <Select value={symbol} onChange={e=>setSymbol(e.target.value)}>
          <option value="ALL">Tất cả mã</option>
          {symbols.map(s=> <option key={s} value={s}>{s}</option>)}
        </Select>
        <Select value={type} onChange={e=>setType(e.target.value)}>
          <option value="ALL">Tất cả tín hiệu</option>
          <option value="LONG">TĂNG (LONG)</option>
          <option value="SHORT">GIẢM (SHORT)</option>
          <option value="REVERSAL">ĐẢO CHIỀU</option>
        </Select>
      </Toolbar>

      <Table>
        <thead>
          <tr>
            <Th>Thời gian</Th>
            <Th>Mã</Th>
            <Th>Độ tin cậy</Th>
            <Th>Xu hướng</Th>
            <Th>Điểm đảo chiều</Th>
            <Th>Lệnh</Th>
            <Th>Giá</Th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((r,idx)=> {
            const reversal = r.reversalPoint != null ? r.reversalPoint : extractReversalFromReason(r.reason);
            const revText = reversal != null ? `${reversal > (r.price ?? reversal) ? 'Đảo short' : 'Đảo long'} ${reversal}` : '—';
            return (
              <tr key={idx}>
                <Td>{formatDateTime(r.timestamp)}</Td>
                <Td>{r.symbol || '—'}</Td>
                <Td>{typeof r.confidence === 'number' ? `${(r.confidence*100).toFixed(1)}%` : '—'}</Td>
                <Td>{getTrendBadge(r.signalType)}</Td>
                <Td>{revText}</Td>
                <Td>
                  {r.signalType === 'LONG' && <Badge bg="#065f46">LONG</Badge>}
                  {r.signalType === 'SHORT' && <Badge bg="#7f1d1d">SHORT</Badge>}
                  {r.signalType === 'REVERSAL' && <Badge bg="#92400e">REVERSAL</Badge>}
                </Td>
                <Td>{typeof r.price === 'number' ? r.price.toFixed(1) : r.price || '—'}</Td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </Section>
  );
}
