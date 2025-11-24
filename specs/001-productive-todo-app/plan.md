# 實作計畫：高效待辦 (Productive To-do)

**分支**: `001-productive-todo-app` | **日期**: 2025-11-24 | **規格**: [spec.md](./spec.md)
**輸入**: 來自 `/specs/001-productive-todo-app/spec.md` 的功能規格

## 摘要

開發一個單頁應用程式 (SPA)「高效待辦」，具備即時任務管理功能。應用程式將允許使用者建立、讀取、更新和刪除任務，並提供即時回饋。

**技術方法**:
- **前端**: Angular 框架搭配 NG-ZORRO (Ant Design) UI 函式庫。
- **後端**: Supabase 用於資料持久化和即時狀態同步。
- **架構**: 基於服務的架構，將 Supabase 互動抽象化。

## 技術背景

**語言/版本**: TypeScript 5.x, Angular 17+ (最新 CLI)
**主要相依性**: 
- `@angular/core`, `@angular/common` 等
- `ng-zorro-antd` (UI 元件)
- `@supabase/supabase-js` (Supabase 客戶端)
**儲存**: Supabase (PostgreSQL)
**測試**: 
- 單元測試: Jasmine/Karma (Angular 預設)
- E2E 測試: Playwright (根據研究決定)
**目標平台**: 現代網頁瀏覽器 (Chrome, Firefox, Edge, Safari)
**專案類型**: 網頁應用程式 (SPA)
**效能目標**: 初始載入 < 2秒, 滾動 60fps (100 個項目)
**限制**: 必須依要求使用 Angular, Supabase 和 NG-ZORRO。
**規模/範圍**: 約 7 個使用者故事，單一功能 (待辦清單)

## 憲章檢查 (Constitution Check)

*閘門：必須在階段 0 研究前通過。階段 1 設計後重新檢查。*

- [x] **I. UX**: Angular + NG-ZORRO 提供響應式且互動的 UI 元件 (Modals, Notifications)，滿足 UX 需求。
- [x] **II. 程式碼品質**: Angular 強制模組化 (Modules/Components) 和關注點分離 (Services 用於狀態)。
- [x] **III. 測試標準**: Angular CLI 內建測試鷹架。
- [x] **IV. 效能要求**: Angular 的變更檢測和 AOT 編譯支援效能目標。
- [!] **V. 技術選擇**: **違規**。憲章規定「優先使用原生技術 (Vanilla JS/CSS)，避免框架」。
    - **理由**: 使用者明確要求此功能使用 Angular, Supabase 和 NG-ZORRO，以利用即時功能和現代 UI 元件。本計畫基於使用者的具體覆蓋指令進行。

## 專案結構

### 文件 (此功能)

```text
specs/001-productive-todo-app/
├── plan.md              # 本檔案
├── research.md          # 階段 0 產出
├── data-model.md        # 階段 1 產出
├── quickstart.md        # 階段 1 產出
├── contracts/           # 階段 1 產出 (Supabase SQL)
└── tasks.md             # 階段 2 產出
```

### 原始碼 (儲存庫根目錄)

```text
src/
├── app/
│   ├── core/                 # 單例服務, guards, interceptors
│   │   ├── services/         # SupabaseService, TaskService
│   │   └── models/           # Task 介面
│   ├── shared/               # 共用元件, pipes, directives
│   │   └── ui/               # NG-ZORRO 匯入/客製化
│   └── features/
│       └── todo/             # 主要功能模組/元件
│           ├── todo-list/
│           ├── todo-item/
│           └── todo-form/    # Modal 元件
├── assets/
└── environments/
```

**結構決策**: 標準 Angular CLI 結構搭配 Feature-Module 架構，以確保可擴展性和可維護性。

## 複雜度追蹤

> **僅在憲章檢查有必須正當化的違規時填寫**

- **違規**: 使用 Angular & NG-ZORRO 而非 Vanilla JS。
- **理由**: 使用者明確要求使用此技術堆棧。
- **影響**: 與 Vanilla JS 相比增加了 bundle 大小和建置複雜度，但顯著減少了複雜 UI 狀態和即時整合的開發時間。
