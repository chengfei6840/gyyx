import React from 'react';
import { 
  LayoutDashboard, 
  BarChart3, 
  Settings, 
  Users, 
  ShieldCheck, 
  Activity,
  Zap,
  ChevronRight,
  Bell,
  Globe,
  Moon,
  Maximize2,
  Menu,
  ChevronDown,
  Power,
  Thermometer,
  Gauge,
  History,
  Search,
  Filter,
  AlertTriangle,
  ArrowUpRight,
  CheckCircle2,
  Plus,
  Trash2,
  Edit,
  X,
  RotateCcw
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area,
  Legend,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar
} from 'recharts';
import { cn } from './lib/utils';

// --- Types ---

type Tab = 'station' | 'distribution';
type MenuId = 'whole-station' | 'single-station' | 'alarm-config' | 'alarm-data' | 'temp-curve' | 'unbalance-curve' | 'station-mgmt' | 'device-mgmt' | 'clean-plan' | 'clean-task' | 'clean-record';

// --- Mock Data ---

const stations = [
  { id: 1, name: '宁波尚航科技发展有限公司', type: '自发自用', capacity: 500, power: 124.5, energy: 114.2, maxTemp: 52.4, currentUnbalance: 2.1, voltageUnbalance: 1.2, status: 'normal' },
  { id: 2, name: '杭州中兴工业园电站', type: '全额上网', capacity: 1200, power: 845.2, energy: 654.8, maxTemp: 78.5, currentUnbalance: 5.8, voltageUnbalance: 4.5, status: 'alarm' },
  { id: 3, name: '嘉兴海宁皮革城1号站', type: '自发自用', capacity: 800, power: 0, energy: 0, maxTemp: 25.1, currentUnbalance: 0, voltageUnbalance: 0, status: 'offline' },
  { id: 4, name: '绍兴柯桥纺织城电站', type: '自发自用', capacity: 2000, power: 1542.1, energy: 1245.3, maxTemp: 62.8, currentUnbalance: 3.2, voltageUnbalance: 2.1, status: 'normal' },
  { id: 5, name: '湖州长兴新能源产业园', type: '全额上网', capacity: 1500, power: 1120.4, energy: 985.6, maxTemp: 48.2, currentUnbalance: 2.5, voltageUnbalance: 1.8, status: 'normal' },
  { id: 6, name: '宁波北仑港务局电站', type: '自发自用', capacity: 3000, power: 2100.5, energy: 1850.2, maxTemp: 82.1, currentUnbalance: 6.5, voltageUnbalance: 5.2, status: 'alarm' },
];

const tempDistribution = [
  { range: '20-40℃', count: 12 },
  { range: '40-60℃', count: 45 },
  { range: '60-75℃', count: 18 },
  { range: '75℃+', count: 5 },
];

const unbalanceRanking = [
  { name: '宁波北仑港务局', value: 5.2 },
  { name: '杭州中兴工业园', value: 4.5 },
  { name: '嘉兴海宁皮革城', value: 3.8 },
  { name: '温州乐清电站', value: 2.9 },
  { name: '金华义乌商贸城', value: 2.5 },
];

const temperatureData = [
  { time: '00:00', inv1: 35, inv2: 38, inv3: 32 },
  { time: '04:00', inv1: 32, inv2: 34, inv3: 30 },
  { time: '08:00', inv1: 45, inv2: 48, inv3: 42 },
  { time: '12:00', inv1: 65, inv2: 68, inv3: 60 },
  { time: '16:00', inv1: 55, inv2: 58, inv3: 52 },
  { time: '20:00', inv1: 40, inv2: 42, inv3: 38 },
  { time: '23:59', inv1: 36, inv2: 39, inv3: 33 },
];

const unbalanceData = [
  { time: '00:00', factor: 0.98, unbalance: 1.2 },
  { time: '04:00', factor: 0.99, unbalance: 0.8 },
  { time: '08:00', factor: 0.95, unbalance: 2.5 },
  { time: '12:00', factor: 0.92, unbalance: 3.8 },
  { time: '16:00', factor: 0.94, unbalance: 2.1 },
  { time: '20:00', factor: 0.97, unbalance: 1.5 },
  { time: '23:59', factor: 0.98, unbalance: 1.1 },
];

const tempCurveDetailData = Array.from({ length: 24 }, (_, i) => ({
  time: `${String(i).padStart(2, '0')}:00`,
  phaseA: 40 + Math.random() * 20,
  phaseB: 42 + Math.random() * 20,
  phaseC: 41 + Math.random() * 20,
}));

const tempDetailList = Array.from({ length: 24 }, (_, i) => {
  const a = 40 + Math.random() * 20;
  const b = 42 + Math.random() * 20;
  const c = 41 + Math.random() * 20;
  const avg = (a + b + c) / 3;
  const max = Math.max(a, b, c);
  const min = Math.min(a, b, c);
  return {
    time: `${String(i).padStart(2, '0')}:00`,
    phaseA: a.toFixed(1),
    phaseB: b.toFixed(1),
    phaseC: c.toFixed(1),
    avg: avg.toFixed(1),
    maxDiff: (max - min).toFixed(1),
    isAbnormal: a > 75 || b > 75 || c > 75
  };
});

const unbalanceCurveDetailData = Array.from({ length: 24 }, (_, i) => ({
  time: `${String(i).padStart(2, '0')}:00`,
  currentUnbalance: 1 + Math.random() * 5,
  voltageUnbalance: 0.5 + Math.random() * 2,
  powerFactor: 0.9 + Math.random() * 0.1,
}));

const unbalanceDetailList = Array.from({ length: 24 }, (_, i) => {
  const curUnb = 1 + Math.random() * 5;
  const volUnb = 0.5 + Math.random() * 2.5;
  const factor = 0.9 + Math.random() * 0.1;
  const curA = 100 + Math.random() * 50;
  const curB = 100 + Math.random() * 50;
  const curC = 100 + Math.random() * 50;
  const volA = 220 + Math.random() * 10;
  const volB = 220 + Math.random() * 10;
  const volC = 220 + Math.random() * 10;
  return {
    time: `${String(i).padStart(2, '0')}:00`,
    curA: curA.toFixed(1),
    curB: curB.toFixed(1),
    curC: curC.toFixed(1),
    volA: volA.toFixed(1),
    volB: volB.toFixed(1),
    volC: volC.toFixed(1),
    currentUnbalance: curUnb.toFixed(2),
    voltageUnbalance: volUnb.toFixed(2),
    powerFactor: factor.toFixed(3),
    isAbnormal: volUnb > 2.0
  };
});

const stationMgmtList = [
  { id: 1, name: '宁波市海曙区鄞江镇东兴村股...', type: '工商业屋顶', capacity: '635.48', gridType: '自发自用余额上网', payment: '业主自投', address: '浙江省宁波市海曙区鄞江镇东兴村' },
  { id: 2, name: '宁波尚航科技发展有限公司', type: '工商业屋顶', capacity: '202.96', gridType: '自发自用余额上网', payment: '业主自投', address: '浙江省宁波市奉化区莼湖街道' },
  { id: 3, name: '宁波奉化正一齿轮厂', type: '工商业屋顶', capacity: '204.75', gridType: '自发自用余额上网', payment: '业主自投', address: '浙江省宁波市奉化区莼湖街道' },
  { id: 4, name: '宁波奉化区奉拓机电制造有...', type: '工商业屋顶', capacity: '84.15', gridType: '自发自用余额上网', payment: '业主自投', address: '浙江省宁波市奉化区溪口镇' },
  { id: 5, name: '宁波奉化曙光电子有限公司', type: '工商业屋顶', capacity: '133.65', gridType: '自发自用余额上网', payment: '业主自投', address: '浙江省宁波市奉化区瑞峰路' },
  { id: 6, name: '宁波夏达工具有限公司2', type: '工商业屋顶', capacity: '251.10', gridType: '自发自用余额上网', payment: '业主自投', address: '浙江省宁波市奉化区溪口镇' },
  { id: 7, name: '宁波奉化双富轴业有限公司', type: '工商业屋顶', capacity: '87.95', gridType: '自发自用余额上网', payment: '业主自投', address: '浙江省宁波市奉化区西宁路' },
  { id: 8, name: '宁波斯贝尔汽车部件有限公司', type: '工商业屋顶', capacity: '220.00', gridType: '自发自用余额上网', payment: '业主自投', address: '浙江省宁波市海曙区鄞江镇' },
  { id: 9, name: '宁波四联宏达玻璃有限公司', type: '工商业屋顶', capacity: '907.74', gridType: '自发自用余额上网', payment: '业主自投', address: '浙江省宁波市海曙区沿山村' },
  { id: 10, name: '宁波海曙天成装饰厂', type: '工商业屋顶', capacity: '339.76', gridType: '自发自用余额上网', payment: '业主自投', address: '浙江省宁波市海曙区靠近' },
];

const cleanPlanListMock = [
  { id: 1, stationName: '宁波博廷斯电子科技有限公司', person: '鲁杭杰', phone: '15990269019', cycle: '90天', planEndTime: '' },
  { id: 2, stationName: '宁波市海曙鄞江鑫光塑料厂', person: '鲁杭杰', phone: '15990269019', cycle: '75天', planEndTime: '' },
  { id: 3, stationName: '宁波尚航科技发展有限公司', person: '鲁杭杰', phone: '15990269019', cycle: '90天', planEndTime: '2026-12-31' },
  { id: 4, stationName: '宁波奉化正一齿轮厂', person: '鲁杭杰', phone: '15990269019', cycle: '60天', planEndTime: '' },
  { id: 5, stationName: '宁波奉化曙光电子有限公司', person: '鲁杭杰', phone: '15990269019', cycle: '90天', planEndTime: '' },
  { id: 6, stationName: '宁波夏达工具有限公司2', person: '鲁杭杰', phone: '15990269019', cycle: '75天', planEndTime: '' },
  { id: 7, stationName: '宁波四联宏达玻璃有限公司', person: '鲁杭杰', phone: '15990269019', cycle: '90天', planEndTime: '' },
];

const cleanTaskListMock = [
  { id: 1, stationName: '宁波博廷斯电子科技有限公司', person: '鲁杭杰', phone: '15990269019', status: '未填写', startTime: '2026-03-13 00:00:00', endTime: '2026-06-11 00:00:00' },
  { id: 2, stationName: '宁波市海曙鄞江鑫光塑料厂', person: '鲁杭杰', phone: '15990269019', status: '未填写', startTime: '2026-03-13 00:00:00', endTime: '2026-05-27 00:00:00' },
  { id: 3, stationName: '宁波市汇瑞出口有限公司', person: '鲁杭杰', phone: '15990269019', status: '未填写', startTime: '2026-03-13 00:00:00', endTime: '2026-05-26 00:00:00' },
  { id: 4, stationName: '宁波市华仁设备磁材切片厂', person: '鲁杭杰', phone: '15990269019', status: '未填写', startTime: '2026-03-12 00:00:00', endTime: '2026-05-26 00:00:00' },
  { id: 5, stationName: '宁波恒通工贸有限公司', person: '鲁杭杰', phone: '15990269019', status: '未填写', startTime: '2026-03-12 00:00:00', endTime: '2026-05-26 00:00:00' },
  { id: 6, stationName: '宁波华化兴双机框生产线', person: '鲁杭杰', phone: '15990269019', status: '已填写', startTime: '2026-03-12 00:00:00', endTime: '2026-05-26 00:00:00' },
];

const cleanRecordListMock = [
  { id: 1, stationName: '宁波奉化兴发机械配件厂', cleanTime: '2026-03-12', person: '鲁杭杰', cleanPersonnel: ['顾佳兴', '周焱'] },
  { id: 2, stationName: '宁波市千虹服饰有限公司', cleanTime: '2026-03-12', person: '鲁杭杰', cleanPersonnel: ['鲁杭杰'] },
  { id: 3, stationName: '宁波博廷斯电子科技有限公司', cleanTime: '2026-03-11', person: '鲁杭杰', cleanPersonnel: ['顾佳兴'] },
  { id: 4, stationName: '宁波市海曙鄞江鑫光塑料厂', cleanTime: '2026-03-11', person: '鲁杭杰', cleanPersonnel: ['周焱', '鲁杭杰'] },
  { id: 5, stationName: '宁波尚航科技发展有限公司', cleanTime: '', person: '鲁杭杰', cleanPersonnel: [] },
  { id: 6, stationName: '宁波奉化正一齿轮厂', cleanTime: '2026-03-10', person: '鲁杭杰', cleanPersonnel: ['顾佳兴'] },
  { id: 7, stationName: '宁波奉化曙光电子有限公司', cleanTime: '2026-03-10', person: '鲁杭杰', cleanPersonnel: ['15990269019'] },
  { id: 8, stationName: '宁波夏达工具有限公司2', cleanTime: '2026-03-09', person: '鲁杭杰', cleanPersonnel: ['周焱'] },
  { id: 9, stationName: '宁波四联宏达玻璃有限公司', cleanTime: '2026-03-09', person: '鲁杭杰', cleanPersonnel: ['鲁杭杰', '顾佳兴'] },
  { id: 10, stationName: '宁波恒通工贸有限公司', cleanTime: '2026-03-08', person: '鲁杭杰', cleanPersonnel: ['周焱'] },
];

// --- Components ---

const SidebarItem = ({ icon: Icon, label, active, onClick, hasSubmenu }: { icon: any, label: string, active?: boolean, onClick?: () => void, hasSubmenu?: boolean }) => (
  <div 
    onClick={onClick}
    className={cn(
      "flex items-center justify-between px-4 py-3 cursor-pointer transition-colors group",
      active ? "bg-blue-600 text-white" : "text-blue-100 hover:bg-blue-700/50"
    )}
  >
    <div className="flex items-center gap-3">
      <Icon size={20} className={cn(active ? "text-white" : "text-blue-300 group-hover:text-white")} />
      <span className="text-sm font-medium">{label}</span>
    </div>
    {hasSubmenu && <ChevronDown size={14} className={cn(active ? "text-white" : "text-blue-400")} />}
  </div>
);

const Card = ({ title, children, className, extra }: { title: string, children: React.ReactNode, className?: string, extra?: React.ReactNode }) => (
  <div className={cn("bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden flex flex-col", className)}>
    <div className="px-4 py-3 border-bottom border-gray-50 flex items-center justify-between bg-gray-50/30">
      <h3 className="text-sm font-bold text-gray-700 flex items-center gap-2">
        <div className="w-1 h-4 bg-blue-500 rounded-full" />
        {title}
      </h3>
      {extra}
    </div>
    <div className="p-4 flex-1">
      {children}
    </div>
  </div>
);

const StatItem = ({ label, value, unit, icon: Icon, color }: { label: string, value: string | number, unit?: string, icon: any, color: string }) => (
  <div className="flex flex-col items-center justify-center p-4 border border-dashed border-gray-200 rounded-lg bg-gray-50/50">
    <div className={cn("p-2 rounded-lg mb-2", color)}>
      <Icon size={20} className="text-white" />
    </div>
    <div className="text-xs text-gray-500 mb-1">{label}</div>
    <div className="flex items-baseline gap-1">
      <span className="text-lg font-bold text-gray-800">{value}</span>
      {unit && <span className="text-[10px] text-gray-400">{unit}</span>}
    </div>
  </div>
);

// --- Main App ---

