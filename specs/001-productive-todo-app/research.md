# 研究報告：高效待辦 (Productive To-do)

**功能**: 高效待辦 (Productive To-do)
**日期**: 2025-11-24

## 1. Angular + Supabase 整合

### 決策
使用官方 `@supabase/supabase-js` 客戶端，並將其封裝在 Angular 的 `SupabaseService` 中。

### 理由
- **官方支援**: 官方 JS 客戶端維護良好且功能完整。
- **型別安全**: 開箱即提供 TypeScript 定義。
- **靈活性**: 將其封裝在服務中便於測試 (mocking) 和集中設定。

### 實作細節
- **服務封裝**: 建立 `SupabaseService` 以使用環境變數初始化客戶端。
- **RxJS 整合**: 將 Supabase Realtime 訂閱封裝在 `Observable` 串流中。
    - 使用 `new Observable()` 建立串流。
    - 在 Observable 的 teardown 邏輯中，呼叫 `subscription.unsubscribe()` 以防止記憶體洩漏。
    - 這符合 Angular 的響應式風格 (在樣板中使用 `AsyncPipe`)。

## 2. UI 框架：NG-ZORRO

### 決策
使用透過 Angular CLI schematics 安裝的 `ng-zorro-antd`。

### 理由
- **完整性**: 開箱即提供所有必要的元件 (列表、核取方塊、輸入框、Modal、空狀態)。
- **設定簡易**: `ng add ng-zorro-antd` 自動處理樣式和資產的設定。

### 實作細節
- **主題**: 若需客製化樣式 (例如主色)，使用 Less (`.less`)。
- **模組**: 在功能模組中匯入特定模組 (例如 `NzListModule`, `NzModalModule`) 以保持 bundle 大小最佳化 (tree-shaking)。

## 3. E2E 測試策略

### 決策
使用 **Playwright** 進行端對端測試。

### 理由
- **即時測試**: Playwright 支援多個瀏覽器 Context，易於模擬兩個使用者同時互動 (測試即時同步的關鍵)。
- **速度**: 執行速度通常比 Cypress 快。
- **Supabase 整合**: 與 Cypress 的限制相比，更容易處理資料庫種子資料/拆除 fixtures。

### 替代方案考量
- **Cypress**: Angular 整合良好，但測試多使用者即時情境較複雜/受限。
- **Protractor**: 已棄用。

## 4. 資料模型對應

### 任務實體 (前端介面)
```typescript
export interface Task {
  id: string;
  title: string;
  description?: string;
  is_completed: boolean; // 對應至 DB 欄位 is_completed
  created_at: string;
}
```

### Supabase 資料表 (SQL)
```sql
create table tasks (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  description text,
  is_completed boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);
```
