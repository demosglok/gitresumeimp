export default {
  loadResume(githublogin) {
    console.log('githubApi', githublogin);
    if(githublogin) {
      return fetch(`https://api.github.com/repos/${githublogin}/gitresume/contents/resume.json`,
        {
          method: 'GET',
          //mode: 'no-cors',
          headers: {
            Accept: 'application/vnd.github.v3+json',
          }
        })
        .then(res => res.json())
        .then(content => {
          const decoded = atob(content.content)
          try {
            return JSON.parse(decoded);
          } catch (ex) {
            console.log('error', ex.message, decoded);
            return {error: `Failed to parse resume ${ex.message}`};
          }
        })
        .catch(err => ({error: `Failed to load resume ${err.message}`}));
    } else {
      return Promise.then(() => null);
    }
      
  }
}