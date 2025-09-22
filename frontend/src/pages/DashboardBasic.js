import React, { useState } from 'react';
import styled from 'styled-components';
import { BarChart3 } from 'lucide-react';
import AdvancedTradingViewWithBackend from '../components/AdvancedTradingViewWithBackend';
import SignalsInline from '../components/SignalsInline';

const DashboardContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

const PageTitle = styled.h1`
  color: #ffffff;
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 30px;
  text-align: center;
`;

const ChartSection = styled.div`
  background-color: #1a1a1a;
  border: 1px solid #333;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 30px;
`;

const SectionTitle = styled.h2`
  color: #ffffff;
  font-size: 24px;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 10px;
  
  svg {
    color: #2563eb;
  }
`;

function DashboardBasic() {
  return (
    <DashboardContainer>
      <PageTitle>TradingView - Hệ thống Dự đoán Chứng khoán</PageTitle>

      <ChartSection>
        <SectionTitle>
          <BarChart3 />
          Biểu đồ Giá cổ phiếu
        </SectionTitle>

        <AdvancedTradingViewWithBackend />

        {/* Tín hiệu ngay bên dưới chart */}
        <SignalsInline />
      </ChartSection>
    </DashboardContainer>
  );
}

export default DashboardBasic;
