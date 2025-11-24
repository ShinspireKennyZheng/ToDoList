# 需求品質檢查清單：功能需求 (Functional Requirements)

**目的**: 驗證 `spec.md` 中的功能需求是否完整、清晰且可測試。此清單用於檢查「需求文件本身」的品質，而非測試程式碼。
**建立日期**: 2025-11-24
**適用對象**: 需求撰寫者 / 自我審查
**來源文件**: `specs/001-productive-todo-app/spec.md`

## 1. 需求完整性 (Completeness)
- [ ] CHK001 任務標題 (Title) 的輸入限制（如最大長度、禁止字元）是否已明確定義？ [Gap, Spec §功能需求-1]
- [ ] CHK002 是否已定義當 Supabase 連線失敗或網路中斷時的錯誤處理需求？ [Gap, Edge Case]
- [ ] CHK003 是否已指定「任務描述」在列表中預覽的具體行數限制？ [Completeness, Spec §功能需求-2]
- [ ] CHK004 是否已定義當任務標題過長時，在「編輯 Modal」中的顯示方式（換行或捲動）？ [Gap, Edge Case]
- [ ] CHK005 是否已明確列出所有需要 ARIA 標籤的互動元素？ [Completeness, Spec §功能需求-2]

## 2. 需求清晰度 (Clarity)
- [ ] CHK006 「視覺回饋 (Visual Feedback)」是否已具體描述（例如：顏色變化、動畫持續時間）？ [Ambiguity, Spec §功能需求-2]
- [ ] CHK007 「友善的圖文引導」是否已指定具體的插圖風格或文案內容？ [Clarity, Spec §US2]
- [ ] CHK008 「軟性限制 (Soft Limit)」對於後端資料庫的儲存長度是否有具體數值定義？ [Clarity, Spec §釐清事項]
- [ ] CHK009 「快速新增」是否已量化為具體的時間或步驟限制？ [Clarity, Spec §US1]

## 3. 一致性 (Consistency)
- [ ] CHK010 編輯任務的 Modal 與刪除確認的 Modal 在視覺風格與互動行為上是否一致？ [Consistency, Spec §釐清事項]
- [ ] CHK011 「資料持久性」的需求是否與「即時同步」的需求在離線情境下保持一致？ [Consistency, Spec §US7]

## 4. 可測量性 (Measurability)
- [ ] CHK012 「載入 < 2 秒」的效能指標是否已指定測試裝置或瀏覽器環境？ [Measurability, Spec §成功標準]
- [ ] CHK013 「滾動順暢」是否已量化為具體的 FPS 數值（如：最低 60fps）？ [Measurability, Spec §成功標準]
- [ ] CHK014 Lighthouse 無障礙分數 > 90 是否已指定具體的稽核類別（如：Desktop 或 Mobile）？ [Measurability, Spec §成功標準]

## 5. 邊界案例覆蓋 (Edge Case Coverage)
- [ ] CHK015 是否已定義當任務列表為空時，篩選器（全部/未完成/已完成）的行為與顯示狀態？ [Coverage, Edge Case]
- [ ] CHK016 是否已定義當兩個任務的 `createdAt` 時間完全相同時的排序規則？ [Coverage, Edge Case]
- [ ] CHK017 是否已定義在編輯模式下，若此時另一裝置刪除了該任務的系統行為？ [Coverage, Exception Flow]
