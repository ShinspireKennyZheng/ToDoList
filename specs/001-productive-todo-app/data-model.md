# 資料模型：高效待辦 (Productive To-do)

## 實體 (Entities)

### 任務 (Task)

代表一個要追蹤的工作單元。

| 欄位 | 類型 | 必填 | 預設值 | 說明 |
| :--- | :--- | :--- | :--- | :--- |
| `id` | UUID | 是 | `gen_random_uuid()` | 任務的唯一識別碼。 |
| `title` | Text | 是 | - | 任務的主要內容。UI 中有軟性長度限制。 |
| `description` | Text | 否 | `null` | 任務的詳細資訊。 |
| `is_completed` | Boolean | 是 | `false` | 任務的狀態 (未完成/已完成)。 |
| `created_at` | Timestamp | 是 | `now()` | 建立時間，用於排序 (最新優先)。 |

## 關聯 (Relationships)

- 無 (此功能僅單一實體)。

## 驗證規則

1.  **標題 (Title)**: 不得為空或僅包含空白字元。
2.  **描述 (Description)**: 選填，可為空。
3.  **是否完成 (is_completed)**: 必須為布林值。

## 狀態轉換

- **建立**: `null` -> `未完成` (`is_completed: false`)
- **完成**: `未完成` -> `已完成` (`is_completed: true`)
- **重新啟用**: `已完成` -> `未完成` (`is_completed: false`)
- **刪除**: `任何狀態` -> `null` (硬刪除)
