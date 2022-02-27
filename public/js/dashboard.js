let tags_thema = {
  "Open":         '<span class="bg-green-200 text-green-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded">Open</span>',
  "Urgent":       '<span class="bg-red-200 text-red-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded">Urgent</span>',
  "In Progress":  '<span class="bg-yellow-200 text-yellow-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded">In Progress</span>',
  "In Review":    '<span class="bg-violet-200 text-violet-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded">In Review</span>',
  "Resolved":     '<span class="bg-blue-200 text-blue-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded">Resolved</span>',
  "Closed":       '<span class="bg-stone-200 text-stone-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded">Closed</span>',
}

const filtering = () => {
  let sort = document.getElementById('sort').value;
  let tag = document.getElementById('search-tag').value;
  let dateStart = new Date(document.getElementById('start').value);
  let dateEnd = new Date(document.getElementById('end').value);
  let list_issues = document.getElementById('data_content').getElementsByTagName('tr');
  for (const issue of list_issues) {
    let tag_issue = issue.getElementsByClassName('tag')[0].innerText;
    let date_issue = issue.getElementsByClassName('date')[0].innerText;
    issue.classList.remove('hidden')
    if (tag !== '') {
      if (!tag_issue.toLowerCase().includes(tag)) {
        issue.classList.add('hidden')
      }
    }
    if (dateStart.toString() !== "Invalid Date" && dateEnd.toString() !== "Invalid Date") {
      if (!((new Date(date_issue) >= dateStart) && (new Date(date_issue) <= dateEnd))) {
        issue.classList.add('hidden')
      }
    }
  }
  let list_tr = document.querySelector('#data_content')
  if (sort == '1') {
    [...list_tr.children]
      .sort((a, b) => {
        let date_a = new Date(a.getElementsByClassName('date')[0].innerText)
        let date_b = new Date(b.getElementsByClassName('date')[0].innerText)
        return date_b - date_a
      })
      .forEach(node => list_tr.appendChild(node))
  } else if (sort == '0') {
    [...list_tr.children]
      .sort((a, b) => {
        let date_a = new Date(a.getElementsByClassName('date')[0].innerText)
        let date_b = new Date(b.getElementsByClassName('date')[0].innerText)
        return date_a - date_b
      })
      .forEach(node => list_tr.appendChild(node))
  }
}
