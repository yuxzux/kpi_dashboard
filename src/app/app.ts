import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxChartsModule, Color, ScaleType } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-root',
  imports: [CommonModule, NgxChartsModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  colorScheme: Color = {
    name: 'custom',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#0072CE', '#0055A4', '#338FDB', '#66ABE5', '#FF9800', '#4CAF50']
  };

  coreUserData = [
    {
      name: '営業部',
      series: [
        { name: '4月', value: 45 },
        { name: '5月', value: 52 },
        { name: '6月', value: 58 },
        { name: '7月', value: 65 },
        { name: '8月', value: 72 },
        { name: '9月', value: 78 },
        { name: '10月', value: 85 },
        { name: '11月', value: 92 },
        { name: '12月', value: 98 }
      ]
    },
    {
      name: '開発部',
      series: [
        { name: '4月', value: 120 },
        { name: '5月', value: 135 },
        { name: '6月', value: 142 },
        { name: '7月', value: 155 },
        { name: '8月', value: 168 },
        { name: '9月', value: 175 },
        { name: '10月', value: 188 },
        { name: '11月', value: 195 },
        { name: '12月', value: 210 }
      ]
    },
    {
      name: '企画部',
      series: [
        { name: '4月', value: 30 },
        { name: '5月', value: 35 },
        { name: '6月', value: 42 },
        { name: '7月', value: 48 },
        { name: '8月', value: 55 },
        { name: '9月', value: 60 },
        { name: '10月', value: 68 },
        { name: '11月', value: 75 },
        { name: '12月', value: 82 }
      ]
    }
  ];

  usagePurposeData = [
    { name: '文書作成支援', value: 1250 },
    { name: 'コード生成', value: 980 },
    { name: 'データ分析', value: 750 },
    { name: '翻訳・要約', value: 620 },
    { name: '企画立案', value: 450 },
    { name: 'その他', value: 280 }
  ];

  aiSupportPocData = [
    { name: '受託案件', value: 15 },
    { name: '全量案件', value: 45 }
  ];

  aiSupportProductionData = [
    { name: '受託案件', value: 8 },
    { name: '全量案件', value: 28 }
  ];

  aiSupportAmountData = [
    {
      name: 'PoC',
      series: [
        { name: '受託金額', value: 45000000 },
        { name: '全量金額', value: 120000000 }
      ]
    },
    {
      name: '本番',
      series: [
        { name: '受託金額', value: 85000000 },
        { name: '全量金額', value: 280000000 }
      ]
    }
  ];

  learningEnvData = [
    { name: '利用部署数', value: 12 },
    { name: '登録者数', value: 245 }
  ];

  learningEnvCostData = [
    { name: '4月', value: 1200000 },
    { name: '5月', value: 1350000 },
    { name: '6月', value: 1480000 },
    { name: '7月', value: 1620000 },
    { name: '8月', value: 1750000 },
    { name: '9月', value: 1890000 },
    { name: '10月', value: 2050000 },
    { name: '11月', value: 2180000 },
    { name: '12月', value: 2350000 }
  ];

  apprenticeData = {
    certified: 85,
    total: 150,
    percentage: 56.7
  };

  independentData = {
    certified: 42,
    total: 150,
    percentage: 28.0
  };

  apprenticeGaugeData = [
    { name: '見習い認定', value: 56.7 }
  ];

  independentGaugeData = [
    { name: '独り立ち認定', value: 28.0 }
  ];

  formatYen(value: number): string {
    if (value >= 100000000) {
      return (value / 100000000).toFixed(1) + '億円';
    } else if (value >= 10000) {
      return (value / 10000).toFixed(0) + '万円';
    }
    return value.toLocaleString() + '円';
  }

  formatNumber(value: number): string {
    return value.toLocaleString();
  }

  yAxisTickFormatting = (value: number): string => {
    if (value >= 1000000) {
      return (value / 10000).toFixed(0) + '万';
    }
    return value.toString();
  };
}