export default function App() {
  const [activeTab, setActiveTab] = React.useState<Tab>('ops');
  const [activeMenu, setActiveMenu] = React.useState<MenuId>('clean-plan');
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);
  const [expandedMenus, setExpandedMenus] = React.useState<string[]>(['smart-ops', 'comprehensive-mgmt']);
  const [isAlarmModalOpen, setIsAlarmModalOpen] = React.useState(false);
  const [isAlarmDetailModalOpen, setIsAlarmDetailModalOpen] = React.useState(false);
  const [isOpLogModalOpen, setIsOpLogModalOpen] = React.useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = React.useState(false);
  const [password, setPassword] = React.useState('');
  const [pendingAction, setPendingAction] = React.useState<string | null>(null);
  const [selectedAlarm, setSelectedAlarm] = React.useState<any>(null);
  const [selectedStationId, setSelectedStationId] = React.useState<number>(stations[0].id);
  const selectedStation = stations.find((s) => s.id === selectedStationId) ?? stations[0];
  const [deviceTab, setDeviceTab] = React.useState<'inverter' | 'meter' | 'camera' | 'temp'>('temp');
  const [stationDevices, setStationDevices] = React.useState({
    inverter: [] as { id: number; name: string; sn: string }[],
    meter: [] as { id: number; name: string; sn: string }[],
    camera: [] as { id: number; name: string; sn: string }[],
    temp: [
      { id: 1, name: '并网柜1', sn: '868734070640284', accessDevices: ['并网柜测温', '上网表'] },
      { id: 2, name: '并网柜2', sn: '868734070640284', accessDevices: ['并网柜测温', '发电表'] },
    ],
  });
  const [isDeviceModalOpen, setIsDeviceModalOpen] = React.useState(false);
  const [editingDevice, setEditingDevice] = React.useState<any>(null);
  const [deviceFormData, setDeviceFormData] = React.useState<any>({});
  const toggleAccessDevice = (key: string) => {
    setDeviceFormData((prev: any) => ({
      ...prev,
      accessDevices: prev.accessDevices?.includes(key)
        ? (prev.accessDevices as string[]).filter((k: string) => k !== key)
        : [...(prev.accessDevices || []), key],
    }));
  };
  const setIncomingOutgoingLines = (field: 'incomingLines' | 'outgoingLines', value: number) => {
    const n = Math.max(1, Math.min(20, Number(value) || 1));
    setDeviceFormData((prev: any) => {
      const arr = field === 'incomingLines' ? prev.incomingTempChannels : prev.outgoingTempChannels;
      const currentLen = arr?.length || 1;
      const emptyRow = () => ({ pt100Index: 0, a: 1, b: 2, c: 3 });
      let newArr = arr ? [...arr] : [emptyRow()];
      if (n > currentLen) {
        for (let i = currentLen; i < n; i++) newArr.push(emptyRow());
      } else if (n < currentLen) {
        newArr = newArr.slice(0, n);
      }
      return { ...prev, [field]: n, [field === 'incomingLines' ? 'incomingTempChannels' : 'outgoingTempChannels']: newArr };
    });
  };
  const [alarmConfigs, setAlarmConfigs] = React.useState([
    { id: 1, station: '宁波海曙光伏电站', point: '并网柜温度', content: '并网柜温度过高告警', condition: '温度 > 75℃', method: '短信, 平台' },
    { id: 2, station: '宁波鄞州光伏电站', point: '电流不平衡率', content: '电流不平衡率超标', condition: '不平衡率 > 15%', method: '平台' },
    { id: 3, station: '宁波江北光伏电站', point: '电压不平衡率', content: '电压不平衡率异常', condition: '不平衡率 > 2%', method: '短信, 平台' },
  ]);
  const [alarmData, setAlarmData] = React.useState([
    { id: 1, station: '宁波海曙光伏电站', point: '并网柜温度', content: '#1逆变器A相温度告警', value: '82.5℃', status: '未处理', time: '2026-03-08 10:15:22', processTime: '-' },
    { id: 2, station: '宁波鄞州光伏电站', point: '电流不平衡率', content: '电流不平衡率超标', value: '18.2%', status: '已处理', time: '2026-03-08 09:30:15', processTime: '2026-03-08 10:00:00' },
    { id: 3, station: '宁波江北光伏电站', point: '电压不平衡率', content: '电压不平衡率异常', value: '2.5%', status: '未处理', time: '2026-03-08 08:45:10', processTime: '-' },
    { id: 4, station: '宁波海曙光伏电站', point: '并网柜温度', content: '#2逆变器B相温度告警', value: '78.1℃', status: '已处理', time: '2026-03-07 22:10:05', processTime: '2026-03-07 23:00:00' },
  ]);
  const [opLogs] = React.useState([
    { id: 1, time: '2026-03-08 10:15:22', action: '远程合闸', operator: '管理员' },
    { id: 2, time: '2026-03-08 09:30:15', action: '远程分闸', operator: '运维人员1' },
    { id: 3, time: '2026-03-07 22:10:05', action: '远程合闸', operator: '管理员' },
  ]);
  const [cleanPlanList, setCleanPlanList] = React.useState(cleanPlanListMock);
  const [selectedCleanPlanIds, setSelectedCleanPlanIds] = React.useState<number[]>([]);
  const [isCleanPlanFormOpen, setIsCleanPlanFormOpen] = React.useState(false);
  const [cleanPlanForm, setCleanPlanForm] = React.useState({
    cycle: 1,
    firstExecTime: '',
    endTimeType: 'never' as 'never' | 'specified',
    endTime: '',
    reminder: '周期结束前',
    totalCount: 1,
    station: '',
    person: '',
    phone: '',
    extraReminder: '',
  });
  const [cleanPlanTaskForm, setCleanPlanTaskForm] = React.useState({
    dirtyLevel: '' as '' | '轻微' | '中等' | '严重',
    pollutant: '' as '' | '积灰' | '鸟粪' | '泥沙' | '油污' | '其他',
    effect: '达标' as '达标' | '未达标',
    effectReason: '',
    componentDamaged: false,
    otherAbnormal: false,
  });
  const [cleanTaskList] = React.useState(cleanTaskListMock);
  const [selectedCleanTaskIds, setSelectedCleanTaskIds] = React.useState<number[]>([]);
  const [isCleanTaskFormOpen, setIsCleanTaskFormOpen] = React.useState(false);
  const [selectedCleanTaskId, setSelectedCleanTaskId] = React.useState<number | null>(null);
  const [cleanTaskFormData, setCleanTaskFormData] = React.useState({
    cleanIndex: undefined as number | undefined,
    dirtyLevel: '' as '' | '轻微' | '中等' | '严重',
    pollutant: '' as '' | '积灰' | '鸟粪' | '泥沙' | '油污' | '其他',
    pollutantOther: '',
    effect: '达标' as '达标' | '未达标',
    effectReason: '',
    componentDamaged: false,
    damageSerial: '',
    damageBlock: '',
    damagePositionArea: '',
    damageType: '' as '' | '玻璃裂纹' | '边框变形' | '背板破损' | '其他',
    damageTypeOther: '',
    damageImages: [] as string[],
    damageSuggestion: '' as '' | '无需处理' | '待更换' | '临时修复' | '其他',
    damageSuggestionOther: '',
    otherAbnormal: false,
    abnormalDesc: '',
    abnormalSerial: '',
    abnormalBlock: '',
    abnormalPositionArea: '',
    abnormalImages: [] as string[],
    abnormalResult: '',
    imagesBefore: [] as string[],
    imagesDuring: [] as string[],
    imagesAfter: [] as string[],
    cleanMethod: '' as '' | '人工' | '高压水枪' | '机器人',
    workDate: '',
    weather: '' as '' | '晴' | '阴' | '多云',
    supervisorSign: '',
    supervisorDate: '',
    acceptorSign: '',
    acceptorDate: '',
  });

  const [cleanRecordList] = React.useState(cleanRecordListMock);
  const [selectedCleanRecordIds, setSelectedCleanRecordIds] = React.useState<number[]>([]);
  const [isCleanRecordDetailOpen, setIsCleanRecordDetailOpen] = React.useState(false);
  const [selectedCleanRecordId, setSelectedCleanRecordId] = React.useState<number | null>(null);

  const cleanRecordDetailMock = {
    dirtyLevel: '严重' as const,
    pollutant: '泥沙' as const,
    pollutantOther: '',
    effect: '达标' as const,
    effectReason: '',
    componentDamaged: false,
    damageSerial: '1',
    damageBlock: '2',
    damagePositionArea: 'A区组件',
    damageType: '玻璃裂纹' as const,
    damageTypeOther: '',
    damageSuggestion: '待更换' as const,
    damageSuggestionOther: '',
    otherAbnormal: false,
    abnormalDesc: '',
    abnormalSerial: '',
    abnormalBlock: '',
    abnormalPositionArea: '',
    abnormalResult: '',
    cleanMethod: '人工' as const,
    workDate: '2026-03-12',
    weather: '晴' as const,
    supervisorDate: '2026-03-12',
    acceptorDate: '2026-03-12',
  };

  const toggleMenu = (menu: string) => {
    setExpandedMenus(prev => 
      prev.includes(menu) ? prev.filter(m => m !== menu) : [...prev, menu]
    );
  };

  const syncMeterRows = (
    count: number,
    prev: { meteringMethod: '正向' | '反向'; ratio: number }[] | undefined,
    legacyRatio: number
  ) => {
    const n = Math.max(1, Math.min(50, count));
    const ratio = Number(legacyRatio) > 0 ? Number(legacyRatio) : 1;
    const list = prev && Array.isArray(prev) ? [...prev] : [];
    const out: { meteringMethod: '正向' | '反向'; ratio: number }[] = [];
    for (let i = 0; i < n; i++) {
      if (list[i] && typeof list[i].ratio === 'number') {
        out.push({
          meteringMethod: list[i].meteringMethod === '反向' ? '反向' : '正向',
          ratio: list[i].ratio,
        });
      } else {
        out.push({ meteringMethod: '正向', ratio: ratio });
      }
    }
    return out;
  };

  const defaultGatewayForm = {
    accessDevices: [] as string[],
    gridMeterCount: 1,
    gridMeters: [{ meteringMethod: '正向' as const, ratio: 1 }],
    genMeterCount: 1,
    genMeters: [{ meteringMethod: '正向' as const, ratio: 1 }],
    pt100Count: 1,
    pt100List: [{ address: '', channels: 4 as 4 | 8 | 16 }] as { address: string; channels: 4 | 8 | 16 }[],
    incomingLines: 1,
    outgoingLines: 1,
    incomingTempChannels: [{ pt100Index: 0, a: 1, b: 2, c: 3 }],
    outgoingTempChannels: [{ pt100Index: 0, a: 1, b: 2, c: 3 }],
  };
  const setPt100Count = (n: number) => {
    const count = Math.max(1, Math.min(20, n));
    setDeviceFormData((prev: any) => {
      const list = prev.pt100List || [{ address: '', channels: 4 }];
      const currentLen = list.length;
      let newList = [...list];
      if (count > currentLen) {
        for (let i = currentLen; i < count; i++) newList.push({ address: '', channels: 4 });
      } else if (count < currentLen) {
        newList = newList.slice(0, count);
      }
      return { ...prev, pt100Count: count, pt100List: newList };
    });
  };
  const handleAddDevice = () => {
    setEditingDevice(null);
    setDeviceFormData({ ...defaultGatewayForm });
    setIsDeviceModalOpen(true);
  };

  const handleEditDevice = (device: any) => {
    setEditingDevice(device);
    const gCount = device.gridMeterCount ?? 1;
    const genCount = device.genMeterCount ?? 1;
    setDeviceFormData({
      ...defaultGatewayForm,
      ...device,
      accessDevices: device.accessDevices || [],
      gridMeters: syncMeterRows(gCount, device.gridMeters, device.gridMeterRatio ?? 1),
      genMeters: syncMeterRows(genCount, device.genMeters, device.genMeterRatio ?? 1),
      pt100List: device.pt100List?.length ? device.pt100List : defaultGatewayForm.pt100List,
      incomingTempChannels: device.incomingTempChannels?.length
        ? device.incomingTempChannels.map((c: any) => ({
            pt100Index: typeof c.pt100Index === 'number' ? c.pt100Index : 0,
            a: c.a ?? 1,
            b: c.b ?? 2,
            c: c.c ?? 3,
          }))
        : defaultGatewayForm.incomingTempChannels,
      outgoingTempChannels: device.outgoingTempChannels?.length
        ? device.outgoingTempChannels.map((c: any) => ({
            pt100Index: typeof c.pt100Index === 'number' ? c.pt100Index : 0,
            a: c.a ?? 1,
            b: c.b ?? 2,
            c: c.c ?? 3,
          }))
        : defaultGatewayForm.outgoingTempChannels,
    });
    setIsDeviceModalOpen(true);
  };

  const handleDeleteDevice = (id: number) => {
    setStationDevices(prev => ({
      ...prev,
      [deviceTab]: prev[deviceTab as keyof typeof stationDevices].filter((d: any) => d.id !== id)
    }));
  };

  const handleSaveDevice = () => {
    if (editingDevice) {
      setStationDevices(prev => ({
        ...prev,
        [deviceTab]: prev[deviceTab as keyof typeof stationDevices].map((d: any) => d.id === editingDevice.id ? { ...d, ...deviceFormData } : d)
      }));
    } else {
      const newId = Math.max(0, ...stationDevices[deviceTab as keyof typeof stationDevices].map((d: any) => d.id)) + 1;
      setStationDevices(prev => ({
        ...prev,
        [deviceTab]: [...prev[deviceTab as keyof typeof stationDevices], { id: newId, ...deviceFormData }]
      }));
    }
    setIsDeviceModalOpen(false);
  };

  return (
    <div className="flex h-screen bg-gray-100 font-sans text-gray-900 overflow-hidden">
      {/* Sidebar */}
      <motion.aside 
        initial={false}
        animate={{ width: isSidebarOpen ? 240 : 0 }}
        className="bg-[#1e3a8a] text-white flex flex-col shadow-xl z-20 relative overflow-hidden"
      >
        <div className="p-4 flex items-center gap-2 border-b border-blue-800/50">
          <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center">
            <Zap size={20} className="text-white" fill="white" />
          </div>
          <span className="font-bold text-lg tracking-tight whitespace-nowrap">光曜智慧运营平台</span>
        </div>

        <div className="flex-1 py-4 overflow-y-auto">
          {activeTab === 'distribution' ? (
            <>
              <SidebarItem 
                icon={Activity} 
                label="配电房数据监控" 
                hasSubmenu 
                onClick={() => toggleMenu('data-monitoring')}
              />
              <AnimatePresence>
                {expandedMenus.includes('data-monitoring') && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden bg-blue-900/30"
                  >
                    <SidebarItem
                      icon={ChevronRight}
                      label="整站监控"
                      active={activeMenu === 'whole-station'}
                      onClick={() => setActiveMenu('whole-station')}
                    />
                    <SidebarItem
                      icon={ChevronRight}
                      label="单站监控"
                      active={activeMenu === 'single-station'}
                      onClick={() => setActiveMenu('single-station')}
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              <SidebarItem 
                icon={Bell} 
                label="告警管理" 
                hasSubmenu 
                onClick={() => toggleMenu('alarm-mgmt')}
              />
              <AnimatePresence>
                {expandedMenus.includes('alarm-mgmt') && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden bg-blue-900/30"
                  >
                    <SidebarItem
                      icon={ChevronRight}
                      label="告警配置"
                      active={activeMenu === 'alarm-config'}
                      onClick={() => setActiveMenu('alarm-config')}
                    />
                    <SidebarItem
                      icon={ChevronRight}
                      label="告警数据"
                      active={activeMenu === 'alarm-data'}
                      onClick={() => setActiveMenu('alarm-data')}
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              <SidebarItem 
                icon={History} 
                label="历史曲线" 
                hasSubmenu 
                onClick={() => toggleMenu('history-curves')}
              />
              <AnimatePresence>
                {expandedMenus.includes('history-curves') && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden bg-blue-900/30"
                  >
                    <SidebarItem
                      icon={ChevronRight}
                      label="并网柜温度曲线"
                      active={activeMenu === 'temp-curve'}
                      onClick={() => setActiveMenu('temp-curve')}
                    />
                    <SidebarItem
                      icon={ChevronRight}
                      label="三相不平衡曲线"
                      active={activeMenu === 'unbalance-curve'}
                      onClick={() => setActiveMenu('unbalance-curve')}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </>
          ) : (
            <>
              <SidebarItem icon={LayoutDashboard} label="大屏" />
              <SidebarItem icon={Globe} label="概览" hasSubmenu />
              <SidebarItem icon={Activity} label="电站监测" hasSubmenu />
              <SidebarItem icon={BarChart3} label="报表" hasSubmenu />
              <SidebarItem 
                icon={ShieldCheck} 
                label="智慧运维" 
                hasSubmenu 
                onClick={() => toggleMenu('smart-ops')}
              />
              <AnimatePresence>
                {expandedMenus.includes('smart-ops') && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden bg-blue-900/30"
                  >
                    <SidebarItem
                      icon={ChevronRight}
                      label="清洗计划"
                      active={activeMenu === 'clean-plan'}
                      onClick={() => setActiveMenu('clean-plan')}
                    />
                    <SidebarItem
                      icon={ChevronRight}
                      label="清洗任务"
                      active={activeMenu === 'clean-task'}
                      onClick={() => setActiveMenu('clean-task')}
                    />
                    <SidebarItem
                      icon={ChevronRight}
                      label="清洗记录"
                      active={activeMenu === 'clean-record'}
                      onClick={() => setActiveMenu('clean-record')}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
              <SidebarItem 
                icon={Settings} 
                label="综合管理" 
                hasSubmenu 
                onClick={() => toggleMenu('comprehensive-mgmt')}
              />
              <AnimatePresence>
                {expandedMenus.includes('comprehensive-mgmt') && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden bg-blue-900/30"
                  >
                    <SidebarItem
                      icon={ChevronRight}
                      label="电站管理"
                      active={activeMenu === 'station-mgmt' || activeMenu === 'device-mgmt'}
                      onClick={() => setActiveMenu('station-mgmt')}
                    />
                    <SidebarItem icon={ChevronRight} label="角色管理" />
                    <SidebarItem icon={ChevronRight} label="人员管理" />
                    <SidebarItem icon={ChevronRight} label="业主管理" />
                  </motion.div>
                )}
              </AnimatePresence>
            </>
          )}
        </div>

        <div className="p-4 border-t border-blue-800/50 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-blue-400 flex items-center justify-center text-xs font-bold">JD</div>
            <span className="text-sm">管理员</span>
          </div>
          <Menu size={18} className="cursor-pointer text-blue-300 hover:text-white" onClick={() => setIsSidebarOpen(!isSidebarOpen)} />
        </div>
      </motion.aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-14 bg-white border-b border-gray-200 flex items-center justify-between px-4 z-10">
          <div className="flex items-center gap-4">
            <Menu 
              size={20} 
              className="cursor-pointer text-gray-500 hover:text-blue-600" 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)} 
            />
            <div className="flex items-center bg-gray-100 rounded-md p-1">
              <button 
                onClick={() => setActiveTab('station')}
                className={cn(
                  "px-4 py-1.5 text-sm font-medium rounded transition-all",
                  activeTab === 'station' ? "bg-blue-600 text-white shadow-sm" : "text-gray-500 hover:text-gray-700"
                )}
              >
                电站运维
              </button>
              <button 
                onClick={() => setActiveTab('distribution')}
                className={cn(
                  "px-4 py-1.5 text-sm font-medium rounded transition-all",
                  activeTab === 'distribution' ? "bg-blue-600 text-white shadow-sm" : "text-gray-500 hover:text-gray-700"
                )}
              >
                配电房监测
              </button>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Moon size={18} className="text-gray-500 cursor-pointer" />
            <Globe size={18} className="text-gray-500 cursor-pointer" />
            <Maximize2 size={18} className="text-gray-500 cursor-pointer" />
            <div className="relative">
              <Bell size={18} className="text-gray-500 cursor-pointer" />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </div>
            <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden border border-gray-300">
              <img src="https://picsum.photos/seed/user/100/100" alt="Avatar" referrerPolicy="no-referrer" />
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto p-4 space-y-4">
          {/* Breadcrumb / Tabs */}
          <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
            <LayoutDashboard size={14} />
            <span>首页</span>
            <ChevronRight size={12} />
            {activeTab === 'distribution' ? (
              <>
                <span>配电房监测</span>
                <ChevronRight size={12} />
                <span className="bg-blue-50 text-blue-600 font-medium px-2 py-1 rounded">
                  {activeMenu === 'single-station' ? '单站监控' : 
                   activeMenu === 'whole-station' ? '整站监控' :
                   activeMenu === 'alarm-config' ? '告警配置' :
                   activeMenu === 'alarm-data' ? '告警数据' :
                   activeMenu === 'temp-curve' ? '并网柜温度曲线' : '三相不平衡曲线'}
                </span>
              </>
            ) : (
              <>
                <span>电站运维</span>
                <ChevronRight size={12} />
                <span className="bg-blue-50 text-blue-600 font-medium px-2 py-1 rounded">
                  {activeMenu === 'station-mgmt' ? '电站管理' : 
                   activeMenu === 'device-mgmt' ? '设备管理' :
                   activeMenu === 'clean-plan' ? '清洗计划' :
                   activeMenu === 'clean-task' ? '清洗任务' :
                   activeMenu === 'clean-record' ? '清洗记录' : '电站概览'}
                </span>
              </>
            )}
          </div>

          {activeTab === 'distribution' ? (
            activeMenu === 'single-station' ? (
              <div className="space-y-4">
              {/* 实时数据概览 - 一目了然 */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center flex-shrink-0">
                    <Thermometer size={24} className="text-orange-600" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[11px] text-gray-400 uppercase tracking-wider font-medium">最高温</div>
                    <div className="text-xl font-bold font-mono text-orange-600">51.6 °C</div>
                  </div>
                </div>
                <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center flex-shrink-0">
                    <Activity size={24} className="text-amber-600" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[11px] text-gray-400 uppercase tracking-wider font-medium">电流不平衡率</div>
                    <div className="text-xl font-bold font-mono text-amber-600">1.2%</div>
                  </div>
                </div>
                <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center flex-shrink-0">
                    <Gauge size={24} className="text-orange-600" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[11px] text-gray-400 uppercase tracking-wider font-medium">电压不平衡率</div>
                    <div className="text-xl font-bold font-mono text-orange-600">0.5%</div>
                  </div>
                </div>
                <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center flex-shrink-0">
                    <Activity size={24} className="text-slate-600" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[11px] text-gray-400 uppercase tracking-wider font-medium">功率因素</div>
                    <div className="text-xl font-bold font-mono text-gray-800">0.985</div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-12 gap-4">
              {/* Overview Card */}
              <Card title="配电房概况" className="col-span-12 lg:col-span-4">
                <div className="space-y-4">
                  <div className="flex flex-col gap-1.5 mb-4">
                    <span className="text-xs text-gray-400">电站名称：</span>
                    <select
                      value={selectedStationId}
                      onChange={(e) => setSelectedStationId(Number(e.target.value))}
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 cursor-pointer"
                    >
                      {stations.map((s) => (
                        <option key={s.id} value={s.id}>
                          {s.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <StatItem label="当前状态" value={selectedStation.status === 'normal' ? '正常' : selectedStation.status === 'alarm' ? '异常' : '离线'} unit="" icon={Activity} color={selectedStation.status === 'normal' ? 'bg-green-500' : selectedStation.status === 'alarm' ? 'bg-amber-500' : 'bg-gray-400'} />
                    <StatItem label="当前功率" value={String(selectedStation.power)} unit="kW" icon={Zap} color="bg-cyan-500" />
                  </div>
                </div>
              </Card>

              {/* Temperature Monitoring */}
              <Card title="并网柜测温监控" className="col-span-12 lg:col-span-8" extra={<span className="text-[10px] text-gray-400">更新时间: 2026-03-08 11:16:37</span>}>
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                  {[1, 2, 3, 4, 5].map((inv) => (
                    <div key={inv} className="p-3 border border-gray-100 rounded-lg bg-gray-50/30">
                      <div className="text-xs font-bold text-gray-600 mb-3 flex items-center gap-1">
                        <Thermometer size={14} className="text-red-500" />
                        {inv === 5 ? '出线温度' : `#${inv} 进线温度`}
                      </div>
                      <div className="space-y-2">
                        {['A', 'B', 'C'].map((phase) => (
                          <div key={phase} className="flex items-center justify-between">
                            <span className="text-[10px] text-gray-400">{phase}相电缆</span>
                            <span className={cn(
                              "text-sm font-mono font-bold",
                              inv === 2 && phase === 'B' ? "text-red-500" : "text-emerald-600"
                            )}>
                              {(45 + Math.random() * 10).toFixed(1)}℃
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 p-3 bg-blue-50/50 rounded-lg border border-blue-100 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Bell size={16} className="text-blue-500" />
                    <span className="text-xs text-blue-700 font-medium">报警配置：电缆温度超过 75℃ 时自动预警</span>
                  </div>
                  <button className="text-[10px] text-blue-600 font-bold hover:underline">去配置</button>
                </div>
              </Card>

              {/* Meter Data & Three-phase Unbalance - 全宽 */}
              <Card title="三相不平衡数据" className="col-span-12">
                <div className="overflow-x-auto">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="bg-gray-50 text-gray-500">
                        <th className="px-4 py-2 text-left font-medium">参数类型</th>
                        <th className="px-4 py-2 text-left font-medium">A相</th>
                        <th className="px-4 py-2 text-left font-medium">B相</th>
                        <th className="px-4 py-2 text-left font-medium">C相</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      <tr>
                        <td className="px-4 py-3 text-gray-600 font-medium">电压 (V)</td>
                        <td className="px-4 py-3 font-mono">231.2</td>
                        <td className="px-4 py-3 font-mono">229.8</td>
                        <td className="px-4 py-3 font-mono">230.5</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 text-gray-600 font-medium">电流 (A)</td>
                        <td className="px-4 py-3 font-mono">125.4</td>
                        <td className="px-4 py-3 font-mono">122.1</td>
                        <td className="px-4 py-3 font-mono">124.8</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 text-gray-600 font-medium">有功功率 (kW)</td>
                        <td className="px-4 py-3 font-mono">28.5</td>
                        <td className="px-4 py-3 font-mono">27.8</td>
                        <td className="px-4 py-3 font-mono">28.2</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </Card>
              </div>
            </div>
          ) : activeMenu === 'whole-station' ? (
            <div className="space-y-4">
              {/* Global Stats Bar */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                    <Globe size={24} />
                  </div>
                  <div>
                    <div className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">电站总规模</div>
                    <div className="text-xl font-bold text-gray-800">128 <span className="text-xs font-normal text-gray-400">个 / 85.4MWp</span></div>
                  </div>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600">
                    <Zap size={24} />
                  </div>
                  <div>
                    <div className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">实时总功率</div>
                    <div className="text-xl font-bold text-gray-800">42.8 <span className="text-xs font-normal text-gray-400">MW</span></div>
                  </div>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-center overflow-hidden">
                  <div className="text-[10px] text-gray-400 uppercase font-bold tracking-wider mb-1">告警动态</div>
                  <div className="h-8 overflow-hidden relative">
                    <motion.div 
                      animate={{ y: [0, -32, -64, -96, -128, 0] }}
                      transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                      className="space-y-2"
                    >
                      {[
                        '杭州中兴工业园#2逆变器温度过高',
                        '宁波北仑港务局三相不平衡率超标',
                        '嘉兴海宁皮革城1号站通讯中断',
                        '湖州长兴产业园功率因素偏低',
                        '绍兴柯桥纺织城主断路器脱扣'
                      ].map((msg, i) => (
                        <div key={i} className="text-xs text-red-500 font-medium truncate flex items-center gap-1 h-6">
                          <div className="w-1 h-1 rounded-full bg-red-500 animate-pulse" />
                          {msg}
                        </div>
                      ))}
                    </motion.div>
                  </div>
                </div>
              </div>

              {/* Filters & Search */}
              <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-3 rounded-xl shadow-sm border border-gray-100">
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                    <input 
                      type="text" 
                      placeholder="搜索电站名称..." 
                      className="pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all w-64"
                    />
                  </div>
                  <div className="flex items-center bg-gray-100 rounded-lg p-1">
                    <button className="px-3 py-1.5 text-xs font-bold bg-white rounded shadow-sm text-blue-600">全部</button>
                    <button className="px-3 py-1.5 text-xs font-medium text-gray-500 hover:text-gray-700">温度异常</button>
                    <button className="px-3 py-1.5 text-xs font-medium text-gray-500 hover:text-gray-700">电流不平衡</button>
                    <button className="px-3 py-1.5 text-xs font-medium text-gray-500 hover:text-gray-700">电压不平衡</button>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-6 w-px bg-gray-200 mx-1"></div>
                  <div className="flex bg-gray-100 rounded-lg p-1">
                    <button className="p-1.5 bg-white rounded shadow-sm text-blue-600"><LayoutDashboard size={16} /></button>
                    <button className="p-1.5 text-gray-400"><Menu size={16} /></button>
                  </div>
                </div>
              </div>

              {/* Station Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {stations.map((station) => (
                  <motion.div 
                    key={station.id}
                    whileHover={{ y: -4 }}
                    className={cn(
                      "bg-white rounded-2xl p-5 shadow-sm border transition-all cursor-pointer group relative overflow-hidden",
                      station.status === 'alarm' ? "border-red-100 bg-red-50/10" : "border-gray-100 hover:border-blue-200"
                    )}
                    onClick={() => {
                      setActiveMenu('single-station');
                    }}
                  >
                    {station.status === 'alarm' && (
                      <div className="absolute top-0 right-0 w-16 h-16">
                        <div className="absolute transform rotate-45 bg-red-500 text-white text-[8px] font-bold py-1 px-10 right-[-35px] top-[10px] shadow-sm">
                          异常
                        </div>
                      </div>
                    )}

                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h4 className="font-bold text-gray-800 group-hover:text-blue-600 transition-colors">{station.name}</h4>
                        <span className="text-[10px] text-gray-400 mt-1 inline-block px-2 py-0.5 bg-gray-100 rounded-full">{station.type}</span>
                      </div>
                      <div className={cn(
                        "w-8 h-8 rounded-full flex items-center justify-center",
                        station.status === 'normal' ? "bg-emerald-50 text-emerald-500" : 
                        station.status === 'alarm' ? "bg-red-50 text-red-500 animate-pulse" : "bg-gray-100 text-gray-400"
                      )}>
                        {station.status === 'normal' ? <CheckCircle2 size={18} /> : 
                         station.status === 'alarm' ? <AlertTriangle size={18} /> : <Power size={18} />}
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-2 mb-6">
                      <div className="flex flex-col items-center p-2 rounded-xl bg-gray-50/50 border border-gray-100">
                        <Thermometer size={14} className={cn(station.maxTemp > 75 ? "text-red-500" : "text-blue-400")} />
                        <span className="text-[10px] text-gray-400 mt-1">最高温</span>
                        <span className={cn("text-xs font-bold font-mono", station.maxTemp > 75 ? "text-red-500" : "text-gray-700")}>{station.maxTemp}℃</span>
                      </div>
                      <div className="flex flex-col items-center p-2 rounded-xl bg-gray-50/50 border border-gray-100">
                        <Gauge size={14} className={station.currentUnbalance > 15 ? "text-orange-500" : "text-blue-400"} />
                        <span className="text-[10px] text-gray-400 mt-1">电流不平衡</span>
                        <span className={cn("text-xs font-bold font-mono", station.currentUnbalance > 15 ? "text-orange-500" : "text-gray-700")}>{station.currentUnbalance}%</span>
                      </div>
                      <div className="flex flex-col items-center p-2 rounded-xl bg-gray-50/50 border border-gray-100">
                        <Gauge size={14} className={station.voltageUnbalance > 2 ? "text-orange-500" : "text-blue-400"} />
                        <span className="text-[10px] text-gray-400 mt-1">电压不平衡</span>
                        <span className={cn("text-xs font-bold font-mono", station.voltageUnbalance > 2 ? "text-orange-500" : "text-gray-700")}>{station.voltageUnbalance}%</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                      <div className="flex flex-col">
                        <span className="text-[10px] text-gray-400">当前功率</span>
                        <span className="text-sm font-bold text-blue-600 font-mono">{station.power} kW</span>
                      </div>
                      <div className="flex flex-col items-end">
                        <span className="text-[10px] text-gray-400">当日发电</span>
                        <span className="text-sm font-bold text-emerald-600 font-mono">{station.energy} kWh</span>
                      </div>
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
                  </motion.div>
                ))}
              </div>

              {/* Bottom Analytics */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <Card title="温升分布直方图" extra={<span className="text-[10px] text-gray-400">识别系统性发热风险</span>}>
                  <div className="h-[200px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={tempDistribution}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                        <XAxis dataKey="range" fontSize={10} tickLine={false} axisLine={false} />
                        <YAxis fontSize={10} tickLine={false} axisLine={false} />
                        <Tooltip 
                          cursor={{ fill: '#f8fafc' }}
                          contentStyle={{ fontSize: '10px', borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                        />
                        <Bar dataKey="count" name="电站数量" radius={[4, 4, 0, 0]}>
                          {tempDistribution.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={index === 3 ? '#ef4444' : '#3b82f6'} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </Card>
                <Card title="三相电流不平衡排行榜 (Top 5)" extra={<span className="text-[10px] text-gray-400">指导运维精准排查</span>}>
                  <div className="h-[200px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={unbalanceRanking} layout="vertical" margin={{ left: 40 }}>
                        <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f0f0f0" />
                        <XAxis type="number" fontSize={10} tickLine={false} axisLine={false} />
                        <YAxis dataKey="name" type="category" fontSize={10} tickLine={false} axisLine={false} width={80} />
                        <Tooltip 
                          cursor={{ fill: '#f8fafc' }}
                          contentStyle={{ fontSize: '10px', borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                        />
                        <Bar dataKey="value" name="不平衡率 (%)" fill="#f59e0b" radius={[0, 4, 4, 0]} barSize={12} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </Card>
              </div>
            </div>
          ) : activeMenu === 'temp-curve' ? (
            <div className="space-y-4">
              {/* Filter Area */}
              <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-500">选择日期:</span>
                  <input type="date" defaultValue="2026-03-08" className="text-xs border border-gray-200 rounded px-2 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500/20" />
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-500">线缆筛选:</span>
                  <select className="text-xs border border-gray-200 rounded px-2 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500/20">
                    <option>#1 进线</option>
                    <option>#2 进线</option>
                    <option>#3 进线</option>
                    <option>#4 进线</option>
                    <option>#5 进线</option>
                    <option>出线</option>
                  </select>
                </div>
                <div className="flex items-center gap-4 ml-2">
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input type="checkbox" defaultChecked className="w-3.5 h-3.5 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                    <span className="text-xs text-gray-600">A相</span>
                  </label>
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input type="checkbox" defaultChecked className="w-3.5 h-3.5 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                    <span className="text-xs text-gray-600">B相</span>
                  </label>
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input type="checkbox" defaultChecked className="w-3.5 h-3.5 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                    <span className="text-xs text-gray-600">C相</span>
                  </label>
                </div>
                <button className="ml-auto px-4 py-1.5 bg-blue-600 text-white text-xs font-bold rounded hover:bg-blue-700 transition-colors">查询</button>
              </div>

              {/* Chart Area */}
              <Card title="并网柜线缆温升趋势图" extra={<div className="flex items-center gap-2 text-[10px] text-gray-400"><div className="w-2 h-2 rounded-full bg-red-500" /> 告警阈值: 75℃</div>}>
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={tempCurveDetailData}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                      <XAxis dataKey="time" fontSize={10} tickLine={false} axisLine={false} />
                      <YAxis fontSize={10} tickLine={false} axisLine={false} unit="℃" />
                      <Tooltip 
                        contentStyle={{ fontSize: '10px', borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                      />
                      <Legend iconType="circle" wrapperStyle={{ fontSize: '10px', paddingTop: '20px' }} />
                      <Line type="monotone" dataKey="phaseA" name="A相温度" stroke="#f59e0b" strokeWidth={2} dot={false} />
                      <Line type="monotone" dataKey="phaseB" name="B相温度" stroke="#10b981" strokeWidth={2} dot={false} />
                      <Line type="monotone" dataKey="phaseC" name="C相温度" stroke="#ef4444" strokeWidth={2} dot={false} />
                      {/* Threshold Line */}
                      <Line type="monotone" dataKey={() => 75} stroke="#ff0000" strokeDasharray="5 5" strokeWidth={1} dot={false} name="告警阈值" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </Card>

              {/* Data Detail List */}
              <Card 
                title="数据明细报表" 
                extra={
                  <div className="flex items-center gap-2">
                    <button className="px-3 py-1 bg-gray-100 text-gray-600 text-[10px] font-bold rounded hover:bg-gray-200 transition-colors">导出 Excel</button>
                    <button className="px-3 py-1 bg-gray-100 text-gray-600 text-[10px] font-bold rounded hover:bg-gray-200 transition-colors">导出 CSV</button>
                  </div>
                }
              >
                <div className="overflow-x-auto">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="bg-gray-50 text-gray-500">
                        <th className="px-4 py-3 text-left font-medium">时间点</th>
                        <th className="px-4 py-3 text-left font-medium">A相温度 (℃)</th>
                        <th className="px-4 py-3 text-left font-medium">B相温度 (℃)</th>
                        <th className="px-4 py-3 text-left font-medium">C相温度 (℃)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {tempDetailList.map((row, idx) => (
                        <tr key={idx} className={cn("hover:bg-gray-50/50 transition-colors", row.isAbnormal && "bg-red-50/50")}>
                          <td className="px-4 py-3 font-mono text-gray-500">{row.time}</td>
                          <td className={cn("px-4 py-3 font-mono font-bold", parseFloat(row.phaseA) > 75 ? "text-red-500" : "text-gray-700")}>{row.phaseA}</td>
                          <td className={cn("px-4 py-3 font-mono font-bold", parseFloat(row.phaseB) > 75 ? "text-red-500" : "text-gray-700")}>{row.phaseB}</td>
                          <td className={cn("px-4 py-3 font-mono font-bold", parseFloat(row.phaseC) > 75 ? "text-red-500" : "text-gray-700")}>{row.phaseC}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            </div>
          ) : activeMenu === 'unbalance-curve' ? (
            <div className="space-y-4">
              {/* Filter Area */}
              <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-500">查询日期:</span>
                  <input type="date" defaultValue="2026-03-08" className="text-xs border border-gray-200 rounded px-2 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500/20" />
                </div>
                <div className="flex items-center gap-4 ml-2">
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input type="checkbox" defaultChecked className="w-3.5 h-3.5 rounded border-gray-300 text-red-600 focus:ring-red-500" />
                    <span className="text-xs text-gray-600">电流不平衡率</span>
                  </label>
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input type="checkbox" defaultChecked className="w-3.5 h-3.5 rounded border-gray-300 text-orange-600 focus:ring-orange-500" />
                    <span className="text-xs text-gray-600">电压不平衡率</span>
                  </label>
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input type="checkbox" defaultChecked className="w-3.5 h-3.5 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                    <span className="text-xs text-gray-600">功率因数</span>
                  </label>
                </div>
                <div className="ml-auto">
                  <button className="px-4 py-1.5 bg-blue-600 text-white text-xs font-bold rounded hover:bg-blue-700 transition-colors">查询</button>
                </div>
              </div>

              {/* Chart Area */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <Card title="电流不平衡趋势图" extra={<div className="text-[10px] text-gray-400">阈值: 15%</div>}>
                  <div className="h-[250px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={unbalanceCurveDetailData}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                        <XAxis dataKey="time" fontSize={10} tickLine={false} axisLine={false} />
                        <YAxis fontSize={10} tickLine={false} axisLine={false} unit="%" />
                        <Tooltip contentStyle={{ fontSize: '10px', borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                        <Line type="monotone" dataKey="currentUnbalance" name="电流不平衡率" stroke="#ef4444" strokeWidth={2} dot={{ r: 2 }} />
                        <Line type="monotone" dataKey={() => 15} stroke="#ff0000" strokeDasharray="5 5" strokeWidth={1} dot={false} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </Card>
                <Card title="电压不平衡趋势图" extra={<div className="text-[10px] text-gray-400">阈值: 2%</div>}>
                  <div className="h-[250px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={unbalanceCurveDetailData}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                        <XAxis dataKey="time" fontSize={10} tickLine={false} axisLine={false} />
                        <YAxis fontSize={10} tickLine={false} axisLine={false} unit="%" />
                        <Tooltip contentStyle={{ fontSize: '10px', borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                        <Line type="monotone" dataKey="voltageUnbalance" name="电压不平衡率" stroke="#f59e0b" strokeWidth={2} dot={{ r: 2 }} />
                        <Line type="monotone" dataKey={() => 2} stroke="#ff0000" strokeDasharray="5 5" strokeWidth={1} dot={false} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </Card>
                <Card title="功率因素趋势图">
                  <div className="h-[250px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={unbalanceCurveDetailData}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                        <XAxis dataKey="time" fontSize={10} tickLine={false} axisLine={false} />
                        <YAxis fontSize={10} tickLine={false} axisLine={false} domain={[0, 1]} />
                        <Tooltip contentStyle={{ fontSize: '10px', borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                        <Line type="monotone" dataKey="powerFactor" name="功率因数" stroke="#6366f1" strokeWidth={2} dot={false} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </Card>
              </div>

              {/* Data Detail List */}
              <Card 
                title="三相不平衡数据明细" 
                extra={
                  <div className="flex items-center gap-2">
                    <button className="px-3 py-1 bg-gray-100 text-gray-600 text-[10px] font-bold rounded hover:bg-gray-200 transition-colors">导出 Excel</button>
                    <button className="px-3 py-1 bg-gray-100 text-gray-600 text-[10px] font-bold rounded hover:bg-gray-200 transition-colors">导出 CSV</button>
                  </div>
                }
              >
                <div className="overflow-x-auto">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="bg-gray-50 text-gray-500">
                        <th className="px-4 py-3 text-left font-medium">时间点</th>
                        <th className="px-4 py-3 text-left font-medium">A相电流 (A)</th>
                        <th className="px-4 py-3 text-left font-medium">B相电流 (A)</th>
                        <th className="px-4 py-3 text-left font-medium">C相电流 (A)</th>
                        <th className="px-4 py-3 text-left font-medium">A相电压 (V)</th>
                        <th className="px-4 py-3 text-left font-medium">B相电压 (V)</th>
                        <th className="px-4 py-3 text-left font-medium">C相电压 (V)</th>
                        <th className="px-4 py-3 text-left font-medium">电流不平衡率 (%)</th>
                        <th className="px-4 py-3 text-left font-medium">电压不平衡率 (%)</th>
                        <th className="px-4 py-3 text-left font-medium">功率因数</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {unbalanceDetailList.map((row, idx) => (
                        <tr key={idx} className={cn("hover:bg-gray-50/50 transition-colors", row.isAbnormal && "bg-red-50/50")}>
                          <td className="px-4 py-3 font-mono text-gray-500">{row.time}</td>
                          <td className="px-4 py-3 font-mono text-gray-700">{row.curA}</td>
                          <td className="px-4 py-3 font-mono text-gray-700">{row.curB}</td>
                          <td className="px-4 py-3 font-mono text-gray-700">{row.curC}</td>
                          <td className="px-4 py-3 font-mono text-gray-700">{row.volA}</td>
                          <td className="px-4 py-3 font-mono text-gray-700">{row.volB}</td>
                          <td className="px-4 py-3 font-mono text-gray-700">{row.volC}</td>
                          <td className={cn("px-4 py-3 font-mono font-bold", parseFloat(row.currentUnbalance) > 15 ? "text-red-500" : "text-gray-700")}>{row.currentUnbalance}</td>
                          <td className={cn("px-4 py-3 font-mono font-bold", parseFloat(row.voltageUnbalance) > 2.0 ? "text-red-500" : "text-gray-700")}>{row.voltageUnbalance}</td>
                          <td className="px-4 py-3 font-mono text-gray-600">{row.powerFactor}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            </div>
          ) : activeMenu === 'alarm-config' ? (
            <div className="space-y-4">
              {/* Filter Area */}
              <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-500">电站名称:</span>
                  <input type="text" placeholder="电站选择" className="text-xs border border-gray-200 rounded px-3 py-1.5 w-48 focus:outline-none focus:ring-2 focus:ring-blue-500/20" />
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-500">监测点:</span>
                  <select className="text-xs border border-gray-200 rounded px-3 py-1.5 w-48 focus:outline-none focus:ring-2 focus:ring-blue-500/20">
                    <option value="">请选择监测点</option>
                    <option value="temp">并网柜温度</option>
                    <option value="cur_unb">电流不平衡率</option>
                    <option value="vol_unb">电压不平衡率</option>
                  </select>
                </div>
                <div className="flex items-center gap-2 ml-auto">
                  <button className="px-4 py-1.5 bg-blue-600 text-white text-xs font-bold rounded hover:bg-blue-700 transition-colors flex items-center gap-1.5">
                    <Search size={14} /> 查询
                  </button>
                  <button className="px-4 py-1.5 bg-white border border-gray-200 text-gray-600 text-xs font-bold rounded hover:bg-gray-50 transition-colors flex items-center gap-1.5">
                    <RotateCcw size={14} /> 重置
                  </button>
                  <button 
                    onClick={() => setIsAlarmModalOpen(true)}
                    className="px-4 py-1.5 bg-blue-600 text-white text-xs font-bold rounded hover:bg-blue-700 transition-colors flex items-center gap-1.5"
                  >
                    <Plus size={14} /> 新增
                  </button>
                </div>
              </div>

              {/* Table Area */}
              <Card title="告警配置列表">
                <div className="overflow-x-auto">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="bg-gray-50 text-gray-500 border-b border-gray-100">
                        <th className="px-4 py-3 text-left font-medium w-16">序号</th>
                        <th className="px-4 py-3 text-left font-medium">电站名称</th>
                        <th className="px-4 py-3 text-left font-medium">监测点</th>
                        <th className="px-4 py-3 text-left font-medium">告警内容</th>
                        <th className="px-4 py-3 text-left font-medium">触发条件</th>
                        <th className="px-4 py-3 text-left font-medium">告警方式</th>
                        <th className="px-4 py-3 text-left font-medium w-24">操作</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {alarmConfigs.length > 0 ? alarmConfigs.map((config, idx) => (
                        <tr key={config.id} className="hover:bg-gray-50/50 transition-colors">
                          <td className="px-4 py-3 text-gray-500">{idx + 1}</td>
                          <td className="px-4 py-3 text-gray-700 font-medium">{config.station}</td>
                          <td className="px-4 py-3 text-gray-600">{config.point}</td>
                          <td className="px-4 py-3 text-gray-600">{config.content}</td>
                          <td className="px-4 py-3 text-gray-600">{config.condition}</td>
                          <td className="px-4 py-3 text-gray-600">{config.method}</td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-3">
                              <button className="text-blue-600 hover:text-blue-700 font-medium">编辑</button>
                              <button className="text-red-600 hover:text-red-700 font-medium">删除</button>
                            </div>
                          </td>
                        </tr>
                      )) : (
                        <tr>
                          <td colSpan={7} className="px-4 py-12 text-center text-gray-400">
                            <div className="flex flex-col items-center">
                              <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-2">
                                <Search size={24} className="text-gray-200" />
                              </div>
                              <p>暂无数据</p>
                            </div>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
                {/* Pagination Placeholder */}
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-50 text-[10px] text-gray-400">
                  <span>共 {alarmConfigs.length} 条记录</span>
                  <div className="flex items-center gap-1">
                    <button className="w-6 h-6 flex items-center justify-center rounded border border-gray-200 hover:bg-gray-50">1</button>
                  </div>
                </div>
              </Card>
            </div>
          ) : activeMenu === 'alarm-data' ? (
            <div className="space-y-4">
              {/* Filter Area */}
              <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-500">电站名称:</span>
                  <input type="text" placeholder="电站选择" className="text-xs border border-gray-200 rounded px-3 py-1.5 w-40 focus:outline-none focus:ring-2 focus:ring-blue-500/20" />
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-500">状态:</span>
                  <select className="text-xs border border-gray-200 rounded px-3 py-1.5 w-32 focus:outline-none focus:ring-2 focus:ring-blue-500/20">
                    <option value="">请选择状态</option>
                    <option value="untreated">未处理</option>
                    <option value="processed">已处理</option>
                  </select>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-500">告警时间:</span>
                  <div className="flex items-center gap-1">
                    <input type="date" className="text-xs border border-gray-200 rounded px-2 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500/20" />
                    <span className="text-gray-400">至</span>
                    <input type="date" className="text-xs border border-gray-200 rounded px-2 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500/20" />
                  </div>
                </div>
                <div className="flex items-center gap-2 ml-auto">
                  <button className="px-4 py-1.5 bg-blue-600 text-white text-xs font-bold rounded hover:bg-blue-700 transition-colors flex items-center gap-1.5">
                    <Search size={14} /> 查询
                  </button>
                  <button className="px-4 py-1.5 bg-white border border-gray-200 text-gray-600 text-xs font-bold rounded hover:bg-gray-50 transition-colors flex items-center gap-1.5">
                    <RotateCcw size={14} /> 重置
                  </button>
                </div>
              </div>

              {/* Table Area */}
              <Card title="告警数据列表">
                <div className="overflow-x-auto">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="bg-gray-50 text-gray-500 border-b border-gray-100">
                        <th className="px-4 py-3 text-left font-medium w-16">序号</th>
                        <th className="px-4 py-3 text-left font-medium">电站名称</th>
                        <th className="px-4 py-3 text-left font-medium">监测点</th>
                        <th className="px-4 py-3 text-left font-medium">告警内容</th>
                        <th className="px-4 py-3 text-left font-medium">告警值</th>
                        <th className="px-4 py-3 text-left font-medium">状态</th>
                        <th className="px-4 py-3 text-left font-medium">告警时间</th>
                        <th className="px-4 py-3 text-left font-medium w-20">操作</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {alarmData.length > 0 ? alarmData.map((item, idx) => (
                        <tr key={item.id} className="hover:bg-gray-50/50 transition-colors">
                          <td className="px-4 py-3 text-gray-500">{idx + 1}</td>
                          <td className="px-4 py-3 text-gray-700 font-medium">{item.station}</td>
                          <td className="px-4 py-3 text-gray-600">{item.point}</td>
                          <td className="px-4 py-3 text-gray-600">{item.content}</td>
                          <td className="px-4 py-3 text-red-500 font-mono font-bold">{item.value}</td>
                          <td className="px-4 py-3">
                            <span className={cn(
                              "px-2 py-0.5 rounded-full text-[10px] font-medium",
                              item.status === '未处理' ? "bg-red-50 text-red-600 border border-red-100" : "bg-emerald-50 text-emerald-600 border border-emerald-100"
                            )}>
                              {item.status}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-gray-500 font-mono">{item.time}</td>
                          <td className="px-4 py-3">
                            <button 
                              onClick={() => {
                                setSelectedAlarm(item);
                                setIsAlarmDetailModalOpen(true);
                              }}
                              className="text-blue-600 hover:text-blue-700 font-medium"
                            >
                              查看
                            </button>
                          </td>
                        </tr>
                      )) : (
                        <tr>
                          <td colSpan={8} className="px-4 py-12 text-center text-gray-400">
                            <div className="flex flex-col items-center">
                              <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-2">
                                <Search size={24} className="text-gray-200" />
                              </div>
                              <p>暂无数据</p>
                            </div>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
                {/* Pagination Placeholder */}
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-50 text-[10px] text-gray-400">
                  <span>共 {alarmData.length} 条记录</span>
                  <div className="flex items-center gap-1">
                    <button className="w-6 h-6 flex items-center justify-center rounded border border-gray-200 hover:bg-gray-50">1</button>
                  </div>
                </div>
              </Card>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-[60vh] text-gray-400">
              <div className="p-8 bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center">
                <Activity size={48} className="mb-4 text-blue-200" />
                <p className="text-lg font-bold text-gray-700">
                  {activeMenu === 'whole-station' ? '整站监控数据加载中...' : 
                   activeMenu === 'alarm-data' ? '告警历史数据' :
                   '曲线分析模块'}
                </p>
                <p className="text-sm mt-2">该模块正在根据合同要求进行数据对接...</p>
              </div>
            </div>
          )
        ) : activeMenu === 'station-mgmt' ? (
            <div className="space-y-4">
              <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 space-y-4">
                <div className="flex flex-wrap items-center gap-4">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-500 whitespace-nowrap">电站名称/地址</span>
                    <input type="text" placeholder="搜索电站名称/地址" className="text-xs border border-gray-200 rounded px-3 py-2 w-48 focus:outline-none focus:ring-2 focus:ring-blue-500/20" />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-500 whitespace-nowrap">运行状态</span>
                    <select className="text-xs border border-gray-200 rounded px-3 py-2 w-32 focus:outline-none focus:ring-2 focus:ring-blue-500/20">
                      <option>请选择</option>
                      <option>运行中</option>
                      <option>已停止</option>
                    </select>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-500 whitespace-nowrap">并网类型</span>
                    <select className="text-xs border border-gray-200 rounded px-3 py-2 w-32 focus:outline-none focus:ring-2 focus:ring-blue-500/20">
                      <option>请选择</option>
                      <option>自发自用</option>
                      <option>全额上网</option>
                    </select>
                  </div>
                  <div className="flex gap-2 ml-auto">
                    <button className="px-4 py-2 bg-gray-100 text-gray-600 text-xs font-bold rounded hover:bg-gray-200 transition-colors">重置</button>
                    <button className="px-4 py-2 bg-blue-600 text-white text-xs font-bold rounded hover:bg-blue-700 transition-colors flex items-center gap-1">
                      <Search size={14} /> 搜索
                    </button>
                    <button className="px-4 py-2 bg-blue-600 text-white text-xs font-bold rounded hover:bg-blue-700 transition-colors flex items-center gap-1">
                      <Plus size={14} /> 新增电站
                    </button>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-4 border-b border-gray-50 flex items-center justify-between">
                  <div className="flex gap-2">
                    <button className="px-3 py-1.5 border border-gray-200 rounded text-xs font-medium hover:bg-gray-50">导入</button>
                    <button className="px-3 py-1.5 border border-gray-200 rounded text-xs font-medium hover:bg-gray-50">导出</button>
                  </div>
                  <div className="flex gap-2">
                    <button className="p-1.5 text-blue-600 hover:bg-blue-50 rounded"><Search size={18} /></button>
                    <button className="p-1.5 text-gray-400 hover:bg-gray-50 rounded"><RotateCcw size={18} /></button>
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="bg-gray-50 text-gray-500 border-b border-gray-100">
                        <th className="px-4 py-3 text-left font-medium">序号</th>
                        <th className="px-4 py-3 text-left font-medium">电站名称</th>
                        <th className="px-4 py-3 text-left font-medium">电站类型</th>
                        <th className="px-4 py-3 text-left font-medium">组件总容量</th>
                        <th className="px-4 py-3 text-left font-medium">并网类型</th>
                        <th className="px-4 py-3 text-left font-medium">出资方式</th>
                        <th className="px-4 py-3 text-left font-medium">电站地址</th>
                        <th className="px-4 py-3 text-left font-medium">操作</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {stationMgmtList.map((station, idx) => (
                        <tr key={station.id} className="hover:bg-gray-50/50 transition-colors">
                          <td className="px-4 py-3 text-gray-500">{idx + 1}</td>
                          <td className="px-4 py-3 font-medium text-gray-700">{station.name}</td>
                          <td className="px-4 py-3 text-gray-600">{station.type}</td>
                          <td className="px-4 py-3 text-gray-600">{station.capacity}</td>
                          <td className="px-4 py-3 text-gray-600">{station.gridType}</td>
                          <td className="px-4 py-3 text-gray-600">{station.payment}</td>
                          <td className="px-4 py-3 text-gray-600">{station.address}</td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-3">
                              <button className="text-blue-600 hover:underline font-medium">档案</button>
                              <button 
                                onClick={() => setActiveMenu('device-mgmt')}
                                className="text-blue-600 hover:underline font-medium"
                              >
                                设备
                              </button>
                              <button className="text-blue-600 hover:underline font-medium">电价管理</button>
                              <button className="text-red-500 hover:underline font-medium">删除</button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          ) : activeMenu === 'device-mgmt' ? (
            <div className="space-y-4">
              <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-4 bg-blue-500 rounded-full" />
                    <h3 className="font-bold text-gray-800">设备</h3>
                  </div>
                  <button 
                    onClick={() => setActiveMenu('station-mgmt')}
                    className="flex items-center gap-1 text-xs text-gray-500 hover:text-blue-600"
                  >
                    <RotateCcw size={14} /> 返回上一页
                  </button>
                </div>

                <div className="flex border-b border-gray-100 mb-4">
                  {[
                    { id: 'inverter', label: '逆变器' },
                    { id: 'meter', label: '电表' },
                    { id: 'camera', label: '摄像头' },
                    { id: 'temp', label: '并网柜网关' },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setDeviceTab(tab.id as any)}
                      className={cn(
                        "px-6 py-3 text-sm font-medium transition-all relative",
                        deviceTab === tab.id ? "text-blue-600" : "text-gray-500 hover:text-gray-700"
                      )}
                    >
                      {tab.label}
                      {deviceTab === tab.id && (
                        <motion.div layoutId="deviceTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600" />
                      )}
                    </button>
                  ))}
                  <div className="ml-auto flex items-center">
                    <button 
                      onClick={handleAddDevice}
                      className="px-4 py-1.5 bg-white border border-gray-200 text-gray-700 text-xs font-bold rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      添加{
                        deviceTab === 'temp' ? '并网柜网关' : '设备'
                      }
                    </button>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="bg-gray-50 text-gray-500 border-b border-gray-100">
                        <th className="px-4 py-3 text-left font-medium">序号</th>
                        <th className="px-4 py-3 text-left font-medium">{deviceTab === 'temp' ? '网关名称' : '名称'}</th>
                        <th className="px-4 py-3 text-left font-medium">网关SN</th>
                        {deviceTab === 'temp' && <th className="px-4 py-3 text-left font-medium">接入设备</th>}
                        <th className="px-4 py-3 text-left font-medium">操作</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {stationDevices[deviceTab as keyof typeof stationDevices]?.map((device: any, idx: number) => (
                        <tr key={device.id} className="hover:bg-gray-50/50 transition-colors">
                          <td className="px-4 py-3 text-gray-500">{idx + 1}</td>
                          <td className="px-4 py-3 font-medium text-gray-700">{device.name}</td>
                          <td className="px-4 py-3 text-gray-600">{device.sn}</td>
                          {deviceTab === 'temp' && (
                            <td className="px-4 py-3 text-gray-600">
                              {device.accessDevices && Array.isArray(device.accessDevices) && device.accessDevices.length > 0
                                ? device.accessDevices.join('，')
                                : device.type || '-'}
                            </td>
                          )}
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-3">
                              <button 
                                onClick={() => handleEditDevice(device)}
                                className="text-blue-600 hover:underline font-medium"
                              >
                                编辑
                              </button>
                              <button 
                                onClick={() => handleDeleteDevice(device.id)}
                                className="text-red-500 hover:underline font-medium"
                              >
                                删除
                              </button>
                            </div>
                          </td>
                        </tr>
                      )) || (
                        <tr>
                          <td colSpan={5} className="px-4 py-8 text-center text-gray-400 italic">
                            暂无数据，请切换到“并网柜网关”查看演示
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          ) : activeMenu === 'clean-plan' ? (
            isCleanPlanFormOpen ? (
              <div className="space-y-4">
                <div className="flex justify-end">
                  <button type="button" onClick={() => setIsCleanPlanFormOpen(false)} className="text-xs text-gray-500 hover:text-blue-600 flex items-center gap-1">
                    <RotateCcw size={14} /> 返回上一页
                  </button>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                  {/* 左侧：任务编辑（仅展示任务项，选项不在此展示） */}
                  <div className="lg:col-span-1 space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-bold text-gray-700 flex items-center gap-2">
                        <span className="w-1 h-4 bg-blue-500 rounded-full flex-shrink-0" />
                        任务编辑
                      </h4>
                      <button type="button" className="px-3 py-1.5 text-xs font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
                        新增
                      </button>
                    </div>
                    <div className="space-y-4">
                      {/* 1、脏污与效果 */}
                      <div className="rounded-lg p-3 bg-gray-50/80 border border-gray-100">
                        <div className="text-xs font-bold text-gray-700 mb-2">1、脏污与效果</div>
                        <div className="space-y-2">
                          {['脏污程度', '主要污染物', '清洗效果'].map((label) => (
                            <div key={label} className="flex items-center justify-between rounded-md border border-blue-100 bg-white px-3 py-2 shadow-sm">
                              <span className="text-xs text-gray-700">{label}</span>
                              <div className="flex items-center gap-2">
                                <button type="button" className="p-0.5 text-blue-600 hover:text-blue-700" aria-label="确认"><CheckCircle2 size={16} /></button>
                                <button type="button" className="p-0.5 text-blue-600 hover:text-blue-700" aria-label="移除"><X size={16} /></button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      {/* 2、组件破损记录 */}
                      <div className="rounded-lg p-3 bg-gray-50/80 border border-gray-100">
                        <div className="text-xs font-bold text-gray-700 mb-2">2、组件破损记录</div>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between rounded-md border border-blue-100 bg-white px-3 py-2 shadow-sm">
                            <span className="text-xs text-gray-700">组件是否破损</span>
                            <div className="flex items-center gap-2">
                              <button type="button" className="p-0.5 text-blue-600 hover:text-blue-700" aria-label="确认"><CheckCircle2 size={16} /></button>
                              <button type="button" className="p-0.5 text-blue-600 hover:text-blue-700" aria-label="移除"><X size={16} /></button>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* 3、其他异常记录 */}
                      <div className="rounded-lg p-3 bg-gray-50/80 border border-gray-100">
                        <div className="text-xs font-bold text-gray-700 mb-2">3、其他异常记录</div>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between rounded-md border border-blue-100 bg-white px-3 py-2 shadow-sm">
                            <span className="text-xs text-gray-700">是否有其他异常</span>
                            <div className="flex items-center gap-2">
                              <button type="button" className="p-0.5 text-blue-600 hover:text-blue-700" aria-label="确认"><CheckCircle2 size={16} /></button>
                              <button type="button" className="p-0.5 text-blue-600 hover:text-blue-700" aria-label="移除"><X size={16} /></button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-center pt-2">
                      <span className="px-4 py-2 text-xs text-gray-400 bg-gray-100 rounded-lg">没有更多了</span>
                    </div>
                  </div>
                  {/* 右侧：设置循环周期、起止时间 + 其他 */}
                  <div className="lg:col-span-2 space-y-6">
                    <div className="border border-gray-100 rounded-lg p-4">
                      <h4 className="text-xs font-bold text-gray-700 mb-4">设置循环周期、起止时间</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1">
                          <label className="text-xs text-gray-500">循环周期</label>
                          <div className="flex items-center gap-2">
                            <input type="number" min={1} value={cleanPlanForm.cycle} onChange={(e) => setCleanPlanForm((p) => ({ ...p, cycle: Number(e.target.value) || 1 }))} className="text-xs border border-gray-200 rounded px-2 py-1.5 w-20" />
                            <span className="text-xs text-gray-500">循环1次</span>
                          </div>
                        </div>
                        <div className="flex flex-col gap-1">
                          <label className="text-xs text-gray-500">第一次任务执行时间</label>
                          <div className="flex items-center gap-2">
                            <input type="datetime-local" value={cleanPlanForm.firstExecTime} onChange={(e) => setCleanPlanForm((p) => ({ ...p, firstExecTime: e.target.value }))} className="text-xs border border-gray-200 rounded px-2 py-1.5 flex-1" />
                          </div>
                        </div>
                        <div className="flex flex-col gap-1 md:col-span-2">
                          <label className="text-xs text-gray-500">计划结束时间</label>
                          <div className="flex items-center gap-4">
                            <label className="flex items-center gap-1.5 cursor-pointer">
                              <input type="radio" name="endTimeType" checked={cleanPlanForm.endTimeType === 'never'} onChange={() => setCleanPlanForm((p) => ({ ...p, endTimeType: 'never' }))} className="text-blue-600" />
                              <span className="text-xs">永不</span>
                            </label>
                            <label className="flex items-center gap-1.5 cursor-pointer">
                              <input type="radio" name="endTimeType" checked={cleanPlanForm.endTimeType === 'specified'} onChange={() => setCleanPlanForm((p) => ({ ...p, endTimeType: 'specified' }))} className="text-blue-600" />
                              <span className="text-xs">指定时间</span>
                            </label>
                            {cleanPlanForm.endTimeType === 'specified' && (
                              <input type="datetime-local" value={cleanPlanForm.endTime} onChange={(e) => setCleanPlanForm((p) => ({ ...p, endTime: e.target.value }))} className="text-xs border border-gray-200 rounded px-2 py-1.5" />
                            )}
                          </div>
                        </div>
                        <div className="flex flex-col gap-1">
                          <label className="text-xs text-gray-500">提醒时间</label>
                          <div className="flex items-center gap-2">
                            <input type="text" value={cleanPlanForm.reminder} onChange={(e) => setCleanPlanForm((p) => ({ ...p, reminder: e.target.value }))} className="text-xs border border-gray-200 rounded px-2 py-1.5 flex-1" />
                            <span className="text-xs text-gray-500">周期结束前</span>
                          </div>
                        </div>
                        <div className="flex flex-col gap-1">
                          <label className="text-xs text-gray-500">清洗总次数</label>
                          <div className="flex items-center gap-2">
                            <button type="button" onClick={() => setCleanPlanForm((p) => ({ ...p, totalCount: Math.max(1, p.totalCount - 1) }))} className="w-7 h-7 rounded border border-gray-200 text-gray-500 hover:bg-gray-50">-</button>
                            <input type="number" min={1} value={cleanPlanForm.totalCount} onChange={(e) => setCleanPlanForm((p) => ({ ...p, totalCount: Number(e.target.value) || 1 }))} className="text-xs border border-gray-200 rounded px-2 py-1.5 w-16 text-center" />
                            <button type="button" onClick={() => setCleanPlanForm((p) => ({ ...p, totalCount: p.totalCount + 1 }))} className="w-7 h-7 rounded border border-gray-200 text-gray-500 hover:bg-gray-50">+</button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="border border-gray-100 rounded-lg p-4">
                      <h4 className="text-xs font-bold text-gray-700 mb-4">其他</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1">
                          <label className="text-xs text-gray-500">电站选择</label>
                          <input type="text" value={cleanPlanForm.station} onChange={(e) => setCleanPlanForm((p) => ({ ...p, station: e.target.value }))} placeholder="请选择电站" className="text-xs border border-gray-200 rounded px-3 py-2 w-full" />
                        </div>
                        <div className="flex flex-col gap-1">
                          <label className="text-xs text-gray-500">责任人</label>
                          <select value={cleanPlanForm.person} onChange={(e) => setCleanPlanForm((p) => ({ ...p, person: e.target.value }))} className="text-xs border border-gray-200 rounded px-3 py-2 w-full">
                            <option value="">请选择</option>
                            <option value="鲁杭杰">鲁杭杰</option>
                            <option value="管理员">管理员</option>
                          </select>
                        </div>
                        <div className="flex flex-col gap-1">
                          <label className="text-xs text-gray-500">联系电话</label>
                          <input type="text" value={cleanPlanForm.phone} onChange={(e) => setCleanPlanForm((p) => ({ ...p, phone: e.target.value }))} placeholder="请输入联系电话" className="text-xs border border-gray-200 rounded px-3 py-2 w-full" />
                        </div>
                        <div className="flex flex-col gap-1">
                          <label className="text-xs text-gray-500">额外提醒人</label>
                          <select value={cleanPlanForm.extraReminder} onChange={(e) => setCleanPlanForm((p) => ({ ...p, extraReminder: e.target.value }))} className="text-xs border border-gray-200 rounded px-3 py-2 w-full">
                            <option value="">请选择</option>
                            <option value="鲁杭杰">鲁杭杰</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex justify-end gap-3 pt-4">
                  <button type="button" onClick={() => setIsCleanPlanFormOpen(false)} className="px-6 py-2 border border-gray-200 text-gray-600 text-xs font-bold rounded-lg hover:bg-gray-50">取消</button>
                  <button type="button" onClick={() => { setIsCleanPlanFormOpen(false); }} className="px-6 py-2 bg-blue-600 text-white text-xs font-bold rounded-lg hover:bg-blue-700">保存</button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-500 whitespace-nowrap">电站选择:</span>
                    <input type="text" placeholder="电站选择" className="text-xs border border-gray-200 rounded px-3 py-2 w-48 focus:outline-none focus:ring-2 focus:ring-blue-500/20" />
                    <button type="button" className="px-4 py-2 bg-blue-600 text-white text-xs font-bold rounded hover:bg-blue-700">查询</button>
                  </div>
                  <div className="flex items-center gap-2">
                    <button type="button" className="px-4 py-2 border border-gray-200 text-gray-600 text-xs font-bold rounded hover:bg-gray-50">批量删除</button>
                    <button type="button" className="px-4 py-2 border border-gray-200 text-gray-600 text-xs font-bold rounded hover:bg-gray-50">计划导出</button>
                    <button type="button" onClick={() => setIsCleanPlanFormOpen(true)} className="px-4 py-2 bg-blue-600 text-white text-xs font-bold rounded hover:bg-blue-700 flex items-center gap-1">
                      <Plus size={14} /> 新增清洗计划
                    </button>
                    <button type="button" className="p-2 text-gray-500 hover:bg-gray-100 rounded"><RotateCcw size={18} /></button>
                  </div>
                </div>
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs">
                      <thead>
                        <tr className="bg-gray-50 text-gray-500 border-b border-gray-100">
                          <th className="px-4 py-3 text-left w-10"><input type="checkbox" checked={selectedCleanPlanIds.length === cleanPlanList.length} onChange={(e) => setSelectedCleanPlanIds(e.target.checked ? cleanPlanList.map((p) => p.id) : [])} className="rounded border-gray-300 text-blue-600" /></th>
                          <th className="px-4 py-3 text-left font-medium">序号</th>
                          <th className="px-4 py-3 text-left font-medium">电站名称</th>
                          <th className="px-4 py-3 text-left font-medium">责任人</th>
                          <th className="px-4 py-3 text-left font-medium">联系电话</th>
                          <th className="px-4 py-3 text-left font-medium">清洗周期</th>
                          <th className="px-4 py-3 text-left font-medium">计划结束时间</th>
                          <th className="px-4 py-3 text-left font-medium w-32">操作</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {cleanPlanList.map((row, idx) => (
                          <tr key={row.id} className="hover:bg-gray-50/50 transition-colors">
                            <td className="px-4 py-3"><input type="checkbox" checked={selectedCleanPlanIds.includes(row.id)} onChange={(e) => setSelectedCleanPlanIds((prev) => e.target.checked ? [...prev, row.id] : prev.filter((id) => id !== row.id))} className="rounded border-gray-300 text-blue-600" /></td>
                            <td className="px-4 py-3 text-gray-500">{idx + 1}</td>
                            <td className="px-4 py-3 font-medium text-gray-700">{row.stationName}</td>
                            <td className="px-4 py-3 text-gray-600">{row.person}</td>
                            <td className="px-4 py-3 text-gray-600">{row.phone}</td>
                            <td className="px-4 py-3 text-gray-600">{row.cycle}</td>
                            <td className="px-4 py-3 text-gray-600">{row.planEndTime || '-'}</td>
                            <td className="px-4 py-3">
                              <div className="flex items-center gap-3">
                                <button type="button" className="text-blue-600 hover:underline">详情</button>
                                <button type="button" className="text-blue-600 hover:underline">复制</button>
                                <button type="button" className="text-blue-600 hover:underline">修改</button>
                                <button type="button" onClick={() => setCleanPlanList((prev) => prev.filter((p) => p.id !== row.id))} className="text-red-500 hover:underline">删除</button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="flex items-center justify-between px-4 py-3 border-t border-gray-50 text-xs text-gray-500">
                    <span>共 {cleanPlanList.length} 条记录</span>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-400">20条/页</span>
                      <div className="flex items-center gap-1">
                        <button type="button" className="w-7 h-7 flex items-center justify-center rounded border border-gray-200 hover:bg-gray-50 text-gray-500">1</button>
                        <button type="button" className="w-7 h-7 flex items-center justify-center rounded border border-gray-200 hover:bg-gray-50 text-gray-500">2</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          ) : activeMenu === 'clean-task' ? (
            isCleanTaskFormOpen ? (
              <div className="space-y-6 pb-24">
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                      <span className="w-1 h-5 bg-blue-500 rounded-full flex-shrink-0" />
                      填写清洗任务
                    </h2>
                    <p className="text-xs text-gray-400 mt-1">修改时间: {new Date().toLocaleString('zh-CN', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' })}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-xs text-gray-800 flex items-center gap-1">
                      本次为第
                      <input
                        type="number"
                        min={1}
                        value={cleanTaskFormData.cleanIndex || ''}
                        onChange={(e) =>
                          setCleanTaskFormData((p) => ({
                            ...p,
                            cleanIndex: e.target.value ? Number(e.target.value) : undefined,
                          }))
                        }
                        className="w-14 border-b border-red-300 bg-transparent text-center focus:outline-none focus:border-red-500"
                      />
                      次清洗
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setIsCleanTaskFormOpen(false);
                        setSelectedCleanTaskId(null);
                      }}
                      className="text-xs text-gray-500 hover:text-blue-600 flex items-center gap-1"
                    >
                      <RotateCcw size={14} /> 返回上一页
                    </button>
                  </div>
                </div>

                {/* 任务项填写 */}
                <Card title="任务项填写" className="overflow-visible">
                  <div className="space-y-6">
                    <div>
                      <div className="text-sm font-bold text-gray-700 mb-3">1、脏污与效果</div>
                      <div className="pl-2 flex flex-wrap items-center gap-x-6 gap-y-3">
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-gray-600 whitespace-nowrap">脏污程度</span>
                          <select value={cleanTaskFormData.dirtyLevel} onChange={(e) => setCleanTaskFormData((p) => ({ ...p, dirtyLevel: e.target.value as any }))} className="text-xs border border-gray-200 rounded px-3 py-2 w-32">
                            <option value="">请选择</option>
                            <option value="轻微">轻微</option>
                            <option value="中等">中等</option>
                            <option value="严重">严重</option>
                          </select>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-gray-600 whitespace-nowrap">主要污染物</span>
                          <select value={cleanTaskFormData.pollutant} onChange={(e) => setCleanTaskFormData((p) => ({ ...p, pollutant: e.target.value as any }))} className="text-xs border border-gray-200 rounded px-3 py-2 w-32">
                            <option value="">请选择</option>
                            <option value="积灰">积灰</option>
                            <option value="鸟粪">鸟粪</option>
                            <option value="泥沙">泥沙</option>
                            <option value="油污">油污</option>
                            <option value="其他">其他</option>
                          </select>
                          {cleanTaskFormData.pollutant === '其他' && (
                            <input type="text" value={cleanTaskFormData.pollutantOther} onChange={(e) => setCleanTaskFormData((p) => ({ ...p, pollutantOther: e.target.value }))} placeholder="补充内容" className="text-xs border border-gray-200 rounded px-2 py-1.5 w-40" />
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-gray-600 whitespace-nowrap">清洗效果</span>
                          <label className="flex items-center gap-1.5 cursor-pointer">
                            <input type="radio" name="effect" checked={cleanTaskFormData.effect === '达标'} onChange={() => setCleanTaskFormData((p) => ({ ...p, effect: '达标', effectReason: '' }))} className="text-blue-600" />
                            <span className="text-xs">达标</span>
                          </label>
                          <label className="flex items-center gap-1.5 cursor-pointer">
                            <input type="radio" name="effect" checked={cleanTaskFormData.effect === '未达标'} onChange={() => setCleanTaskFormData((p) => ({ ...p, effect: '未达标' }))} className="text-blue-600" />
                            <span className="text-xs">未达标</span>
                          </label>
                          {cleanTaskFormData.effect === '未达标' && (
                            <input type="text" value={cleanTaskFormData.effectReason} onChange={(e) => setCleanTaskFormData((p) => ({ ...p, effectReason: e.target.value }))} placeholder="请填写未达标原因" className="text-xs border border-gray-200 rounded px-2 py-1.5 w-40" />
                          )}
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="text-sm font-bold text-gray-700 mb-3">2、组件破损记录</div>
                      <div className="pl-2 space-y-3">
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-gray-600">组件是否破损</span>
                          <label className="flex items-center gap-1.5 cursor-pointer">
                            <input type="radio" name="damaged" checked={!cleanTaskFormData.componentDamaged} onChange={() => setCleanTaskFormData((p) => ({ ...p, componentDamaged: false }))} className="text-blue-600" />
                            <span className="text-xs">无</span>
                          </label>
                          <label className="flex items-center gap-1.5 cursor-pointer">
                            <input type="radio" name="damaged" checked={cleanTaskFormData.componentDamaged} onChange={() => setCleanTaskFormData((p) => ({ ...p, componentDamaged: true }))} className="text-blue-600" />
                            <span className="text-xs">有破损</span>
                          </label>
                        </div>
                        {cleanTaskFormData.componentDamaged && (
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-gray-50/50 rounded-lg border border-gray-100">
                            <div className="space-y-1">
                              <label className="text-xs text-gray-600">破损位置</label>
                              <div className="flex items-center gap-1 flex-wrap">
                                <span className="text-xs">第</span>
                                <input type="text" value={cleanTaskFormData.damageSerial} onChange={(e) => setCleanTaskFormData((p) => ({ ...p, damageSerial: e.target.value }))} placeholder="串" className="text-xs border border-gray-200 rounded px-2 py-1.5 w-14" />
                                <span className="text-xs">串第</span>
                                <input type="text" value={cleanTaskFormData.damageBlock} onChange={(e) => setCleanTaskFormData((p) => ({ ...p, damageBlock: e.target.value }))} placeholder="块" className="text-xs border border-gray-200 rounded px-2 py-1.5 w-14" />
                                <span className="text-xs">块组件 /</span>
                                <input type="text" value={cleanTaskFormData.damagePositionArea} onChange={(e) => setCleanTaskFormData((p) => ({ ...p, damagePositionArea: e.target.value }))} placeholder="_区域组件" className="text-xs border border-gray-200 rounded px-2 py-1.5 flex-1 min-w-24" />
                              </div>
                            </div>
                            <div className="space-y-1">
                              <label className="text-xs text-gray-600">破损类型</label>
                              <select value={cleanTaskFormData.damageType} onChange={(e) => setCleanTaskFormData((p) => ({ ...p, damageType: e.target.value as any }))} className="text-xs border border-gray-200 rounded px-2 py-1.5 w-full">
                                <option value="">请选择</option>
                                <option value="玻璃裂纹">玻璃裂纹</option>
                                <option value="边框变形">边框变形</option>
                                <option value="背板破损">背板破损</option>
                                <option value="其他">其他</option>
                              </select>
                              {cleanTaskFormData.damageType === '其他' && (
                                <input type="text" value={cleanTaskFormData.damageTypeOther} onChange={(e) => setCleanTaskFormData((p) => ({ ...p, damageTypeOther: e.target.value }))} placeholder="补充内容" className="text-xs border border-gray-200 rounded px-2 py-1.5 w-full mt-1" />
                              )}
                            </div>
                            <div className="md:col-span-2 space-y-1">
                              <label className="text-xs text-gray-600">破损图片标注</label>
                              <div className="border-2 border-dashed border-gray-200 rounded-lg p-6 text-center text-gray-400 text-xs">点击上传，最多10张</div>
                            </div>
                            <div className="md:col-span-2 space-y-1">
                              <label className="text-xs text-gray-600">处理建议</label>
                              <select value={cleanTaskFormData.damageSuggestion} onChange={(e) => setCleanTaskFormData((p) => ({ ...p, damageSuggestion: e.target.value as any }))} className="text-xs border border-gray-200 rounded px-2 py-1.5 w-full">
                                <option value="">请选择</option>
                                <option value="无需处理">无需处理</option>
                                <option value="待更换">待更换</option>
                                <option value="临时修复">临时修复</option>
                                <option value="其他">其他</option>
                              </select>
                              {cleanTaskFormData.damageSuggestion === '其他' && (
                                <input type="text" value={cleanTaskFormData.damageSuggestionOther} onChange={(e) => setCleanTaskFormData((p) => ({ ...p, damageSuggestionOther: e.target.value }))} placeholder="补充内容" className="text-xs border border-gray-200 rounded px-2 py-1.5 w-full mt-1" />
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm font-bold text-gray-700 mb-3">3、其他异常记录</div>
                      <div className="pl-2 space-y-3">
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-gray-600">是否有其他异常</span>
                          <label className="flex items-center gap-1.5 cursor-pointer">
                            <input type="radio" name="abnormal" checked={!cleanTaskFormData.otherAbnormal} onChange={() => setCleanTaskFormData((p) => ({ ...p, otherAbnormal: false }))} className="text-blue-600" />
                            <span className="text-xs">无</span>
                          </label>
                          <label className="flex items-center gap-1.5 cursor-pointer">
                            <input type="radio" name="abnormal" checked={cleanTaskFormData.otherAbnormal} onChange={() => setCleanTaskFormData((p) => ({ ...p, otherAbnormal: true }))} className="text-blue-600" />
                            <span className="text-xs">有异常</span>
                          </label>
                        </div>
                        {cleanTaskFormData.otherAbnormal && (
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-gray-50/50 rounded-lg border border-gray-100">
                            <div className="md:col-span-2 space-y-1">
                              <label className="text-xs text-gray-600">异常描述（不超过200字）</label>
                              <textarea value={cleanTaskFormData.abnormalDesc} onChange={(e) => setCleanTaskFormData((p) => ({ ...p, abnormalDesc: e.target.value.slice(0, 200) }))} placeholder="请输入" rows={2} className="text-xs border border-gray-200 rounded px-2 py-1.5 w-full resize-none" maxLength={200} />
                              <span className="text-[10px] text-gray-400">{cleanTaskFormData.abnormalDesc.length}/200</span>
                            </div>
                            <div className="space-y-1">
                              <label className="text-xs text-gray-600">异常位置</label>
                              <div className="flex items-center gap-1 flex-wrap">
                                <span className="text-xs">第</span>
                                <input type="text" value={cleanTaskFormData.abnormalSerial} onChange={(e) => setCleanTaskFormData((p) => ({ ...p, abnormalSerial: e.target.value }))} placeholder="串" className="text-xs border border-gray-200 rounded px-2 py-1.5 w-14" />
                                <span className="text-xs">串第</span>
                                <input type="text" value={cleanTaskFormData.abnormalBlock} onChange={(e) => setCleanTaskFormData((p) => ({ ...p, abnormalBlock: e.target.value }))} placeholder="块" className="text-xs border border-gray-200 rounded px-2 py-1.5 w-14" />
                                <span className="text-xs">块组件 /</span>
                                <input type="text" value={cleanTaskFormData.abnormalPositionArea} onChange={(e) => setCleanTaskFormData((p) => ({ ...p, abnormalPositionArea: e.target.value }))} placeholder="_区域组件" className="text-xs border border-gray-200 rounded px-2 py-1.5 flex-1 min-w-24" />
                              </div>
                            </div>
                            <div className="space-y-1">
                              <label className="text-xs text-gray-600">异常图片标注</label>
                              <div className="border-2 border-dashed border-gray-200 rounded-lg p-4 text-center text-gray-400 text-xs">点击上传，最多10张</div>
                            </div>
                            <div className="md:col-span-2 space-y-1">
                              <label className="text-xs text-gray-600">处理结果（不超过200字）</label>
                              <textarea value={cleanTaskFormData.abnormalResult} onChange={(e) => setCleanTaskFormData((p) => ({ ...p, abnormalResult: e.target.value.slice(0, 200) }))} placeholder="请输入" rows={2} className="text-xs border border-gray-200 rounded px-2 py-1.5 w-full resize-none" maxLength={200} />
                              <span className="text-[10px] text-gray-400">{cleanTaskFormData.abnormalResult.length}/200</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </Card>

                {/* 清洗全流程图片 */}
                <Card title="清洗全流程图片">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <div className="text-xs font-bold text-gray-700 mb-2">清洗前图片（组件原始状态）</div>
                      <div className="border-2 border-dashed border-gray-200 rounded-lg p-8 text-center text-gray-400 text-xs">点击上传，最多10张</div>
                    </div>
                    <div>
                      <div className="text-xs font-bold text-gray-700 mb-2">清洗中图片（作业过程）</div>
                      <div className="border-2 border-dashed border-gray-200 rounded-lg p-8 text-center text-gray-400 text-xs">点击上传，最多10张</div>
                    </div>
                    <div>
                      <div className="text-xs font-bold text-gray-700 mb-2">清洗后图片（清洁完状态）</div>
                      <div className="border-2 border-dashed border-gray-200 rounded-lg p-8 text-center text-gray-400 text-xs">点击上传，最多10张</div>
                    </div>
                  </div>
                </Card>

                {/* 清洗详情 */}
                <Card title="清洗详情">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs text-gray-600">清洗方式</label>
                      <select value={cleanTaskFormData.cleanMethod} onChange={(e) => setCleanTaskFormData((p) => ({ ...p, cleanMethod: e.target.value as any }))} className="text-xs border border-gray-200 rounded px-3 py-2 w-full">
                        <option value="">请选择</option>
                        <option value="人工">人工</option>
                        <option value="高压水枪">高压水枪</option>
                        <option value="机器人">机器人</option>
                      </select>
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs text-gray-600">作业时间</label>
                      <input type="date" value={cleanTaskFormData.workDate} onChange={(e) => setCleanTaskFormData((p) => ({ ...p, workDate: e.target.value }))} className="text-xs border border-gray-200 rounded px-3 py-2 w-full" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs text-gray-600">天气情况</label>
                      <select value={cleanTaskFormData.weather} onChange={(e) => setCleanTaskFormData((p) => ({ ...p, weather: e.target.value as any }))} className="text-xs border border-gray-200 rounded px-3 py-2 w-full">
                        <option value="">请选择</option>
                        <option value="晴">晴</option>
                        <option value="阴">阴</option>
                        <option value="多云">多云</option>
                      </select>
                    </div>
                  </div>
                </Card>

                {/* 确认签字 */}
                <Card title="确认签字">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs text-gray-600">清洗负责人签字及日期</label>
                      <div className="border-2 border-dashed border-gray-200 rounded-lg p-6 text-center text-gray-400 text-xs">签字区域</div>
                      <div className="flex items-center gap-2">
                        <button type="button" className="text-xs text-gray-500 hover:text-gray-700">清空</button>
                        <button type="button" className="text-xs px-3 py-1.5 bg-blue-600 text-white rounded hover:bg-blue-700">上传签名</button>
                        <input type="date" value={cleanTaskFormData.supervisorDate} onChange={(e) => setCleanTaskFormData((p) => ({ ...p, supervisorDate: e.target.value }))} className="text-xs border border-gray-200 rounded px-2 py-1.5" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs text-gray-600">验收人签字及日期</label>
                      <div className="border-2 border-dashed border-gray-200 rounded-lg p-6 text-center text-gray-400 text-xs">签字区域</div>
                      <div className="flex items-center gap-2">
                        <button type="button" className="text-xs text-gray-500 hover:text-gray-700">清空</button>
                        <button type="button" className="text-xs px-3 py-1.5 bg-blue-600 text-white rounded hover:bg-blue-700">上传签名</button>
                        <input type="date" value={cleanTaskFormData.acceptorDate} onChange={(e) => setCleanTaskFormData((p) => ({ ...p, acceptorDate: e.target.value }))} className="text-xs border border-gray-200 rounded px-2 py-1.5" />
                      </div>
                    </div>
                  </div>
                </Card>

                <div className="bg-white border-t border-gray-200 px-4 py-3 flex items-center justify-between mt-6 rounded-b-lg">
                  <span className="text-xs text-gray-500">共 3 个任务组 / 5 个清洗项</span>
                  <div className="flex gap-3">
                    <button type="button" className="px-6 py-2 border border-gray-200 text-gray-600 text-xs font-bold rounded-lg hover:bg-gray-50">暂存</button>
                    <button type="button" onClick={() => { setIsCleanTaskFormOpen(false); setSelectedCleanTaskId(null); }} className="px-6 py-2 bg-blue-600 text-white text-xs font-bold rounded-lg hover:bg-blue-700">提交清洗结果</button>
                  </div>
                </div>
              </div>
            ) : (
            <div className="space-y-4">
              <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-500 whitespace-nowrap">电站选择:</span>
                  <input
                    type="text"
                    placeholder="电站选择"
                    className="text-xs border border-gray-200 rounded px-3 py-2 w-44 md:w-56 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-500 whitespace-nowrap">清洗任务状态:</span>
                  <select className="text-xs border border-gray-200 rounded px-3 py-2 w-32 focus:outline-none focus:ring-2 focus:ring-blue-500/20">
                    <option>请选择</option>
                    <option>未填写</option>
                    <option>已填写</option>
                  </select>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-500 whitespace-nowrap">清洗任务时间:</span>
                  <input
                    type="date"
                    className="text-xs border border-gray-200 rounded px-2 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  />
                  <span className="text-xs text-gray-400">-</span>
                  <input
                    type="date"
                    className="text-xs border border-gray-200 rounded px-2 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>
                <div className="flex items-center gap-2 ml-auto">
                  <button
                    type="button"
                    className="px-4 py-2 bg-blue-600 text-white text-xs font-bold rounded hover:bg-blue-700 transition-colors"
                  >
                    查询
                  </button>
                  <button
                    type="button"
                    className="px-4 py-2 bg-white border border-gray-200 text-xs text-gray-600 font-bold rounded hover:bg-gray-50 transition-colors"
                  >
                    批量删除
                  </button>
                  <button
                    type="button"
                    className="px-4 py-2 bg-white border border-gray-200 text-xs text-gray-600 font-bold rounded hover:bg-gray-50 transition-colors"
                  >
                    任务导出
                  </button>
                  <button
                    type="button"
                    className="p-2 text-gray-500 hover:bg-gray-100 rounded transition-colors"
                    aria-label="刷新"
                  >
                    <RotateCcw size={18} />
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="bg-gray-50 text-gray-500 border-b border-gray-100">
                        <th className="px-4 py-3 text-left w-10">
                          <input
                            type="checkbox"
                            className="rounded border-gray-300 text-blue-600"
                            checked={
                              cleanTaskList.length > 0 &&
                              selectedCleanTaskIds.length === cleanTaskList.length
                            }
                            onChange={(e) =>
                              setSelectedCleanTaskIds(
                                e.target.checked ? cleanTaskList.map((t) => t.id) : []
                              )
                            }
                          />
                        </th>
                        <th className="px-4 py-3 text-left font-medium">序号</th>
                        <th className="px-4 py-3 text-left font-medium">电站名称</th>
                        <th className="px-4 py-3 text-left font-medium">责任人</th>
                        <th className="px-4 py-3 text-left font-medium">联系电话</th>
                        <th className="px-4 py-3 text-left font-medium">清洗任务状态</th>
                        <th className="px-4 py-3 text-left font-medium">任务开始时间</th>
                        <th className="px-4 py-3 text-left font-medium">任务结束时间</th>
                        <th className="px-4 py-3 text-left font-medium w-32">任务详情</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {cleanTaskList.map((row, idx) => (
                        <tr key={row.id} className="hover:bg-gray-50/50 transition-colors">
                          <td className="px-4 py-3">
                            <input
                              type="checkbox"
                              className="rounded border-gray-300 text-blue-600"
                              checked={selectedCleanTaskIds.includes(row.id)}
                              onChange={(e) =>
                                setSelectedCleanTaskIds((prev) =>
                                  e.target.checked
                                    ? [...prev, row.id]
                                    : prev.filter((id) => id !== row.id)
                                )
                              }
                            />
                          </td>
                          <td className="px-4 py-3 text-gray-500">{idx + 1}</td>
                          <td className="px-4 py-3 font-medium text-gray-700">
                            {row.stationName}
                          </td>
                          <td className="px-4 py-3 text-gray-600">{row.person}</td>
                          <td className="px-4 py-3 text-gray-600">{row.phone}</td>
                          <td className="px-4 py-3">
                            <span
                              className={cn(
                                'inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium',
                                row.status === '未填写'
                                  ? 'bg-red-50 text-red-600 border border-red-100'
                                  : 'bg-emerald-50 text-emerald-600 border border-emerald-100'
                              )}
                            >
                              {row.status}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-gray-600">{row.startTime}</td>
                          <td className="px-4 py-3 text-gray-600">{row.endTime}</td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-3">
                              <button
                                type="button"
                                className="text-blue-600 hover:underline"
                                onClick={() => {
                                  setSelectedCleanTaskId(row.id);
                                  setIsCleanTaskFormOpen(true);
                                }}
                              >
                                清洗人填写
                              </button>
                              <button
                                type="button"
                                className="text-blue-600 hover:underline"
                              >
                                查看
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="flex items-center justify-between px-4 py-3 border-t border-gray-50 text-xs text-gray-500">
                  <span>共 {cleanTaskList.length} 条记录</span>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-400">20条/页</span>
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        className="w-7 h-7 flex items-center justify-center rounded border border-gray-200 hover:bg-gray-50 text-gray-500"
                      >
                        1
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            )
          ) : activeMenu === 'clean-record' ? (
            isCleanRecordDetailOpen ? (
              <div className="space-y-6 pb-8">
                <div className="flex items-start justify-between">
                  <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                    <span className="w-1 h-5 bg-blue-500 rounded-full flex-shrink-0" />
                    清洗记录详情
                  </h2>
                  <div className="flex items-center gap-4">
                    <div className="text-xs text-gray-800">
                      本次为第<span className="mx-0.5 font-semibold">1/3</span>次清洗
                    </div>
                    <button type="button" className="text-xs px-3 py-1.5 bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center gap-1">
                      导出 PDF
                    </button>
                    <button type="button" onClick={() => { setIsCleanRecordDetailOpen(false); setSelectedCleanRecordId(null); }} className="text-xs text-gray-500 hover:text-blue-600 flex items-center gap-1">
                      <RotateCcw size={14} /> 返回上一页
                    </button>
                  </div>
                </div>

                {/* 清洗项 - 只读 */}
                <Card title="清洗项" className="overflow-visible">
                  <div className="space-y-6">
                    <div>
                      <div className="text-sm font-bold text-gray-700 mb-3">1、脏污与效果</div>
                      <div className="pl-2 flex flex-wrap items-center gap-x-6 gap-y-3">
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-gray-600 whitespace-nowrap">脏污程度</span>
                          <span className="text-xs text-gray-800 bg-gray-50 px-3 py-1.5 rounded">{cleanRecordDetailMock.dirtyLevel || '--'}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-gray-600 whitespace-nowrap">主要污染物</span>
                          <span className="text-xs text-gray-800 bg-gray-50 px-3 py-1.5 rounded">{cleanRecordDetailMock.pollutant || '--'}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-gray-600 whitespace-nowrap">清洗效果</span>
                          <span className={cn('inline-flex items-center px-2 py-0.5 rounded text-xs', cleanRecordDetailMock.effect === '达标' ? 'bg-blue-50 text-blue-700' : 'bg-amber-50 text-amber-700')}>√ {cleanRecordDetailMock.effect}{cleanRecordDetailMock.effect === '未达标' && cleanRecordDetailMock.effectReason ? ` (${cleanRecordDetailMock.effectReason})` : ''}</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="text-sm font-bold text-gray-700 mb-3">2、组件破损记录</div>
                      <div className="pl-2 space-y-3">
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-gray-600">组件是否破损</span>
                          <span className="text-xs text-gray-800 bg-gray-50 px-2 py-1 rounded">{cleanRecordDetailMock.componentDamaged ? '有破损' : '无'}</span>
                        </div>
                        {cleanRecordDetailMock.componentDamaged && (
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-gray-50/50 rounded-lg border border-gray-100 text-xs">
                            <div className="space-y-1">
                              <span className="text-gray-600">破损位置</span>
                              <div className="text-gray-800">第{cleanRecordDetailMock.damageSerial}串第{cleanRecordDetailMock.damageBlock}块组件 / {cleanRecordDetailMock.damagePositionArea || '--'}</div>
                            </div>
                            <div className="space-y-1">
                              <span className="text-gray-600">破损类型</span>
                              <div className="text-gray-800">{cleanRecordDetailMock.damageType || '--'}{cleanRecordDetailMock.damageTypeOther ? `（${cleanRecordDetailMock.damageTypeOther}）` : ''}</div>
                            </div>
                            <div className="md:col-span-2 space-y-1">
                              <span className="text-gray-600">破损图片标注</span>
                              <div className="border border-gray-200 rounded-lg p-4 text-center text-gray-400 bg-white">图片展示区</div>
                            </div>
                            <div className="md:col-span-2 space-y-1">
                              <span className="text-gray-600">处理建议</span>
                              <div className="text-gray-800">{cleanRecordDetailMock.damageSuggestion || '--'}{cleanRecordDetailMock.damageSuggestionOther ? `（${cleanRecordDetailMock.damageSuggestionOther}）` : ''}</div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm font-bold text-gray-700 mb-3">3、其他异常记录</div>
                      <div className="pl-2 space-y-3">
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-gray-600">是否有其他异常</span>
                          <span className="text-xs text-gray-800 bg-gray-50 px-2 py-1 rounded">{cleanRecordDetailMock.otherAbnormal ? '有异常' : '无'}</span>
                        </div>
                        {cleanRecordDetailMock.otherAbnormal && (
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-gray-50/50 rounded-lg border border-gray-100 text-xs">
                            <div className="md:col-span-2 space-y-1">
                              <span className="text-gray-600">异常描述</span>
                              <div className="text-gray-800">{cleanRecordDetailMock.abnormalDesc || '--'}</div>
                            </div>
                            <div className="space-y-1">
                              <span className="text-gray-600">异常位置</span>
                              <div className="text-gray-800">第{cleanRecordDetailMock.abnormalSerial}串第{cleanRecordDetailMock.abnormalBlock}块组件 / {cleanRecordDetailMock.abnormalPositionArea || '--'}</div>
                            </div>
                            <div className="space-y-1">
                              <span className="text-gray-600">异常图片标注</span>
                              <div className="border border-gray-200 rounded-lg p-4 text-center text-gray-400 bg-white">图片展示区</div>
                            </div>
                            <div className="md:col-span-2 space-y-1">
                              <span className="text-gray-600">处理结果</span>
                              <div className="text-gray-800">{cleanRecordDetailMock.abnormalResult || '--'}</div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </Card>

                {/* 清洗全流程图片 - 只读 */}
                <Card title="清洗全流程图片">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <div className="text-xs font-bold text-gray-700 mb-2">清洗前图片（组件原始状态）</div>
                      <div className="border border-gray-200 rounded-lg p-6 text-center text-gray-400 text-xs bg-gray-50/50">图片展示区</div>
                    </div>
                    <div>
                      <div className="text-xs font-bold text-gray-700 mb-2">清洗中图片（作业过程）</div>
                      <div className="border border-gray-200 rounded-lg p-6 text-center text-gray-400 text-xs bg-gray-50/50">图片展示区</div>
                    </div>
                    <div>
                      <div className="text-xs font-bold text-gray-700 mb-2">清洗后图片（清洁完状态）</div>
                      <div className="border border-gray-200 rounded-lg p-6 text-center text-gray-400 text-xs bg-gray-50/50">图片展示区</div>
                    </div>
                  </div>
                </Card>

                {/* 清洗详情 - 只读 */}
                <Card title="清洗详情">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs text-gray-600">清洗方式</label>
                      <div className="text-xs text-gray-800 bg-gray-50 px-3 py-2 rounded">{cleanRecordDetailMock.cleanMethod || '--'}</div>
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs text-gray-600">作业时间</label>
                      <div className="text-xs text-gray-800 bg-gray-50 px-3 py-2 rounded">{cleanRecordDetailMock.workDate || '--'}</div>
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs text-gray-600">天气情况</label>
                      <div className="text-xs text-gray-800 bg-gray-50 px-3 py-2 rounded">{cleanRecordDetailMock.weather || '--'}</div>
                    </div>
                  </div>
                </Card>

                {/* 确认签字 - 只读 */}
                <Card title="确认签字">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs text-gray-600">清洗负责人签字及日期</label>
                      <div className="border border-gray-200 rounded-lg p-6 text-center text-gray-400 text-xs bg-gray-50/50">签字展示</div>
                      <div className="text-xs text-gray-600">日期：{cleanRecordDetailMock.supervisorDate || '--'}</div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs text-gray-600">验收人签字及日期</label>
                      <div className="border border-gray-200 rounded-lg p-6 text-center text-gray-400 text-xs bg-gray-50/50">签字展示</div>
                      <div className="text-xs text-gray-600">日期：{cleanRecordDetailMock.acceptorDate || '--'}</div>
                    </div>
                  </div>
                </Card>
              </div>
            ) : (
            <div className="space-y-4">
              <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-500 whitespace-nowrap">电站选择:</span>
                  <input type="text" placeholder="电站选择" className="text-xs border border-gray-200 rounded px-3 py-2 w-44 md:w-56 focus:outline-none focus:ring-2 focus:ring-blue-500/20" />
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-500 whitespace-nowrap">清洗时间:</span>
                  <input type="date" className="text-xs border border-gray-200 rounded px-2 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500/20" />
                  <span className="text-xs text-gray-400">-</span>
                  <input type="date" className="text-xs border border-gray-200 rounded px-2 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500/20" />
                </div>
                <div className="flex items-center gap-2 ml-auto">
                  <button type="button" className="px-4 py-2 bg-blue-600 text-white text-xs font-bold rounded hover:bg-blue-700 transition-colors">查询</button>
                  <button type="button" className="px-4 py-2 bg-white border border-gray-200 text-xs text-gray-600 font-bold rounded hover:bg-gray-50 transition-colors">批量删除</button>
                  <button type="button" className="px-4 py-2 bg-white border border-gray-200 text-xs text-gray-600 font-bold rounded hover:bg-gray-50 transition-colors">记录导出</button>
                  <button type="button" className="p-2 text-gray-500 hover:bg-gray-100 rounded transition-colors" aria-label="刷新"><RotateCcw size={18} /></button>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="bg-gray-50 text-gray-500 border-b border-gray-100">
                        <th className="px-4 py-3 text-left w-10"><input type="checkbox" className="rounded border-gray-300 text-blue-600" checked={cleanRecordList.length > 0 && selectedCleanRecordIds.length === cleanRecordList.length} onChange={(e) => setSelectedCleanRecordIds(e.target.checked ? cleanRecordList.map((r) => r.id) : [])} /></th>
                        <th className="px-4 py-3 text-left font-medium">序号</th>
                        <th className="px-4 py-3 text-left font-medium">电站名称</th>
                        <th className="px-4 py-3 text-left font-medium">清洗时间</th>
                        <th className="px-4 py-3 text-left font-medium">责任人</th>
                        <th className="px-4 py-3 text-left font-medium">清洗人员</th>
                        <th className="px-4 py-3 text-left font-medium w-24">操作</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {cleanRecordList.map((row, idx) => (
                        <tr key={row.id} className="hover:bg-gray-50/50 transition-colors">
                          <td className="px-4 py-3"><input type="checkbox" className="rounded border-gray-300 text-blue-600" checked={selectedCleanRecordIds.includes(row.id)} onChange={(e) => setSelectedCleanRecordIds((prev) => e.target.checked ? [...prev, row.id] : prev.filter((id) => id !== row.id))} /></td>
                          <td className="px-4 py-3 text-gray-500">{idx + 1}</td>
                          <td className="px-4 py-3 font-medium text-gray-700">{row.stationName}</td>
                          <td className="px-4 py-3 text-gray-600">{row.cleanTime || '--'}</td>
                          <td className="px-4 py-3 text-gray-600">{row.person}</td>
                          <td className="px-4 py-3">
                            <div className="flex flex-wrap gap-1">
                              {row.cleanPersonnel.length ? row.cleanPersonnel.map((p, i) => <span key={i} className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium bg-blue-50 text-blue-700">{p}</span>) : '--'}
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <button type="button" className="text-blue-600 hover:underline" onClick={() => { setSelectedCleanRecordId(row.id); setIsCleanRecordDetailOpen(true); }}>详情</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="flex items-center justify-between px-4 py-3 border-t border-gray-50 text-xs text-gray-500">
                  <span>共 {cleanRecordList.length} 条记录</span>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-400">20条/页</span>
                    <div className="flex items-center gap-1"><button type="button" className="w-7 h-7 flex items-center justify-center rounded border border-gray-200 hover:bg-gray-50 text-gray-500">1</button></div>
                  </div>
                </div>
              </div>
            </div>
            )
          ) : (
            <div className="flex flex-col items-center justify-center h-[60vh] text-gray-400">
              <Activity size={64} className="mb-4 opacity-20" />
              <p className="text-lg font-medium">电站运维模块加载中...</p>
              <p className="text-sm">请点击上方“配电房监测”查看已设计的功能模块</p>
            </div>
          )}
        </main>
      </div>

      {/* Footer / Status Bar */}
      <footer className="absolute bottom-0 right-0 left-0 h-6 bg-white border-t border-gray-200 flex items-center justify-between px-4 text-[10px] text-gray-400 z-30">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div> 系统运行正常</span>
          <span>网关状态: 在线</span>
        </div>
        <div>© 2026 宁波光曜运维技术有限公司</div>
      </footer>

      {/* Add Alarm Modal */}
      <AnimatePresence>
        {isAlarmModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsAlarmModalOpen(false)}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-xl shadow-2xl w-full max-w-2xl overflow-hidden relative z-10"
            >
              <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                <h3 className="font-bold text-gray-800">新增告警配置</h3>
                <button 
                  onClick={() => setIsAlarmModalOpen(false)}
                  className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X size={20} className="text-gray-400" />
                </button>
              </div>
              <div className="p-6 space-y-6">
                <div className="grid grid-cols-1 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-medium text-gray-700 flex items-center gap-1">
                      <span className="text-red-500">*</span> 电站名称
                    </label>
                    <input type="text" placeholder="电站选择" className="w-full text-xs border border-gray-200 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500/20" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-medium text-gray-700 flex items-center gap-1">
                      <span className="text-red-500">*</span> 监测点
                    </label>
                    <select className="w-full text-xs border border-gray-200 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500/20">
                      <option value="">请选择监测点</option>
                      <option value="temp">并网柜温度</option>
                      <option value="cur_unb">电流不平衡率</option>
                      <option value="vol_unb">电压不平衡率</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-medium text-gray-700 flex items-center gap-1">
                      <span className="text-red-500">*</span> 告警内容
                    </label>
                    <textarea 
                      placeholder="请输入告警内容" 
                      rows={3}
                      className="w-full text-xs border border-gray-200 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500/20 resize-none"
                    />
                  </div>
                  <div className="space-y-4">
                    <label className="text-xs font-medium text-gray-700">触发条件</label>
                    <div className="space-y-3 p-4 bg-gray-50 rounded-xl border border-gray-100">
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-gray-500 w-12">条件1</span>
                        <select className="flex-1 text-xs border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500/20">
                          <option>大于</option>
                          <option>小于</option>
                          <option>等于</option>
                        </select>
                        <input type="number" defaultValue="6.0" className="w-24 text-xs border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500/20" />
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-gray-500 w-12">条件组合</span>
                        <select className="flex-1 text-xs border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500/20">
                          <option>与</option>
                          <option>或</option>
                        </select>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-gray-500 w-12">条件2</span>
                        <select className="flex-1 text-xs border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500/20">
                          <option>小于</option>
                          <option>大于</option>
                          <option>等于</option>
                        </select>
                        <input type="number" defaultValue="10.0" className="w-24 text-xs border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500/20" />
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <span className="text-xs font-medium text-gray-700">告警方式</span>
                    <div className="flex items-center gap-4">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                        <span className="text-xs text-gray-600">短信通知</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" defaultChecked className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                        <span className="text-xs text-gray-600">平台通知</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-end gap-3">
                <button 
                  onClick={() => setIsAlarmModalOpen(false)}
                  className="px-6 py-2 bg-white border border-gray-200 text-gray-600 text-xs font-bold rounded-lg hover:bg-gray-50 transition-colors"
                >
                  取消
                </button>
                <button 
                  onClick={() => setIsAlarmModalOpen(false)}
                  className="px-6 py-2 bg-blue-600 text-white text-xs font-bold rounded-lg hover:bg-blue-700 transition-colors"
                >
                  确定
                </button>
              </div>
            </motion.div>
          </div>
        )}

        {/* Alarm Detail Modal */}
        {isAlarmDetailModalOpen && selectedAlarm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsAlarmDetailModalOpen(false)}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden relative z-10"
            >
              <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                <h3 className="font-bold text-gray-800">告警详情</h3>
                <button 
                  onClick={() => setIsAlarmDetailModalOpen(false)}
                  className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X size={20} className="text-gray-400" />
                </button>
              </div>
              <div className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <span className="text-[10px] text-gray-400 uppercase tracking-wider">电站名称</span>
                    <p className="text-xs font-medium text-gray-700">{selectedAlarm.station}</p>
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] text-gray-400 uppercase tracking-wider">监测点</span>
                    <p className="text-xs font-medium text-gray-700">{selectedAlarm.point}</p>
                  </div>
                  <div className="col-span-2 space-y-1">
                    <span className="text-[10px] text-gray-400 uppercase tracking-wider">告警内容</span>
                    <p className="text-xs font-medium text-gray-700">{selectedAlarm.content}</p>
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] text-gray-400 uppercase tracking-wider">告警值</span>
                    <p className="text-xs font-bold text-red-500 font-mono">{selectedAlarm.value}</p>
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] text-gray-400 uppercase tracking-wider">状态</span>
                    <div>
                      <span className={cn(
                        "px-2 py-0.5 rounded-full text-[10px] font-medium",
                        selectedAlarm.status === '未处理' ? "bg-red-50 text-red-600 border border-red-100" : "bg-emerald-50 text-emerald-600 border border-emerald-100"
                      )}>
                        {selectedAlarm.status}
                      </span>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] text-gray-400 uppercase tracking-wider">告警时间</span>
                    <p className="text-xs font-medium text-gray-700 font-mono">{selectedAlarm.time}</p>
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] text-gray-400 uppercase tracking-wider">处理时间</span>
                    <p className="text-xs font-medium text-gray-700 font-mono">{selectedAlarm.processTime}</p>
                  </div>
                </div>
              </div>
              <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-end">
                <button 
                  onClick={() => setIsAlarmDetailModalOpen(false)}
                  className="px-6 py-2 bg-blue-600 text-white text-xs font-bold rounded-lg hover:bg-blue-700 transition-colors"
                >
                  关闭
                </button>
              </div>
            </motion.div>
          </div>
        )}

        {/* Operation Log Modal */}
        {isOpLogModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpLogModalOpen(false)}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-xl shadow-2xl w-full max-w-2xl overflow-hidden relative z-10"
            >
              <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                <h3 className="font-bold text-gray-800">断路器操作日志</h3>
                <button 
                  onClick={() => setIsOpLogModalOpen(false)}
                  className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X size={20} className="text-gray-400" />
                </button>
              </div>
              <div className="p-6">
                <div className="overflow-x-auto">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="bg-gray-50 text-gray-500 border-b border-gray-100">
                        <th className="px-4 py-3 text-left font-medium">操作时间</th>
                        <th className="px-4 py-3 text-left font-medium">动作</th>
                        <th className="px-4 py-3 text-left font-medium">操作人</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {opLogs.map((log) => (
                        <tr key={log.id} className="hover:bg-gray-50/50 transition-colors">
                          <td className="px-4 py-3 text-gray-500 font-mono">{log.time}</td>
                          <td className="px-4 py-3">
                            <span className={cn(
                              "px-2 py-0.5 rounded-full text-[10px] font-medium",
                              log.action === '远程分闸' ? "bg-red-50 text-red-600 border border-red-100" : "bg-emerald-50 text-emerald-600 border border-emerald-100"
                            )}>
                              {log.action}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-gray-700 font-medium">{log.operator}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-end">
                <button 
                  onClick={() => setIsOpLogModalOpen(false)}
                  className="px-6 py-2 bg-blue-600 text-white text-xs font-bold rounded-lg hover:bg-blue-700 transition-colors"
                >
                  关闭
                </button>
              </div>
            </motion.div>
          </div>
        )}

        {/* Device Add/Edit Modal */}
        {isDeviceModalOpen && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsDeviceModalOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className={cn("bg-white rounded-xl shadow-2xl w-full overflow-hidden relative z-10 max-h-[90vh] flex flex-col", deviceTab === 'temp' ? "max-w-2xl" : "max-w-md")}
            >
              <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between flex-shrink-0">
                <h3 className="font-bold text-gray-800">{editingDevice ? '编辑' : '添加'}{
                  deviceTab === 'temp' ? '并网柜网关' : '设备'
                }</h3>
                <button 
                  onClick={() => setIsDeviceModalOpen(false)}
                  className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X size={20} className="text-gray-400" />
                </button>
              </div>
              <div className="p-6 space-y-6 overflow-y-auto flex-1 min-h-0">
                {/* 基本信息 */}
                <div className="space-y-4">
                  <h4 className="text-xs font-bold text-gray-700 border-b border-gray-100 pb-2">基本信息</h4>
                  <div className="space-y-2">
                    <label className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">网关名称</label>
                    <input 
                      type="text" 
                      value={deviceFormData.name || ''}
                      onChange={(e) => setDeviceFormData({ ...deviceFormData, name: e.target.value })}
                      placeholder="请输入网关名称"
                      className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">网关SN</label>
                    <input 
                      type="text" 
                      value={deviceFormData.sn || ''}
                      onChange={(e) => setDeviceFormData({ ...deviceFormData, sn: e.target.value })}
                      placeholder="请输入网关SN"
                      className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                    />
                  </div>
                </div>

                {deviceTab === 'temp' ? (
                  <>
                    {/* 接入设备 */}
                    <div className="space-y-4">
                      <h4 className="text-xs font-bold text-gray-700 border-b border-gray-100 pb-2">接入设备</h4>
                      <div className="flex flex-wrap gap-4">
                        {['并网柜测温', '上网表', '发电表'].map((key) => (
                          <label key={key} className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={(deviceFormData.accessDevices || []).includes(key)}
                              onChange={() => toggleAccessDevice(key)}
                              className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                            />
                            <span className="text-sm text-gray-700">{key}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* 上网表 */}
                    {(deviceFormData.accessDevices || []).includes('上网表') && (
                      <div className="space-y-4 p-4 bg-slate-50 rounded-xl border border-slate-100">
                        <h4 className="text-xs font-bold text-gray-700">上网表</h4>
                        <div className="space-y-2 max-w-xs">
                          <label className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">电表数量</label>
                          <input
                            type="number"
                            min={1}
                            max={50}
                            value={deviceFormData.gridMeterCount ?? 1}
                            onChange={(e) => {
                              const n = Number(e.target.value) || 1;
                              setDeviceFormData((prev: any) => ({
                                ...prev,
                                gridMeterCount: n,
                                gridMeters: syncMeterRows(n, prev.gridMeters, prev.gridMeters?.[0]?.ratio ?? prev.gridMeterRatio ?? 1),
                              }));
                            }}
                            className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                          />
                        </div>
                        <div className="space-y-2">
                          <div className="text-[10px] text-gray-600 font-bold tracking-wider">各上网表计量方式及倍率</div>
                          <div className="space-y-2">
                            {(deviceFormData.gridMeters || syncMeterRows(deviceFormData.gridMeterCount ?? 1, undefined, 1)).map(
                              (row: { meteringMethod: '正向' | '反向'; ratio: number }, idx: number) => (
                                <div
                                  key={`grid-meter-${idx}`}
                                  className="grid grid-cols-[72px_1fr_1fr] gap-3 items-center rounded-lg border border-gray-100 bg-white p-3"
                                >
                                  <span className="text-xs text-gray-600 font-medium">电表 {idx + 1}</span>
                                  <div className="space-y-1">
                                    <label className="text-[10px] text-gray-500">计量方式</label>
                                    <select
                                      value={row.meteringMethod}
                                      onChange={(e) => {
                                        const v = e.target.value as '正向' | '反向';
                                        setDeviceFormData((prev: any) => {
                                          const list = [...(prev.gridMeters || [])];
                                          list[idx] = { ...list[idx], meteringMethod: v };
                                          return { ...prev, gridMeters: list };
                                        });
                                      }}
                                      className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                                    >
                                      <option value="正向">正向</option>
                                      <option value="反向">反向</option>
                                    </select>
                                  </div>
                                  <div className="space-y-1">
                                    <label className="text-[10px] text-gray-500">倍率</label>
                                    <input
                                      type="number"
                                      min={0.01}
                                      step={0.01}
                                      value={row.ratio}
                                      onChange={(e) => {
                                        const r = Number(e.target.value) || 1;
                                        setDeviceFormData((prev: any) => {
                                          const list = [...(prev.gridMeters || [])];
                                          list[idx] = { ...list[idx], ratio: r };
                                          return { ...prev, gridMeters: list };
                                        });
                                      }}
                                      className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                                    />
                                  </div>
                                </div>
                              )
                            )}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* 发电表 */}
                    {(deviceFormData.accessDevices || []).includes('发电表') && (
                      <div className="space-y-4 p-4 bg-amber-50/50 rounded-xl border border-amber-100">
                        <h4 className="text-xs font-bold text-gray-700">发电表</h4>
                        <div className="space-y-2 max-w-xs">
                          <label className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">电表数量</label>
                          <input
                            type="number"
                            min={1}
                            max={50}
                            value={deviceFormData.genMeterCount ?? 1}
                            onChange={(e) => {
                              const n = Number(e.target.value) || 1;
                              setDeviceFormData((prev: any) => ({
                                ...prev,
                                genMeterCount: n,
                                genMeters: syncMeterRows(n, prev.genMeters, prev.genMeters?.[0]?.ratio ?? prev.genMeterRatio ?? 1),
                              }));
                            }}
                            className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                          />
                        </div>
                        <div className="space-y-2">
                          <div className="text-[10px] text-gray-600 font-bold tracking-wider">各发电表计量方式及倍率</div>
                          <div className="space-y-2">
                            {(deviceFormData.genMeters || syncMeterRows(deviceFormData.genMeterCount ?? 1, undefined, 1)).map(
                              (row: { meteringMethod: '正向' | '反向'; ratio: number }, idx: number) => (
                                <div
                                  key={`gen-meter-${idx}`}
                                  className="grid grid-cols-[72px_1fr_1fr] gap-3 items-center rounded-lg border border-amber-100 bg-white p-3"
                                >
                                  <span className="text-xs text-gray-600 font-medium">电表 {idx + 1}</span>
                                  <div className="space-y-1">
                                    <label className="text-[10px] text-gray-500">计量方式</label>
                                    <select
                                      value={row.meteringMethod}
                                      onChange={(e) => {
                                        const v = e.target.value as '正向' | '反向';
                                        setDeviceFormData((prev: any) => {
                                          const list = [...(prev.genMeters || [])];
                                          list[idx] = { ...list[idx], meteringMethod: v };
                                          return { ...prev, genMeters: list };
                                        });
                                      }}
                                      className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                                    >
                                      <option value="正向">正向</option>
                                      <option value="反向">反向</option>
                                    </select>
                                  </div>
                                  <div className="space-y-1">
                                    <label className="text-[10px] text-gray-500">倍率</label>
                                    <input
                                      type="number"
                                      min={0.01}
                                      step={0.01}
                                      value={row.ratio}
                                      onChange={(e) => {
                                        const r = Number(e.target.value) || 1;
                                        setDeviceFormData((prev: any) => {
                                          const list = [...(prev.genMeters || [])];
                                          list[idx] = { ...list[idx], ratio: r };
                                          return { ...prev, genMeters: list };
                                        });
                                      }}
                                      className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                                    />
                                  </div>
                                </div>
                              )
                            )}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* 并网柜测温 */}
                    {(deviceFormData.accessDevices || []).includes('并网柜测温') && (
                      <div className="space-y-4 p-4 bg-blue-50/50 rounded-xl border border-blue-100">
                        <h4 className="text-xs font-bold text-gray-700">并网柜测温</h4>
                        <div className="space-y-2">
                          <label className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">PT100 变送器数量</label>
                          <input
                            type="number"
                            min={1}
                            max={20}
                            value={deviceFormData.pt100Count ?? 1}
                            onChange={(e) => setPt100Count(Number(e.target.value) || 1)}
                            className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                          />
                        </div>
                        <div className="space-y-3">
                          <div className="text-[10px] text-gray-600 font-bold">各变送器地址及路数</div>
                          <div className="space-y-2">
                            {(deviceFormData.pt100List || [{ address: '', channels: 4 }]).map((item: { address: string; channels: 4 | 8 | 16 }, idx: number) => (
                              <div key={'pt100-' + idx} className="grid grid-cols-[1fr_120px] gap-3 items-end rounded-lg border border-gray-100 bg-white p-3">
                                <div className="space-y-1">
                                  <label className="text-[10px] text-gray-500">变送器{idx + 1} 地址</label>
                                  <input
                                    type="text"
                                    value={item.address}
                                    onChange={(e) => setDeviceFormData((p: any) => ({
                                      ...p,
                                      pt100List: p.pt100List.map((t: any, i: number) => i === idx ? { ...t, address: e.target.value } : t)
                                    }))}
                                    placeholder="请输入地址"
                                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                                  />
                                </div>
                                <div className="space-y-1">
                                  <label className="text-[10px] text-gray-500">几路变送器</label>
                                  <select
                                    value={item.channels}
                                    onChange={(e) => setDeviceFormData((p: any) => ({
                                      ...p,
                                      pt100List: p.pt100List.map((t: any, i: number) => i === idx ? { ...t, channels: Number(e.target.value) as 4 | 8 | 16 } : t)
                                    }))}
                                    className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                                  >
                                    <option value={4}>4 路</option>
                                    <option value={8}>8 路</option>
                                    <option value={16}>16 路</option>
                                  </select>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <label className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">进线数（逆变器数）</label>
                            <input
                              type="number"
                              min={1}
                              max={20}
                              value={deviceFormData.incomingLines ?? 1}
                              onChange={(e) => setIncomingOutgoingLines('incomingLines', Number(e.target.value))}
                              className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">出线数</label>
                            <input
                              type="number"
                              min={1}
                              max={20}
                              value={deviceFormData.outgoingLines ?? 1}
                              onChange={(e) => setIncomingOutgoingLines('outgoingLines', Number(e.target.value))}
                              className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                            />
                          </div>
                        </div>
                        {/* 进线 ABC 三相变送器路数 */}
                        <div className="space-y-3">
                          <div className="text-[10px] text-gray-600 font-bold">进线 · 三相线缆对应变送器第几路温度传感器</div>
                          <div className="space-y-2">
                            {(deviceFormData.incomingTempChannels || [{ pt100Index: 0, a: 1, b: 2, c: 3 }]).map((ch: { pt100Index?: number; a: number; b: number; c: number }, idx: number) => {
                              const ptCount = Math.max(1, deviceFormData.pt100Count ?? 1);
                              const rawList = (deviceFormData.pt100List || []).slice(0, ptCount);
                              const list = rawList.length ? rawList : [{ address: '' }];
                              const safePt = Math.min(Math.max(0, ch.pt100Index ?? 0), list.length - 1);
                              return (
                              <div key={'in-' + idx} className="grid grid-cols-1 sm:grid-cols-[72px_minmax(0,1.2fr)_repeat(3,minmax(0,1fr))] gap-2 items-end rounded-lg border border-gray-100 bg-white p-2">
                                <span className="text-xs font-medium text-gray-600 sm:pt-6">进线{idx + 1}</span>
                                <div className="min-w-0">
                                  <label className="text-[10px] text-gray-400 block mb-0.5">变送器地址</label>
                                  <select
                                    value={safePt}
                                    onChange={(e) =>
                                      setDeviceFormData((p: any) => ({
                                        ...p,
                                        incomingTempChannels: p.incomingTempChannels.map((c: any, i: number) =>
                                          i === idx ? { ...c, pt100Index: Number(e.target.value) } : c
                                        ),
                                      }))
                                    }
                                    className="w-full px-2 py-1.5 text-xs border border-gray-200 rounded bg-white"
                                  >
                                    {list.map((p: { address: string }, i: number) => (
                                      <option key={i} value={i}>
                                        {(p.address && String(p.address).trim()) ? p.address.trim() : `变送器${i + 1}（未填地址）`}
                                      </option>
                                    ))}
                                  </select>
                                </div>
                                <div>
                                  <label className="text-[10px] text-gray-400 block">A相第几路</label>
                                  <input type="number" min={1} value={ch.a} onChange={(e) => setDeviceFormData((p: any) => ({ ...p, incomingTempChannels: p.incomingTempChannels.map((c: any, i: number) => i === idx ? { ...c, a: Number(e.target.value) || 1 } : c) }))} className="w-full px-2 py-1 text-xs border border-gray-200 rounded" />
                                </div>
                                <div>
                                  <label className="text-[10px] text-gray-400 block">B相第几路</label>
                                  <input type="number" min={1} value={ch.b} onChange={(e) => setDeviceFormData((p: any) => ({ ...p, incomingTempChannels: p.incomingTempChannels.map((c: any, i: number) => i === idx ? { ...c, b: Number(e.target.value) || 1 } : c) }))} className="w-full px-2 py-1 text-xs border border-gray-200 rounded" />
                                </div>
                                <div>
                                  <label className="text-[10px] text-gray-400 block">C相第几路</label>
                                  <input type="number" min={1} value={ch.c} onChange={(e) => setDeviceFormData((p: any) => ({ ...p, incomingTempChannels: p.incomingTempChannels.map((c: any, i: number) => i === idx ? { ...c, c: Number(e.target.value) || 1 } : c) }))} className="w-full px-2 py-1 text-xs border border-gray-200 rounded" />
                                </div>
                              </div>
                            );})}
                          </div>
                        </div>
                        {/* 出线 ABC 三相变送器路数 */}
                        <div className="space-y-3">
                          <div className="text-[10px] text-gray-600 font-bold">出线 · 三相线缆对应变送器第几路温度传感器</div>
                          <div className="space-y-2">
                            {(deviceFormData.outgoingTempChannels || [{ pt100Index: 0, a: 1, b: 2, c: 3 }]).map((ch: { pt100Index?: number; a: number; b: number; c: number }, idx: number) => {
                              const ptCount = Math.max(1, deviceFormData.pt100Count ?? 1);
                              const rawList = (deviceFormData.pt100List || []).slice(0, ptCount);
                              const list = rawList.length ? rawList : [{ address: '' }];
                              const safePt = Math.min(Math.max(0, ch.pt100Index ?? 0), list.length - 1);
                              return (
                              <div key={'out-' + idx} className="grid grid-cols-1 sm:grid-cols-[72px_minmax(0,1.2fr)_repeat(3,minmax(0,1fr))] gap-2 items-end rounded-lg border border-gray-100 bg-white p-2">
                                <span className="text-xs font-medium text-gray-600 sm:pt-6">出线{idx + 1}</span>
                                <div className="min-w-0">
                                  <label className="text-[10px] text-gray-400 block mb-0.5">变送器地址</label>
                                  <select
                                    value={safePt}
                                    onChange={(e) =>
                                      setDeviceFormData((p: any) => ({
                                        ...p,
                                        outgoingTempChannels: p.outgoingTempChannels.map((c: any, i: number) =>
                                          i === idx ? { ...c, pt100Index: Number(e.target.value) } : c
                                        ),
                                      }))
                                    }
                                    className="w-full px-2 py-1.5 text-xs border border-gray-200 rounded bg-white"
                                  >
                                    {list.map((p: { address: string }, i: number) => (
                                      <option key={i} value={i}>
                                        {(p.address && String(p.address).trim()) ? p.address.trim() : `变送器${i + 1}（未填地址）`}
                                      </option>
                                    ))}
                                  </select>
                                </div>
                                <div>
                                  <label className="text-[10px] text-gray-400 block">A相第几路</label>
                                  <input type="number" min={1} value={ch.a} onChange={(e) => setDeviceFormData((p: any) => ({ ...p, outgoingTempChannels: p.outgoingTempChannels.map((c: any, i: number) => i === idx ? { ...c, a: Number(e.target.value) || 1 } : c) }))} className="w-full px-2 py-1 text-xs border border-gray-200 rounded" />
                                </div>
                                <div>
                                  <label className="text-[10px] text-gray-400 block">B相第几路</label>
                                  <input type="number" min={1} value={ch.b} onChange={(e) => setDeviceFormData((p: any) => ({ ...p, outgoingTempChannels: p.outgoingTempChannels.map((c: any, i: number) => i === idx ? { ...c, b: Number(e.target.value) || 1 } : c) }))} className="w-full px-2 py-1 text-xs border border-gray-200 rounded" />
                                </div>
                                <div>
                                  <label className="text-[10px] text-gray-400 block">C相第几路</label>
                                  <input type="number" min={1} value={ch.c} onChange={(e) => setDeviceFormData((p: any) => ({ ...p, outgoingTempChannels: p.outgoingTempChannels.map((c: any, i: number) => i === idx ? { ...c, c: Number(e.target.value) || 1 } : c) }))} className="w-full px-2 py-1 text-xs border border-gray-200 rounded" />
                                </div>
                              </div>
                            );})}
                          </div>
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <>
                    <div className="space-y-2">
                      <label className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">名称</label>
                      <input type="text" value={deviceFormData.name || ''} onChange={(e) => setDeviceFormData({ ...deviceFormData, name: e.target.value })} className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">网关SN</label>
                      <input type="text" value={deviceFormData.sn || ''} onChange={(e) => setDeviceFormData({ ...deviceFormData, sn: e.target.value })} className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" />
                    </div>
                  </>
                )}
              </div>
              <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex gap-3 flex-shrink-0">
                <button 
                  onClick={() => setIsDeviceModalOpen(false)}
                  className="flex-1 py-2 bg-white border border-gray-200 text-gray-600 text-xs font-bold rounded-lg hover:bg-gray-50 transition-colors"
                >
                  取消
                </button>
                <button 
                  onClick={handleSaveDevice}
                  className="flex-1 py-2 bg-blue-600 text-white text-xs font-bold rounded-lg hover:bg-blue-700 transition-colors"
                >
                  保存
                </button>
              </div>
            </motion.div>
          </div>
        )}

        {/* Password Confirmation Modal */}
        {isPasswordModalOpen && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                setIsPasswordModalOpen(false);
                setPassword('');
              }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-xl shadow-2xl w-full max-w-sm overflow-hidden relative z-10"
            >
              <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                <h3 className="font-bold text-gray-800">控制确认</h3>
                <button 
                  onClick={() => {
                    setIsPasswordModalOpen(false);
                    setPassword('');
                  }}
                  className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X size={20} className="text-gray-400" />
                </button>
              </div>
              <div className="p-6 space-y-4">
                <div className="flex items-center gap-3 p-3 bg-orange-50 border border-orange-100 rounded-lg text-orange-700">
                  <AlertTriangle size={20} />
                  <div className="text-xs font-medium">
                    您正在进行 <span className="font-bold underline">{pendingAction}</span> 操作，请输入控制密码以确认。
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">控制密码</label>
                  <input 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="请输入密码"
                    className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                    autoFocus
                  />
                </div>
              </div>
              <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex gap-3">
                <button 
                  onClick={() => {
                    setIsPasswordModalOpen(false);
                    setPassword('');
                  }}
                  className="flex-1 py-2 bg-white border border-gray-200 text-gray-600 text-xs font-bold rounded-lg hover:bg-gray-50 transition-colors"
                >
                  取消
                </button>
                <button 
                  onClick={() => {
                    // In a real app, validate password here
                    setIsPasswordModalOpen(false);
                    setPassword('');
                    alert(`${pendingAction}指令已下发`);
                  }}
                  className="flex-1 py-2 bg-blue-600 text-white text-xs font-bold rounded-lg hover:bg-blue-700 transition-colors"
                >
                  确认下发
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
