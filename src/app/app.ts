import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxChartsModule, Color, ScaleType } from '@swimlane/ngx-charts';

interface DashboardData {
  gaiUsage: {
    coreUsers: { department: string; months: { month: string; value: number }[] }[];
    usagePurpose: { name: string; value: number }[];
  };
  aiSupport: {
    poc: { contracted: number; total: number };
    production: { contracted: number; total: number };
    amount: {
      poc: { contracted: number; total: number };
      production: { contracted: number; total: number };
    };
  };
  learningEnv: {
    departments: number;
    users: number;
    totalCost: number;
    monthlyCost: { month: string; value: number }[];
  };
  hrDevelopment: {
    apprentice: { certified: number; total: number };
    independent: { certified: number; total: number };
  };
}

@Component({
  selector: 'app-root',
  imports: [CommonModule, FormsModule, NgxChartsModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  private readonly STORAGE_KEY = 'kpi-dashboard-data';
  
  isEditMode = false;
  showDataModal = false;
  activeTab = 'gai';
  
  editData: DashboardData = this.getDefaultData();
  
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

  ngOnInit(): void {
    this.loadData();
  }

  getDefaultData(): DashboardData {
    return {
      gaiUsage: {
        coreUsers: [
          { department: '営業部', months: [
            { month: '4月', value: 45 }, { month: '5月', value: 52 }, { month: '6月', value: 58 },
            { month: '7月', value: 65 }, { month: '8月', value: 72 }, { month: '9月', value: 78 },
            { month: '10月', value: 85 }, { month: '11月', value: 92 }, { month: '12月', value: 98 }
          ]},
          { department: '開発部', months: [
            { month: '4月', value: 120 }, { month: '5月', value: 135 }, { month: '6月', value: 142 },
            { month: '7月', value: 155 }, { month: '8月', value: 168 }, { month: '9月', value: 175 },
            { month: '10月', value: 188 }, { month: '11月', value: 195 }, { month: '12月', value: 210 }
          ]},
          { department: '企画部', months: [
            { month: '4月', value: 30 }, { month: '5月', value: 35 }, { month: '6月', value: 42 },
            { month: '7月', value: 48 }, { month: '8月', value: 55 }, { month: '9月', value: 60 },
            { month: '10月', value: 68 }, { month: '11月', value: 75 }, { month: '12月', value: 82 }
          ]}
        ],
        usagePurpose: [
          { name: '文書作成支援', value: 1250 },
          { name: 'コード生成', value: 980 },
          { name: 'データ分析', value: 750 },
          { name: '翻訳・要約', value: 620 },
          { name: '企画立案', value: 450 },
          { name: 'その他', value: 280 }
        ]
      },
      aiSupport: {
        poc: { contracted: 15, total: 45 },
        production: { contracted: 8, total: 28 },
        amount: {
          poc: { contracted: 45000000, total: 120000000 },
          production: { contracted: 85000000, total: 280000000 }
        }
      },
      learningEnv: {
        departments: 12,
        users: 245,
        totalCost: 23500000,
        monthlyCost: [
          { month: '4月', value: 1200000 }, { month: '5月', value: 1350000 }, { month: '6月', value: 1480000 },
          { month: '7月', value: 1620000 }, { month: '8月', value: 1750000 }, { month: '9月', value: 1890000 },
          { month: '10月', value: 2050000 }, { month: '11月', value: 2180000 }, { month: '12月', value: 2350000 }
        ]
      },
      hrDevelopment: {
        apprentice: { certified: 85, total: 150 },
        independent: { certified: 42, total: 150 }
      }
    };
  }

  loadData(): void {
    const savedData = localStorage.getItem(this.STORAGE_KEY);
    if (savedData) {
      try {
        this.editData = JSON.parse(savedData);
      } catch {
        this.editData = this.getDefaultData();
      }
    } else {
      this.editData = this.getDefaultData();
    }
    this.updateDisplayData();
  }

  saveData(): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.editData));
    this.updateDisplayData();
    this.showDataModal = false;
  }

  resetData(): void {
    if (confirm('データを初期値にリセットしますか？')) {
      this.editData = this.getDefaultData();
      localStorage.removeItem(this.STORAGE_KEY);
      this.updateDisplayData();
    }
  }

  exportData(): void {
    const dataStr = JSON.stringify(this.editData, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'kpi-dashboard-data.json';
    a.click();
    URL.revokeObjectURL(url);
  }

  importData(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = JSON.parse(e.target?.result as string);
          this.editData = data;
          this.saveData();
          alert('データをインポートしました');
        } catch {
          alert('ファイルの読み込みに失敗しました');
        }
      };
      reader.readAsText(input.files[0]);
    }
  }

  openDataModal(): void {
    this.showDataModal = true;
  }

  closeDataModal(): void {
    this.showDataModal = false;
    this.loadData();
  }

  updateDisplayData(): void {
    this.coreUserData = this.editData.gaiUsage.coreUsers.map(dept => ({
      name: dept.department,
      series: dept.months.map(m => ({ name: m.month, value: m.value }))
    }));

    this.usagePurposeData = [...this.editData.gaiUsage.usagePurpose];

    this.aiSupportPocData = [
      { name: '受託案件', value: this.editData.aiSupport.poc.contracted },
      { name: '全量案件', value: this.editData.aiSupport.poc.total }
    ];

    this.aiSupportProductionData = [
      { name: '受託案件', value: this.editData.aiSupport.production.contracted },
      { name: '全量案件', value: this.editData.aiSupport.production.total }
    ];

    this.aiSupportAmountData = [
      {
        name: 'PoC',
        series: [
          { name: '受託金額', value: this.editData.aiSupport.amount.poc.contracted },
          { name: '全量金額', value: this.editData.aiSupport.amount.poc.total }
        ]
      },
      {
        name: '本番',
        series: [
          { name: '受託金額', value: this.editData.aiSupport.amount.production.contracted },
          { name: '全量金額', value: this.editData.aiSupport.amount.production.total }
        ]
      }
    ];

    this.learningEnvData = [
      { name: '利用部署数', value: this.editData.learningEnv.departments },
      { name: '登録者数', value: this.editData.learningEnv.users }
    ];

    this.learningEnvCostData = this.editData.learningEnv.monthlyCost.map(m => ({
      name: m.month,
      value: m.value
    }));

    this.apprenticeData = {
      certified: this.editData.hrDevelopment.apprentice.certified,
      total: this.editData.hrDevelopment.apprentice.total,
      percentage: Math.round((this.editData.hrDevelopment.apprentice.certified / this.editData.hrDevelopment.apprentice.total) * 1000) / 10
    };

    this.independentData = {
      certified: this.editData.hrDevelopment.independent.certified,
      total: this.editData.hrDevelopment.independent.total,
      percentage: Math.round((this.editData.hrDevelopment.independent.certified / this.editData.hrDevelopment.independent.total) * 1000) / 10
    };

    this.apprenticeGaugeData = [{ name: '見習い認定', value: this.apprenticeData.percentage }];
    this.independentGaugeData = [{ name: '独り立ち認定', value: this.independentData.percentage }];
  }

  getPocContractedRatio(): number {
    return Math.round((this.editData.aiSupport.poc.contracted / this.editData.aiSupport.poc.total) * 1000) / 10;
  }

  getProductionContractedRatio(): number {
    return Math.round((this.editData.aiSupport.production.contracted / this.editData.aiSupport.production.total) * 1000) / 10;
  }

  getPocAmountRatio(): number {
    return Math.round((this.editData.aiSupport.amount.poc.contracted / this.editData.aiSupport.amount.poc.total) * 1000) / 10;
  }

  getProductionAmountRatio(): number {
    return Math.round((this.editData.aiSupport.amount.production.contracted / this.editData.aiSupport.amount.production.total) * 1000) / 10;
  }

  getTotalContractedAmount(): number {
    return this.editData.aiSupport.amount.poc.contracted + this.editData.aiSupport.amount.production.contracted;
  }

  getTotalAmount(): number {
    return this.editData.aiSupport.amount.poc.total + this.editData.aiSupport.amount.production.total;
  }

  getTotalAmountRatio(): number {
    return Math.round((this.getTotalContractedAmount() / this.getTotalAmount()) * 1000) / 10;
  }
}
