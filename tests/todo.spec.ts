import { test, expect } from '@playwright/test';

test.describe('Todo App', () => {
    test.beforeEach(async ({ page }) => {
        // Mock Supabase GET tasks (empty initially)
        await page.route('**/rest/v1/tasks*', async route => {
            if (route.request().method() === 'GET') {
                await route.fulfill({
                    status: 200,
                    contentType: 'application/json',
                    body: JSON.stringify([])
                });
            } else {
                await route.continue();
            }
        });

        await page.goto('/');
    });

    test('US2: should display empty state when no tasks', async ({ page }) => {
        await expect(page.getByText('暫無任務，快來新增一個吧！')).toBeVisible();
    });

    test('US1: should add a new task', async ({ page }) => {
        const taskTitle = 'Test Task 1';

        // Mock Supabase POST task
        await page.route('**/rest/v1/tasks', async route => {
            if (route.request().method() === 'POST') {
                const postData = route.request().postDataJSON();
                await route.fulfill({
                    status: 201,
                    contentType: 'application/json',
                    body: JSON.stringify({
                        id: '123',
                        title: postData.title,
                        description: postData.description,
                        is_completed: false,
                        created_at: new Date().toISOString()
                    })
                });
            } else {
                await route.continue();
            }
        });

        // Fill input
        await page.getByPlaceholder('新增任務...').fill(taskTitle);

        // Click add button
        await page.getByRole('button', { name: '新增' }).click();

        // Verify task appears in list
        await expect(page.getByText(taskTitle)).toBeVisible();

        // Verify input is cleared
        await expect(page.getByPlaceholder('新增任務...')).toHaveValue('');
    });

    test('US2: should display tasks in order', async ({ page }) => {
        const tasks = [
            { id: '1', title: 'Task 1', is_completed: false, created_at: '2023-01-01T10:00:00Z' },
            { id: '2', title: 'Task 2', is_completed: true, created_at: '2023-01-01T11:00:00Z' }
        ];

        // Mock Supabase GET tasks with data
        // Note: The service requests order('created_at', { ascending: false }), so we should return them in that order if we want to simulate the DB correctly.
        // But the component just displays what it gets.
        // Let's return them in descending order (Task 2, then Task 1).
        const sortedTasks = [...tasks].reverse();

        await page.route('**/rest/v1/tasks*', async route => {
            if (route.request().method() === 'GET') {
                await route.fulfill({
                    status: 200,
                    contentType: 'application/json',
                    body: JSON.stringify(sortedTasks)
                });
            } else {
                await route.continue();
            }
        });

        await page.reload(); // Reload to trigger GET

        // Verify tasks are visible
        await expect(page.getByText('Task 2')).toBeVisible();
        await expect(page.getByText('Task 1')).toBeVisible();

        // Verify order (Task 2 should be first)
        const listItems = page.locator('nz-list-item');
        await expect(listItems.first()).toContainText('Task 2');
        await expect(listItems.last()).toContainText('Task 1');
    });

    test('US3: should update task status', async ({ page }) => {
        const task = { id: '1', title: 'Task 1', is_completed: false, created_at: '2023-01-01T10:00:00Z' };

        await page.route('**/rest/v1/tasks*', async route => {
            if (route.request().method() === 'GET') {
                await route.fulfill({
                    status: 200,
                    contentType: 'application/json',
                    body: JSON.stringify([task])
                });
            } else if (route.request().method() === 'PATCH') {
                const patchData = route.request().postDataJSON();
                await route.fulfill({
                    status: 200,
                    contentType: 'application/json',
                    body: JSON.stringify({ ...task, ...patchData })
                });
            } else {
                await route.continue();
            }
        });

        await page.reload();

        // Click checkbox
        await page.locator('label[nz-checkbox]').click();

        // Verify strikethrough style (or class)
        // The template uses [style.text-decoration]="task.is_completed ? 'line-through' : 'none'"
        const titleSpan = page.locator('nz-list-item-meta span').first();
        await expect(titleSpan).toHaveCSS('text-decoration-line', 'line-through');
    });

    test('US4: should edit task details', async ({ page }) => {
        const task = { id: '1', title: 'Task 1', description: 'Desc 1', is_completed: false, created_at: '2023-01-01T10:00:00Z' };

        await page.route('**/rest/v1/tasks*', async route => {
            if (route.request().method() === 'GET') {
                await route.fulfill({
                    status: 200,
                    contentType: 'application/json',
                    body: JSON.stringify([task])
                });
            } else if (route.request().method() === 'PATCH') {
                const patchData = route.request().postDataJSON();
                await route.fulfill({
                    status: 200,
                    contentType: 'application/json',
                    body: JSON.stringify({ ...task, ...patchData })
                });
            } else {
                await route.continue();
            }
        });

        await page.reload();

        // Click task to open modal
        await page.locator('nz-list-item').click();

        // Verify modal visible
        await expect(page.locator('.ant-modal-title')).toHaveText('編輯任務');

        // Edit title
        await page.locator('input[placeholder="標題"]').fill('Updated Task 1');
        await page.locator('textarea[placeholder="描述"]').fill('Updated Desc 1');

        // Click OK
        await page.getByRole('button', { name: 'OK' }).click();

        // Verify list updated
        await expect(page.getByText('Updated Task 1')).toBeVisible();
        await expect(page.getByText('Updated Desc 1')).toBeVisible();
    });

    test('US5: should delete task', async ({ page }) => {
        const task = { id: '1', title: 'Task 1', is_completed: false, created_at: '2023-01-01T10:00:00Z' };

        await page.route('**/rest/v1/tasks*', async route => {
            if (route.request().method() === 'GET') {
                await route.fulfill({
                    status: 200,
                    contentType: 'application/json',
                    body: JSON.stringify([task])
                });
            } else if (route.request().method() === 'DELETE') {
                await route.fulfill({
                    status: 204
                });
            } else {
                await route.continue();
            }
        });

        await page.reload();

        // Click delete button
        await page.getByText('刪除').click();

        // Verify confirm modal
        await expect(page.locator('.ant-modal-confirm-title')).toHaveText('確定要刪除此任務嗎？');

        // Click confirm
        await page.getByRole('button', { name: '刪除' }).click();

        // Verify task removed
        await expect(page.getByText('Task 1')).not.toBeVisible();
    });

    test('US6: should filter tasks', async ({ page }) => {
        const tasks = [
            { id: '1', title: 'Active Task', is_completed: false, created_at: '2023-01-01T10:00:00Z' },
            { id: '2', title: 'Completed Task', is_completed: true, created_at: '2023-01-01T11:00:00Z' }
        ];

        await page.route('**/rest/v1/tasks*', async route => {
            if (route.request().method() === 'GET') {
                await route.fulfill({
                    status: 200,
                    contentType: 'application/json',
                    body: JSON.stringify(tasks)
                });
            } else {
                await route.continue();
            }
        });

        await page.reload();

        // Verify all visible
        await expect(page.getByText('Active Task')).toBeVisible();
        await expect(page.getByText('Completed Task')).toBeVisible();

        // Filter Active
        await page.getByText('未完成').click();
        await expect(page.getByText('Active Task')).toBeVisible();
        await expect(page.getByText('Completed Task')).not.toBeVisible();

        // Filter Completed
        await page.getByText('已完成').click();
        await expect(page.getByText('Active Task')).not.toBeVisible();
        await expect(page.getByText('Completed Task')).toBeVisible();

        // Filter All
        await page.getByText('全部').click();
        await expect(page.getByText('Active Task')).toBeVisible();
        await expect(page.getByText('Completed Task')).toBeVisible();
    });

    test('US7: should persist data after reload', async ({ page }) => {
        const task = { id: '1', title: 'Persisted Task', is_completed: false, created_at: '2023-01-01T10:00:00Z' };

        await page.route('**/rest/v1/tasks*', async route => {
            if (route.request().method() === 'GET') {
                await route.fulfill({
                    status: 200,
                    contentType: 'application/json',
                    body: JSON.stringify([task])
                });
            } else {
                await route.continue();
            }
        });

        await page.goto('/');
        await expect(page.getByText('Persisted Task')).toBeVisible();

        await page.reload();
        await expect(page.getByText('Persisted Task')).toBeVisible();
    });
});
