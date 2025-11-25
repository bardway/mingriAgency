// 日期格式化工具
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
}

// UUID 生成器
export function generateUUID(): string {
  return crypto.randomUUID();
}

// 骰子掷骰函数
export function rollDice(sides: number): number {
  return Math.floor(Math.random() * sides) + 1;
}

export function rollD100(): number {
  return rollDice(100);
}

// 数值范围限制
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

// 深拷贝
export function deepClone<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj));
}

// 延迟函数
export function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}
