Please perform the following end-to-end pull request triage and release workflow on repository https://github.com/congminh1254/shopee-sdk:

1. **Locate Target PR**:
   - Find the open pull request merging `update-schemas` into `main`.
   - If no matching open PR exists, cancel and exit immediately.

2. **Analyze Changes & Update PR Title**:
   - Inspect all file diffs: added/modified schemas in `schemas/`, changes in generated source code under `src/`, and updates in `spec-audit.txt`.
   - Determine the exact nature of the changes (new endpoints, bug fixes, or schema audits).
   - Craft and apply a Conventional Commit PR title formatted as `<type>(<scope>): <description>` (e.g., `feat(sbs): add get_fulfillment_mapping_inventory_list endpoint` or `chore(schemas): update Shopee API specs and audit report`).

3. **Approve Workflow Runs & Verify Tests and Build**:
   - Because the PR is created by an automated bot, GitHub Actions workflows may require approval before running.
   - Inspect GitHub Actions workflow runs associated with the PR (`gh run list` / `gh api repos/congminh1254/shopee-sdk/actions/runs`). If any workflow run requires approval or is pending, approve and trigger it (e.g., `gh api -X POST /repos/congminh1254/shopee-sdk/actions/runs/<run_id>/approve` or `gh run rerun <run_id>`).
   - Run local test and build verification: run all unit and integration test suites (`npm test`), linter checks (`npm run lint`), format checks (`npm run format:check`), and build checks (`npm run build`).
   - Wait for and verify that all CI workflows and PR checks pass successfully before proceeding (`gh pr checks <pr-number> --watch` or polling run statuses until all checks are green).

4. **Merge to Main**:
   - Once all tests and CI checks pass, merge the `update-schemas` PR into `main`.

5. **Handle Release PR (if applicable)**:
   - Note: Merges into `main` will only produce a release PR if releasable changes (e.g., `feat:`, `fix:`, `perf:`, breaking changes) are present; non-releasable changes (such as `chore:`) will not trigger a new release PR.
   - Wait for the Release Please workflow run triggered by the merge to finish.
   - Check if an open release pull request exists for branch `release-please--branches--main--components--shopee-sdk`.
   - If a release PR exists: verify it, ensure its CI checks pass, and merge it into `main` to trigger the automated npm package release.
   - If no release PR is created or needed: log that no release was required and conclude the run successfully.
