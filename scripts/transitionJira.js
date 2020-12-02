var jiraUtils = require("./jira-utils")
const fetch = require("node-fetch")
const fs = require("fs")

const JIRA_USERNAME = process.env.JIRA_USERNAME
const JIRA_API_TOKEN = process.env.JIRA_API_TOKEN

const event = JSON.parse(fs.readFileSync(process.env.GITHUB_EVENT_PATH, "utf8"))

const baseUrl = "https://spinbikes.atlassian.net"
const issueBaseUrl = "/rest/api/2/issue/"

const issueCommentBaseUrl = "/rest/api/3/issue/"

var issueKeyRegex = new RegExp("^\[[A-Z]+-[0-9]+[^\]]+\].+$")

async function getIssueKeys() {
 	var issueKeys = event.pull_request.title.replace(/^\[([A-Z]+-[0-9]+[^\]]+)\].+$/, "$1")
	issueKeys = issueKeys.split(",")

	var issueKeysTrimmed = []

	issueKeys.forEach(function (item) {
		issueKeysTrimmed.push(item.trim())
  	})

  	return issueKeysTrimmed
}

async function transitionIssues( issueKeys ) {
	issueKeys.forEach(async function (issue_id) {
		console.log("Transitioning issue " + issue_id + " as Released " )
//              var issue_id = issue.replace(/https:\/\/spinbikes.atlassian.net\/browse\//, "")
    		var isInReview = await jiraUtils.isInReview(issue_id)
    		if (isInReview) {
      			console.log("Transitioning " + index + " ticket " + issue_id + " to BuildReady")
//      			await jiraUtils.transitionRequest(issue_id, jiraUtils.jiraTransitionIdBuildReady)
    		}

	})
}

async function main() {
	var issueKeys = []
	if (issueKeyRegex.test(event.pull_request.title)) {
		issueKeys = getIssueKeys()
		transitionIssues(issueKeys)
	}
}



