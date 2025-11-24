# 快速入門指南：高效待辦 (Productive To-do)

本指南將協助您設定開發環境並執行應用程式。

## 先決條件

- **Node.js**: v18.13.0 或更高版本 (Angular 17 需要)。
- **npm**: v8 或更高版本。
- **Supabase 帳戶**: 用於後端資料庫和即時功能。

## 設定步驟

1.  **安裝相依套件**

    ```bash
    npm install
    ```

2.  **設定環境變數**

    在專案根目錄建立 `.env` 檔案 (或參考 `src/environments/environment.ts` 的設定方式，Angular 通常使用 `environment.ts`)。
    
    您需要填入以下 Supabase 憑證：
    
    - `SUPABASE_URL`: 您的 Supabase 專案 URL。
    - `SUPABASE_ANON_KEY`: 您的 Supabase 匿名公開金鑰 (Anon Key)。

    *注意：請確保在 `src/environments/environment.ts` 中設定這些值。*

3.  **設定資料庫**

    前往 Supabase Dashboard 的 SQL Editor，並執行 `specs/001-productive-todo-app/contracts/schema.sql` 中的 SQL 指令碼以建立資料表。

## 執行應用程式

啟動開發伺服器：

```bash
ng serve
```

開啟瀏覽器並前往 `http://localhost:4200/`。

## 執行測試

我們使用 Playwright 進行端對端 (E2E) 測試。

1.  **安裝 Playwright 瀏覽器** (僅需執行一次)

    ```bash
    npx playwright install
    ```

2.  **執行測試**

    ```bash
    npx playwright test
    ```

    若要以 UI 模式執行並觀看測試過程：

    ```bash
    npx playwright test --ui
    ```
