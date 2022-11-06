const today = new Date();
const thisYear = today.getFullYear();
const footer = document.querySelector("footer");

const copyright = document.createElement("p");
copyright.innerHTML = `Hector Serrano &#169; ${thisYear}`;
footer.appendChild(copyright);

skills = ['HTML', 'Javascript', 'CSS'];
/* const skillsSection = document.getElementById('skills');
const skillsList = skillsSection.querySelector('ul');
for (let i = 0; i < skills.length; i++) {
    const skill = document.createElement('li');
    skill.innerText = skills[i];
    skillsList.appendChild(skill);
} */

function hydrateList (sectionId, items) {
    const section = document.querySelector(sectionId);
    const ul = section.querySelector('ul');
    for (let i = 0; i < items.length; i++) {
        const listItem = document.createElement('li');
        const item = items [i];
        if (item.name) {
            const repoLink = document.createElement('a');
            repoLink.href = item.url;
            repoLink.innerText = item.name;
            listItem.appendChild(repoLink);
        } else {
        listItem.innerText = items[i];
        }
        ul.appendChild(listItem);
    }
}

this.hydrateList('#skills', skills);

const messageForm = document.querySelector('[name = leave_message] ');
messageForm.addEventListener('submit', function(event){
    event.preventDefault();
    const name = event.target.name.value;
    const email = event.target.email.value;
    const message = event.target.message.value;
    console.log(`name: ${name}, email: ${email}, message: ${message}`);
    
    const messageSection = document.querySelector('#messages');

    const messageList = messageSection.querySelector('ul');
    const newMessage = document.createElement('li');
    newMessage.innerHTML = `<a href="mailto:${email}">${name}</a><span> wrote: ${message} </span>`;

    const removeButton = document.createElement('button');
    removeButton.setAttribute('type', 'button');
    removeButton.innerText = 'Remove';
    removeButton.addEventListener('click', onRemoveButtonClick);

    newMessage.appendChild(removeButton);
    messageList.appendChild(newMessage);

    messageForm.reset();
});

function onRemoveButtonClick(event) {
    const entry = event.target.parentNode;
    entry.remove();

}



function handleResponse() {
    const repositories = JSON.parse(this.response);
    const repos = repositories.map(repo => (
    {
        name: repo.name,
        url: repo.html_url
    }
));
    hydrateList('#projects', repos);
    console.log(repos);
/*     console.log(repositories[0].name);
    console.log(repositories); */
}



/* function handleResponse() {
    const repositories = JSON.parse(this.response);
    const repoNames = repositories.map(repo => repo.name);
    hydrateList('#projects', repoNames);
    console.log(repoNames);
/*     console.log(repositories[0].name);
    console.log(repositories);
} */

const githubRequest = new XMLHttpRequest();
githubRequest.addEventListener('load', handleResponse);
githubRequest.open('GET', 'https://api.github.com/users/HectorSerranoGonzalez/repos');
githubRequest.send();

/* window.addEventListener('load', (event) => {
    const githubRequest = new XMLHttpRequest();
    githubRequest.open('GET', 'https://api.github.com/users/HectorSerranoGonzalez/repos');
    githubRequest.send();
    const repositories = JSON.parse(this.response);
    console.log(repositories);
}); */