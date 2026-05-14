const fs = require("fs");

const MAX_COMMENT_LENGTH = 60000;

module.exports = async function ({ github, context, core }) {
  const marker = process.env.MARKER;
  const path = process.env.REPORT_PATH || "report.html";
  const artifactUrl = process.env.ARTIFACT_URL;

  if (!marker) {
    throw new Error("MARKER env var is required");
  }

  if (!fs.existsSync(path)) {
    core.info(`${path} not found, skipping comment.`);
    return;
  }

  const report = fs.readFileSync(path, "utf8").trim();

  if (!report) {
    core.info(`${path} is empty, skipping comment.`);
    return;
  }

  let finalReport = report;

  if (report.length > MAX_COMMENT_LENGTH) {
    core.info("Report exceeds GitHub comment limit, truncating.");

    finalReport =
      report.slice(0, MAX_COMMENT_LENGTH) +
      "\n\n---\n⚠️ Report truncated due to size limits.";

    if (artifactUrl) {
      finalReport += `\n📎 Full report: ${artifactUrl}`;
    }
  }

  const body = `${marker}\n${finalReport}`;

  const comments = await github.paginate(
    github.rest.issues.listComments,
    {
      ...context.repo,
      issue_number: context.issue.number,
      per_page: 100,
    }
  );

  const prev = comments.find(c => c.body?.includes(marker));

  if (prev) {
    await github.rest.issues.updateComment({
      ...context.repo,
      comment_id: prev.id,
      body,
    });
  } else {
    await github.rest.issues.createComment({
      ...context.repo,
      issue_number: context.issue.number,
      body,
    });
  }
};