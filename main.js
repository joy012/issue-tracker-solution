// on form, the submit event is added. and it will work when a form is submitted, don't need to add event listener to the submit button
document.getElementById('issueInputForm').addEventListener('submit', submitIssue); 


const updateIssueCount = () => {
  const issues = JSON.parse(localStorage.getItem('issues'));
  const totalIssueCount = issues.length;
  const openIssue = issues.filter(issue => issue.status === 'Open');
  const openIssueCount = openIssue.length;
  console.log(totalIssueCount,openIssueCount);
  document.getElementById('issueCount').innerHTML =
  `<h4 class="bg-warning">Active Issues: ${openIssueCount}</h4>
  <h4 class="bg-success">Closed Issues: ${totalIssueCount - openIssueCount}</h4>
  <h4 class="bg-info">Total Issues: ${totalIssueCount}</h4>`;
}
updateIssueCount();
function submitIssue(e) {
  const getInputValue = id => document.getElementById(id).value;
  const description = getInputValue('issueDescription');
  const severity = getInputValue('issueSeverity');
  const assignedTo = getInputValue('issueAssignedTo');
  const id = Math.floor(Math.random()*100000000);
  const status = 'Open';

  // using ES6 to object declaration
  const issue = { id, description, severity, assignedTo, status };
  let issues = [];
  if (localStorage.getItem('issues')){
    issues = JSON.parse(localStorage.getItem('issues'));
  }
  issues.push(issue);
  localStorage.setItem('issues', JSON.stringify(issues));

  document.getElementById('issueInputForm').reset(); // reset() will reset the value in form..same as reset btn
  fetchIssues();
  updateIssueCount();
}

const closeIssue = id => {
  const issues = JSON.parse(localStorage.getItem('issues'));
  const currentIssue = issues.find(issue => issue.id === id);
  currentIssue.status = 'Closed';
  const descriptionText = currentIssue.description;
  currentIssue.description = `<del>${descriptionText}</del>`;
  localStorage.setItem('issues', JSON.stringify(issues));
  fetchIssues();
  updateIssueCount();
}

const deleteIssue = id => {
  const issues = JSON.parse(localStorage.getItem('issues'));
  const remainingIssues = issues.filter(issue => issue.id !== id )
  localStorage.setItem('issues', JSON.stringify(remainingIssues));
  fetchIssues();
  updateIssueCount();
}

const fetchIssues = () => {
  const issues = JSON.parse(localStorage.getItem('issues'));
  const issuesList = document.getElementById('issuesList');
  issuesList.innerHTML = '';

  for (let i = 0; i < issues.length; i++) {
    const {id, description, severity, assignedTo, status} = issues[i];

    issuesList.innerHTML +=   `<div class="well">
                              <h6>Issue ID: ${id} </h6>
                              <p><span class="label label-info"> ${status} </span></p>
                              <h3> ${description} </h3>
                              <p><span class="glyphicon glyphicon-time"></span> ${severity}</p>
                              <p><span class="glyphicon glyphicon-user"></span> ${assignedTo}</p>
                              <a href="#" onclick="closeIssue(${id})" class="btn btn-warning">Close</a>
                              <a href="#" onclick="deleteIssue(${id})" class="btn btn-danger">Delete</a>
                              </div>`;
  }
}
