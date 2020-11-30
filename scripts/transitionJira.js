const fetch = require("node-fetch")
const fs = require("fs")

const JIRA_USERNAME = process.env.JIRA_USERNAME
const JIRA_API_TOKEN = process.env.JIRA_API_TOKEN

const event = JSON.parse(fs.readFileSync(process.env.GITHUB_EVENT_PATH, "utf8"))

const baseUrl = "https://spinbikes.atlassian.net"
const issueBaseUrl = "/rest/api/2/issue/"

const issueCommentBaseUrl = "/rest/api/3/issue/"

console.log(event)

